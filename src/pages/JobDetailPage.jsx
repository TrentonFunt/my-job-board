import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import DOMPurify from "dompurify";

export default function JobDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch("https://corsproxy.io/?https://arbeitnow.com/api/job-board-api");
      const data = await res.json();
      const found = data.data.find((j) => j.slug === slug);
      setJob(found);
    }
    fetchJobs();
  }, [slug]);

  if (!job) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found.</p>;

  // Sanitize and render HTML job description
  function renderDescription(desc) {
    if (!desc) return null;
    const cleanHTML = DOMPurify.sanitize(desc);
    // Split on <h2> tags to separate sections
    const sectionRegex = /(<h2[^>]*>.*?<\/h2>)/gi;
    const parts = cleanHTML.split(sectionRegex).filter(Boolean);
    return (
      <div className="prose max-w-none text-base-content">
        {parts.map((part, idx) => {
          // If it's a heading, render with extra margin
          if (/<h2[^>]*>.*?<\/h2>/i.test(part)) {
            return (
              <div key={idx} className="mt-8 mb-2">
                <div dangerouslySetInnerHTML={{ __html: part }} />
              </div>
            );
          }
          // Otherwise, wrap the section content in a card-like div for separation
          return (
            <div key={idx} className="mb-8 p-4 bg-base-200 rounded-box shadow-sm">
              <div dangerouslySetInnerHTML={{ __html: part }} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="card bg-base-100 shadow-xl border border-base-300 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          <div>
            <h1 className="text-3xl font-bold text-accent mb-1">{job.title}</h1>
            <p className="text-base-content/70 font-medium mb-1">{job.company_name}</p>
            {job.location && (
              <span className="badge badge-outline badge-lg mr-2 mb-2">{job.location}</span>
            )}
            {job.tags && job.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {job.tags.map((tag) => (
                  <span key={tag} className="badge badge-accent badge-outline">{tag}</span>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center mt-2 md:mt-0">
            <Button className="btn-outline" onClick={() => navigate(-1)}>
              ← Back
            </Button>
            {job.url && (
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                <Button className="btn-accent">Apply Now</Button>
              </a>
            )}
          </div>
        </div>
        <div className="divider"></div>
  {renderDescription(job.description)}
      </div>
    </div>
  );
}
