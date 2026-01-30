import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { fetchAggregatedJobs, clearJobsCache } from '../services/jobs';

/**
 * Custom hook for fetching and managing job listings.
 * Features:
 * - Automatic caching (5 min TTL)
 * - Stale-while-revalidate pattern
 * - Manual refresh capability
 * - Abort on unmount
 * 
 * @returns {{ jobs: Array, loading: boolean, error: string, meta: Object, refresh: Function }}
 */
export default function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const abortRef = useRef(null);
  const isMountedRef = useRef(true);

  /**
   * Fetch jobs from API (with caching)
   * @param {boolean} forceRefresh - Bypass cache if true
   */
  const fetchJobs = useCallback(async (forceRefresh = false) => {
    // Abort previous request
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchAggregatedJobs(controller.signal, { forceRefresh });
      if (isMountedRef.current) {
        setJobs(data);
      }
    } catch (e) {
      if (e.name !== 'AbortError' && isMountedRef.current) {
        setError('Failed to load jobs. Please try again.');
        console.error('useJobs fetch error:', e);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    isMountedRef.current = true;
    fetchJobs();
    
    return () => {
      isMountedRef.current = false;
      abortRef.current?.abort?.();
    };
  }, [fetchJobs]);

  /**
   * Manually refresh jobs (bypasses cache)
   */
  const refresh = useCallback(() => {
    clearJobsCache();
    return fetchJobs(true);
  }, [fetchJobs]);

  const meta = useMemo(() => ({ 
    count: jobs.length,
    sources: [...new Set(jobs.map(j => j.source).filter(Boolean))]
  }), [jobs]);

  return { jobs, loading, error, meta, refresh };
}