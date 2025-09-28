/**
 * @typedef {Object} Job
 * @property {string} slug
 * @property {string} title
 * @property {string} company_name
 * @property {string} [description]
 * @property {string} [location]
 * @property {number|null} [salary]
 * @property {string[]} [tags]
 * @property {string} [url]
 * @property {string} [source]
 */

/**
 * Fetch aggregated jobs from the Vercel edge function.
 * @param {AbortSignal} [signal]
 * @returns {Promise<Job[]>}
 */
export async function fetchAggregatedJobs(signal) {
  // In local dev, aggregate directly in the browser to avoid Vite proxy overriding our Edge function
  if (import.meta?.env?.DEV) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const [arbeitnowRes, remotiveRes, jobicyRes] = await Promise.allSettled([
        fetch('/api/job-board-api', { headers: { accept: 'application/json' }, signal: controller.signal }),
        fetch('https://remotive.com/api/remote-jobs', { headers: { accept: 'application/json' }, signal: controller.signal }),
        fetch('https://jobicy.com/api/v2/remote-jobs', { headers: { accept: 'application/json' }, signal: controller.signal }),
      ]);

      const arbeitnowData = arbeitnowRes.status === 'fulfilled' && arbeitnowRes.value.ok ? await arbeitnowRes.value.json() : { data: [] };
      const remotiveData = remotiveRes.status === 'fulfilled' && remotiveRes.value.ok ? await remotiveRes.value.json() : { jobs: [] };
      const jobicyData = jobicyRes.status === 'fulfilled' && jobicyRes.value.ok ? await jobicyRes.value.json() : { jobs: [] };

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
      const dedupeBySlug = (jobs) => {
        const seen = new Set();
        return jobs.filter((j) => j?.slug && !seen.has(j.slug) && seen.add(j.slug));
      };

      return dedupeBySlug([
        ...normalizeArbeitnow(arbeitnowData.data || []),
        ...normalizeRemotive(remotiveData.jobs || []),
        ...normalizeJobicy(jobicyData.jobs || jobicyData.data || []),
      ]);
    } finally {
      clearTimeout(timeout);
    }
  }
  try {
    const res = await fetch('/api/job-board-api', {
      headers: { 'accept': 'application/json' },
      signal,
    });
    if (!res.ok) throw new Error('upstream');
    const json = await res.json();
    if (Array.isArray(json?.data)) {
      const data = json.data.map((j) => ({
        // If source missing, default to 'arbeitnow' (edge may pass-through during preview)
        source: j.source || 'arbeitnow',
        ...j,
      }));
      return data;
    }
    throw new Error('no-data');
  } catch {
    // Dev fallback: fetch sources directly (browser) and merge
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const [arbeitnowRes, remotiveRes] = await Promise.allSettled([
        fetch('/api/job-board-api', { headers: { accept: 'application/json' }, signal: controller.signal }),
        fetch('https://remotive.com/api/remote-jobs', { headers: { accept: 'application/json' }, signal: controller.signal }),
      ]);

      const arbeitnowData = arbeitnowRes.status === 'fulfilled' && arbeitnowRes.value.ok ? await arbeitnowRes.value.json() : { data: [] };
      const remotiveData = remotiveRes.status === 'fulfilled' && remotiveRes.value.ok ? await remotiveRes.value.json() : { jobs: [] };

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
      const dedupeBySlug = (jobs) => {
        const seen = new Set();
        return jobs.filter((j) => j?.slug && !seen.has(j.slug) && seen.add(j.slug));
      };

      const merged = dedupeBySlug([
        ...normalizeArbeitnow(arbeitnowData.data || []),
        ...normalizeRemotive(remotiveData.jobs || []),
      ]);
      return merged;
    } finally {
      clearTimeout(timeout);
    }
  }
}


