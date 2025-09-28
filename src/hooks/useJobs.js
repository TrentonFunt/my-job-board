import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchAggregatedJobs } from '../services/jobs';

export default function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  useEffect(() => {
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError('');
    fetchAggregatedJobs(controller.signal)
      .then((data) => setJobs(data))
      .catch((e) => {
        if (e.name !== 'AbortError') setError('Failed to load jobs');
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const meta = useMemo(() => ({ count: jobs.length }), [jobs]);

  return { jobs, loading, error, meta };
}


