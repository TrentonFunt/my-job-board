import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminJobAnalytics() {
  const [stats, setStats] = useState({ jobs: 0, featured: 0, applications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const jobsCol = collection(db, "jobs");
      const jobsSnap = await getDocs(jobsCol);
      const jobs = jobsSnap.docs.map(doc => doc.data());
      const featured = jobs.filter(j => j.featured).length;
      // For demo: applications count is 0 (add logic if you track applications)
      setStats({ jobs: jobs.length, featured, applications: 0 });
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800 rounded-lg p-6 border border-slate-700"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Job Analytics</h2>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-slate-300">Loading stats...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-700 rounded-lg p-6 border border-slate-600"
          >
            <div className="text-slate-400 text-sm font-medium mb-2">Total Jobs</div>
            <div className="text-3xl font-bold text-emerald-400">{stats.jobs}</div>
          </Motion.div>
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-700 rounded-lg p-6 border border-slate-600"
          >
            <div className="text-slate-400 text-sm font-medium mb-2">Featured Jobs</div>
            <div className="text-3xl font-bold text-purple-400">{stats.featured}</div>
          </Motion.div>
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-700 rounded-lg p-6 border border-slate-600"
          >
            <div className="text-slate-400 text-sm font-medium mb-2">Applications</div>
            <div className="text-3xl font-bold text-blue-400">{stats.applications}</div>
          </Motion.div>
        </div>
      )}
    </Motion.div>
  );
}
