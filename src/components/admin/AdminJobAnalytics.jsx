import { useEffect, useState } from "react";
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
    <div className="card bg-base-100 shadow-xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Job Analytics</h2>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-spinner loading-lg text-accent"></span>
          <span className="ml-4 text-base-content/70">Loading stats...</span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="stat bg-base-100 border border-base-300 rounded-box shadow">
            <div className="stat-title">Total Jobs</div>
            <div className="stat-value text-accent">{stats.jobs}</div>
          </div>
          <div className="stat bg-base-100 border border-base-300 rounded-box shadow">
            <div className="stat-title">Featured Jobs</div>
            <div className="stat-value text-primary">{stats.featured}</div>
          </div>
          <div className="stat bg-base-100 border border-base-300 rounded-box shadow">
            <div className="stat-title">Applications</div>
            <div className="stat-value text-secondary">{stats.applications}</div>
          </div>
        </div>
      )}
    </div>
  );
}
