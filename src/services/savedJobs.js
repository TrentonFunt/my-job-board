/**
 * Saved Jobs Service
 * Handles all Firebase operations for saving/unsaving jobs and tracking applications.
 * Keeps Firebase logic out of components for cleaner architecture.
 */

import { db } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc, addDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';

/**
 * @typedef {Object} SavedJob
 * @property {string} slug - Unique job identifier
 * @property {string} title - Job title
 * @property {string} company - Company name
 * @property {string} [description] - Job description
 * @property {Date} [savedAt] - When the job was saved
 */

/**
 * @typedef {Object} Application
 * @property {string} company - Company name
 * @property {string} position - Job title/position
 * @property {string} [location] - Job location
 * @property {string|number|null} [salary] - Salary info
 * @property {string} [jobUrl] - External job URL
 * @property {Date} appliedDate - When user applied
 * @property {string} status - Application status (APPLIED, INTERVIEWING, etc.)
 * @property {string} [notes] - User notes
 */

// ============================================================================
// SAVED JOBS
// ============================================================================

/**
 * Check if a job is saved by the user
 * @param {string} userId - Firebase user UID
 * @param {string} slug - Job slug
 * @returns {Promise<boolean>}
 */
export async function isJobSaved(userId, slug) {
  if (!userId || !slug) return false;
  
  try {
    const docRef = doc(db, 'users', userId, 'savedJobs', slug);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Error checking saved job:', error);
    return false;
  }
}

/**
 * Save a job to user's saved jobs
 * @param {string} userId - Firebase user UID
 * @param {SavedJob} jobData - Job data to save
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function saveJob(userId, jobData) {
  if (!userId) {
    return { success: false, error: 'User not authenticated' };
  }
  
  if (!jobData?.slug) {
    return { success: false, error: 'Invalid job data' };
  }
  
  try {
    const docRef = doc(db, 'users', userId, 'savedJobs', jobData.slug);
    await setDoc(docRef, {
      ...jobData,
      savedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving job:', error);
    return { success: false, error: 'Failed to save job' };
  }
}

/**
 * Remove a job from user's saved jobs
 * @param {string} userId - Firebase user UID
 * @param {string} slug - Job slug to remove
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function unsaveJob(userId, slug) {
  if (!userId) {
    return { success: false, error: 'User not authenticated' };
  }
  
  if (!slug) {
    return { success: false, error: 'Invalid job slug' };
  }
  
  try {
    const docRef = doc(db, 'users', userId, 'savedJobs', slug);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error removing saved job:', error);
    return { success: false, error: 'Failed to remove job' };
  }
}

/**
 * Toggle saved state for a job
 * @param {string} userId - Firebase user UID
 * @param {SavedJob} jobData - Job data
 * @param {boolean} currentlySaved - Current saved state
 * @returns {Promise<{ success: boolean, saved: boolean, error?: string }>}
 */
export async function toggleSaveJob(userId, jobData, currentlySaved) {
  if (currentlySaved) {
    const result = await unsaveJob(userId, jobData.slug);
    return { ...result, saved: !result.success };
  } else {
    const result = await saveJob(userId, jobData);
    return { ...result, saved: result.success };
  }
}

/**
 * Get all saved jobs for a user
 * @param {string} userId - Firebase user UID
 * @returns {Promise<SavedJob[]>}
 */
export async function getSavedJobs(userId) {
  if (!userId) return [];
  
  try {
    const savedJobsRef = collection(db, 'users', userId, 'savedJobs');
    const snapshot = await getDocs(savedJobsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    return [];
  }
}

// ============================================================================
// APPLICATIONS
// ============================================================================

/**
 * Track a job application
 * @param {string} userId - Firebase user UID
 * @param {Application} applicationData - Application data
 * @returns {Promise<{ success: boolean, id?: string, error?: string }>}
 */
export async function trackApplication(userId, applicationData) {
  if (!userId) {
    return { success: false, error: 'User not authenticated' };
  }
  
  if (!applicationData?.position || !applicationData?.company) {
    return { success: false, error: 'Invalid application data' };
  }
  
  try {
    const applicationsRef = collection(db, 'users', userId, 'applications');
    const docRef = await addDoc(applicationsRef, {
      ...applicationData,
      appliedDate: applicationData.appliedDate || new Date(),
      status: applicationData.status || 'APPLIED'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error tracking application:', error);
    return { success: false, error: 'Failed to track application' };
  }
}

/**
 * Get all applications for a user
 * @param {string} userId - Firebase user UID
 * @returns {Promise<Application[]>}
 */
export async function getApplications(userId) {
  if (!userId) return [];
  
  try {
    const applicationsRef = collection(db, 'users', userId, 'applications');
    const q = query(applicationsRef, orderBy('appliedDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
}
