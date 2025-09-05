import React from "react";
import JobCard from "./JobCard";
import Button from "./Button";

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
          <div
            key={job.slug || job.id}
            className="card bg-base-100 border border-base-300 shadow-xl p-4 sm:p-6 w-full transition-all duration-200 ease-in-out hover:shadow-2xl hover:scale-[1.025] focus-within:shadow-2xl focus-within:scale-[1.02] active:scale-[0.98] group cursor-pointer"
            tabIndex={0}
          >
            <h2 className="card-title text-lg font-bold text-accent mb-1 transition-colors duration-150 group-hover:text-accent-focus group-focus:text-accent-focus">{job.title}</h2>
            <p className="text-sm text-base-content/70 mb-2 transition-colors duration-150 group-hover:text-accent/80 group-focus:text-accent/80">{job.company_name}</p>
            <p className="text-sm text-base-content/80 mb-2 transition-colors duration-150 group-hover:text-base-content group-focus:text-base-content">{(job.description || '').slice(0, 100)}...</p>
            <div className="flex flex-col gap-2 mt-2 w-full">
              <Button
                as="a"
                href={job.slug ? `/job/${job.slug}` : '#'}
                className="btn-accent w-full font-semibold transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus:ring-2 focus:ring-accent/40"
              >
                View Details
              </Button>
              <Button
                className="btn-accent btn-outline w-full font-semibold transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus:ring-2 focus:ring-accent/40"
              >
                Save
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
