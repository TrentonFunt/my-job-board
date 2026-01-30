/**
 * @typedef {Object} Job
 * @property {string} slug - Unique identifier for the job
 * @property {string} title - Job title
 * @property {string} company_name - Name of the hiring company
 * @property {string} [description] - Job description (may contain HTML)
 * @property {string} [location] - Job location
 * @property {number|string|null} [salary] - Salary information
 * @property {string[]} [tags] - Job tags/skills
 * @property {string} [url] - External application URL
 * @property {string} [source] - API source (arbeitnow, remotive, jobicy, employer)
 */

import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// ============================================================================
// CACHING LAYER - Improves performance by reducing API calls
// ============================================================================

const CACHE_KEY = 'rolerocket_jobs_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/** @type {Job[] | null} */
let memoryCache = null;
let memoryCacheTimestamp = 0;

/**
 * Get cached jobs from memory or localStorage
 * @returns {{ jobs: Job[] | null, isStale: boolean }}
 */
function getCachedJobs() {
  const now = Date.now();
  
  // Check memory cache first (fastest)
  if (memoryCache && (now - memoryCacheTimestamp) < CACHE_DURATION) {
    return { jobs: memoryCache, isStale: false };
  }
  
  // Check localStorage (persists across refreshes)
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { jobs, timestamp } = JSON.parse(cached);
      const isStale = (now - timestamp) >= CACHE_DURATION;
      
      // Update memory cache
      memoryCache = jobs;
      memoryCacheTimestamp = timestamp;
      
      return { jobs, isStale };
    }
  } catch (e) {
    console.warn('Failed to read jobs cache:', e);
  }
  
  return { jobs: null, isStale: true };
}

/**
 * Save jobs to both memory and localStorage cache
 * @param {Job[]} jobs - Jobs to cache
 */
function setCachedJobs(jobs) {
  const now = Date.now();
  
  // Update memory cache
  memoryCache = jobs;
  memoryCacheTimestamp = now;
  
  // Persist to localStorage
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      jobs,
      timestamp: now
    }));
  } catch (e) {
    console.warn('Failed to write jobs cache:', e);
  }
}

/**
 * Clear the jobs cache (useful after posting a new job)
 */
export function clearJobsCache() {
  memoryCache = null;
  memoryCacheTimestamp = 0;
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (e) {
    console.warn('Failed to clear jobs cache:', e);
  }
}

// ============================================================================
// NORMALIZERS - Transform API responses to unified Job format
// ============================================================================

/**
 * Normalize Arbeitnow API response to Job format
 * @param {Array} list - Raw Arbeitnow jobs
 * @returns {Job[]}
 */
const normalizeArbeitnow = (list = []) => list.map((j) => ({
  source: 'arbeitnow',
  slug: j.slug,
  title: j.title,
  company_name: j.company_name,
  description: j.description,
  location: j.location,
  salary: j.salary ?? null,
  tags: Array.isArray(j.tags) ? j.tags : [],
  url: j.url,
}));

/**
 * Normalize Remotive API response to Job format
 * @param {Array} list - Raw Remotive jobs
 * @returns {Job[]}
 */
const normalizeRemotive = (list = []) => list.map((j) => ({
  source: 'remotive',
  slug: `remotive-${j.id}`,
  title: j.title,
  company_name: j.company_name,
  description: j.description,
  location: j.candidate_required_location || '',
  salary: j.salary || null,
  tags: Array.isArray(j.tags) ? j.tags : [],
  url: j.url,
}));

/**
 * Normalize Jobicy API response to Job format
 * @param {Array} list - Raw Jobicy jobs
 * @returns {Job[]}
 */
const normalizeJobicy = (list = []) => list.map((j) => ({
  source: 'jobicy',
  slug: `jobicy-${j.id ?? j.slug ?? Math.random().toString(36).slice(2)}`,
  title: j.title ?? j.jobTitle ?? '',
  company_name: j.company_name ?? j.companyName ?? j.company?.name ?? '',
  description: j.description ?? j.jobDescription ?? '',
  location: j.candidate_required_location ?? j.location ?? '',
  salary: j.salary ?? null,
  tags: Array.isArray(j.tags) ? j.tags : (Array.isArray(j.jobTags) ? j.jobTags : []),
  url: j.url ?? j.jobUrl ?? '',
}));

/**
 * Normalize employer-posted jobs from Firestore to Job format
 * @param {Array} list - Raw employer jobs from Firestore
 * @returns {Job[]}
 */
const normalizeEmployerJobs = (list = []) => list.map((j) => ({
  source: 'employer',
  slug: j.slug ?? `employer-${j.id}`,
  title: j.title ?? '',
  company_name: j.company || j.employerName || '',
  description: j.description ?? '',
  location: j.location ?? 'Remote',
  salary: j.salary ?? null,
  tags: Array.isArray(j.tags) ? j.tags : [],
  url: j.applicationUrl ?? '',
  type: j.type ?? 'Full-time',
  employerId: j.employerId,
  createdAt: j.createdAt,
}));

/**
 * Remove duplicate jobs by slug
 * @param {Job[]} jobs - Array of jobs
 * @returns {Job[]}
 */
const dedupeBySlug = (jobs) => {
  const seen = new Set();
  return jobs.filter((j) => j?.slug && !seen.has(j.slug) && seen.add(j.slug));
};

// ============================================================================
// API FETCHING - Fetch jobs from multiple sources
// ============================================================================

/**
 * Fetch approved employer jobs from Firestore
 * @returns {Promise<Job[]>}
 */
async function fetchApprovedEmployerJobs() {
  try {
    const q = query(
      collection(db, "employerJobs"),
      where("status", "==", "approved")
    );
    const snapshot = await getDocs(q);
    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return normalizeEmployerJobs(jobs);
  } catch (error) {
    console.warn('Failed to fetch employer jobs:', error);
    return [];
  }
}

/**
 * Fetch jobs directly from all API sources (browser-side)
 * @param {AbortSignal} [signal] - Abort signal for cancellation
 * @returns {Promise<Job[]>}
 */
async function fetchFromAllSources(signal) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
  // Use provided signal or internal controller
  const effectiveSignal = signal || controller.signal;
  
  try {
    // Fetch from external APIs and Firestore in parallel
    const [arbeitnowRes, remotiveRes, jobicyRes, employerJobs] = await Promise.allSettled([
      fetch('/api/job-board-api', { 
        headers: { accept: 'application/json' }, 
        signal: effectiveSignal 
      }),
      fetch('https://remotive.com/api/remote-jobs', { 
        headers: { accept: 'application/json' }, 
        signal: effectiveSignal 
      }),
      fetch('https://jobicy.com/api/v2/remote-jobs', { 
        headers: { accept: 'application/json' }, 
        signal: effectiveSignal 
      }),
      fetchApprovedEmployerJobs(),
    ]);

    const arbeitnowData = arbeitnowRes.status === 'fulfilled' && arbeitnowRes.value.ok 
      ? await arbeitnowRes.value.json() 
      : { data: [] };
    const remotiveData = remotiveRes.status === 'fulfilled' && remotiveRes.value.ok 
      ? await remotiveRes.value.json() 
      : { jobs: [] };
    const jobicyData = jobicyRes.status === 'fulfilled' && jobicyRes.value.ok 
      ? await jobicyRes.value.json() 
      : { jobs: [] };
    const employerJobsData = employerJobs.status === 'fulfilled' 
      ? employerJobs.value 
      : [];

    // Employer jobs appear first (prioritized), then external API jobs
    return dedupeBySlug([
      ...employerJobsData,
      ...normalizeArbeitnow(arbeitnowData.data || []),
      ...normalizeRemotive(remotiveData.jobs || []),
      ...normalizeJobicy(jobicyData.jobs || jobicyData.data || []),
    ]);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch aggregated jobs with caching support.
 * Uses stale-while-revalidate pattern for optimal UX.
 * 
 * @param {AbortSignal} [signal] - Abort signal for cancellation
 * @param {Object} [options] - Fetch options
 * @param {boolean} [options.forceRefresh=false] - Bypass cache and fetch fresh data
 * @returns {Promise<Job[]>}
 */
export async function fetchAggregatedJobs(signal, options = {}) {
  const { forceRefresh = false } = options;
  
  // Check cache first (unless force refresh)
  if (!forceRefresh) {
    const { jobs: cachedJobs, isStale } = getCachedJobs();
    
    if (cachedJobs && !isStale) {
      // Cache is fresh, return immediately
      return cachedJobs;
    }
    
    if (cachedJobs && isStale) {
      // Return stale data immediately, refresh in background
      fetchFromAllSources(signal)
        .then(setCachedJobs)
        .catch(err => console.warn('Background refresh failed:', err));
      return cachedJobs;
    }
  }
  
  // No cache or force refresh - fetch fresh data
  const jobs = await fetchFromAllSources(signal);
  setCachedJobs(jobs);
  return jobs;
}

/**
 * Get a single job by slug from cache or fetch all jobs
 * @param {string} slug - Job slug to find
 * @returns {Promise<Job|null>}
 */
export async function getJobBySlug(slug) {
  const { jobs: cachedJobs } = getCachedJobs();
  
  if (cachedJobs) {
    const found = cachedJobs.find(j => j.slug === slug);
    if (found) return found;
  }
  
  // Not in cache, fetch all and search
  const jobs = await fetchAggregatedJobs();
  return jobs.find(j => j.slug === slug) || null;
}


