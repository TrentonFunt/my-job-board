import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { db } from "../../firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import JobCard from "../ui/JobCard";

export default function FeaturedJobs() {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const jobsRef = collection(db, "jobs");
        const q = query(
          jobsRef, 
          where("featured", "==", true),
          limit(6)
        );
        const querySnapshot = await getDocs(q);
        const jobs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeaturedJobs(jobs);
      } catch (error) {
        console.error("Error fetching featured jobs:", error);
        // If the query fails (e.g., missing index), try a simpler query
        try {
          const jobsRef = collection(db, "jobs");
          const simpleQuery = query(jobsRef, limit(20));
          const querySnapshot = await getDocs(simpleQuery);
          const allJobs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // Filter featured jobs on the client side
          const featured = allJobs.filter(job => job.featured === true);
          setFeaturedJobs(featured);
        } catch (fallbackError) {
          console.error("Fallback query also failed:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  if (loading) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card bg-base-100 shadow-xl animate-pulse">
              <div className="card-body">
                <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-base-300 rounded w-1/2 mb-4"></div>
                <div className="h-20 bg-base-300 rounded mb-4"></div>
                <div className="h-8 bg-base-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (featuredJobs.length === 0) return null;

  return (
    <Motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Featured Jobs</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-400 font-medium">Premium Opportunities</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredJobs.map((job, index) => (
          <Motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="relative"
          >
            <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
              Featured
            </div>
            <JobCard
              slug={job.slug || job.id}
              title={job.title}
              company={job.company_name}
              description={job.description}
              location={job.location}
              salary={job.salary}
              tags={job.tags}
              url={job.application_link || job.url}
              source={job.source || "admin"}
            />
          </Motion.div>
        ))}
      </div>
    </Motion.section>
  );
}
