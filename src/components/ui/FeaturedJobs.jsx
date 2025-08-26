import React from "react";
import JobCard from "./JobCard";

export default function FeaturedJobs({ jobs }) {
  // Filter jobs with a 'featured' tag or property
  const featured = jobs.filter(
    job => job.tags?.includes("featured") || job.featured === true
  );

  if (featured.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-accent mb-4">Featured Jobs</h2>
      <div className="flex flex-col gap-4">
        {featured.map(job => (
          <div key={job.slug || job.id} className="card bg-base-100 border border-base-300 shadow-xl p-4 sm:p-6 w-full">
            <h2 className="card-title text-lg font-bold text-accent mb-1">{job.title}</h2>
            <p className="text-sm text-base-content/70 mb-2">{job.company_name}</p>
            <p className="text-sm text-base-content/80 mb-2">{(job.description || '').slice(0, 100)}...</p>
            <div className="flex flex-col gap-2 mt-2 w-full">
              <a href={job.slug ? `/job/${job.slug}` : '#'} className="btn btn-accent w-full font-semibold">View Details</a>
              <button className="btn btn-accent btn-outline w-full font-semibold">Save</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
