import React, { useState, useEffect, useCallback } from "react";
import { motion as Motion } from "framer-motion";
import { db, auth } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { BookmarkIcon, TrashIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function SavedJobsSection() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchSavedJobs = useCallback(async () => {
    if (!user) return;
    try {
      const savedJobsRef = collection(db, "users", user.uid, "savedJobs");
      const querySnapshot = await getDocs(savedJobsRef);
      const jobs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSavedJobs(jobs);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      toast.error("Failed to load saved jobs");
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchSavedJobs();
    } else {
      setSavedJobs([]);
    }
  }, [user, fetchSavedJobs]);

  const handleRemoveJob = async (jobId) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "savedJobs", jobId));
      setSavedJobs(prev => prev.filter(job => job.id !== jobId));
      toast.success("Job removed from saved jobs");
    } catch (error) {
      console.error("Error removing job:", error);
      toast.error("Failed to remove job");
    }
  };

  if (loading) {
    return (
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 rounded-lg p-6 border border-base-300 shadow-xl"
      >
        <h2 className="text-xl font-bold text-base-content mb-4">Saved Jobs</h2>
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-base-content/70">Loading saved jobs...</span>
        </div>
      </Motion.div>
    );
  }

  if (!user) {
    return (
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 rounded-lg p-6 border border-base-300 shadow-xl"
      >
        <h2 className="text-xl font-bold text-base-content mb-4">Saved Jobs</h2>
        <div className="text-center py-8">
          <BookmarkIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-base-content/70 mb-4">Please sign in to view your saved jobs</p>
        </div>
      </Motion.div>
    );
  }

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-base-100 rounded-lg p-6 border border-base-300 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-base-content">Saved Jobs</h2>
        <div className="flex items-center gap-2">
          <BookmarkSolidIcon className="w-5 h-5 text-emerald-400" />
          <span className="text-sm text-emerald-400 font-medium">
            {savedJobs.length} saved
          </span>
        </div>
      </div>

      {savedJobs.length === 0 ? (
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <BookmarkIcon className="w-20 h-20 text-slate-400 mx-auto mb-6" />
          <h3 className="text-lg font-semibold text-base-content mb-2">No saved jobs yet</h3>
          <p className="text-base-content/70 mb-6">
            Start saving jobs you're interested in to keep track of them here.
          </p>
          <a
            href="/jobs"
            className="btn btn-primary"
          >
            Browse Jobs
          </a>
        </Motion.div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job, index) => (
            <Motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-base-200 rounded-lg p-4 border border-base-300 hover:border-base-content/20 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-base-content mb-1">
                    {job.title}
                  </h3>
                  <p className="text-base-content/70 mb-2">{job.company}</p>
                  {job.description && (
                    <p className="text-base-content/60 text-sm mb-3 line-clamp-2">
                      {job.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.location && (
                      <span className="bg-base-300 text-base-content px-2 py-1 rounded text-xs">
                        📍 {job.location}
                      </span>
                    )}
                    {job.salary && (
                      <span className="bg-base-300 text-base-content px-2 py-1 rounded text-xs">
                        💰 {job.salary}
                      </span>
                    )}
                    {job.tags && job.tags.length > 0 && (
                      <span className="bg-base-300 text-base-content px-2 py-1 rounded text-xs">
                        🏷️ {job.tags.slice(0, 2).join(", ")}
                        {job.tags.length > 2 && ` +${job.tags.length - 2}`}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-base-content/50">
                    <span>Saved on {new Date(job.savedAt?.toDate?.() || job.savedAt).toLocaleDateString()}</span>
                    {job.source && <span>• Source: {job.source}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
                      Apply
                    </a>
                  )}
                  <button
                    onClick={() => handleRemoveJob(job.id)}
                    className="btn btn-error btn-sm"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      )}
    </Motion.div>
  );
}
