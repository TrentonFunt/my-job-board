import { useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, BookmarkIcon, ShareIcon, CalendarIcon, ClockIcon, BriefcaseIcon, DocumentIcon, AcademicCapIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import DOMPurify from "dompurify";
import Spinner from "../components/ui/Spinner";
import { fetchAggregatedJobs } from "../services/jobs";

export default function JobDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ensure page starts at top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    // If job is passed via Link state, use it
    const stateJob = location.state?.job;
    if (stateJob && stateJob.slug === slug) {
      setJob(stateJob);
      setLoading(false);
      return;
    }
    async function fetchJobs() {
      try {
        const data = await fetchAggregatedJobs();
        const found = data.find((j) => j.slug === slug);
        setJob(found || null);
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [slug, location.state]);

  if (loading) return <Spinner className="mt-10" />;
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
              <div key={idx} className="mt-6 sm:mt-8 mb-2">
                <div dangerouslySetInnerHTML={{ __html: part }} />
              </div>
            );
          }
          // Otherwise, wrap the section content in a card-like div for separation
          return (
            <div key={idx} className="mb-4 sm:mb-8 p-2 sm:p-4 bg-base-200 rounded-box shadow-sm">
              <div dangerouslySetInnerHTML={{ __html: part }} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Breadcrumbs */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-slate-400">
            <span>Home</span> / <span>Find Job</span> / <span>Graphics & Design</span> / <span className="text-white">Job Details</span>
          </nav>
        </div>
      </div>


      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800 rounded-lg p-6 border border-slate-700"
            >
              {/* Job Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {job.company_name?.charAt(0) || 'C'}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">{job.title}</h1>
                  <p className="text-slate-300 mb-3">at {job.company_name}</p>
                  <div className="flex gap-2">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">FULL-TIME</span>
                    <span className="bg-slate-600 text-slate-300 px-3 py-1 rounded-full text-sm">Featured</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200">
                    <BookmarkIcon className="w-5 h-5 text-slate-300" />
                  </button>
                  {job.url && (
                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2">
                        Apply Now
                        <ArrowLeftIcon className="w-4 h-4 rotate-180" />
                      </button>
                    </a>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
                <div className="text-slate-300 leading-relaxed">
                  {renderDescription(job.description)}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Job Overview */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Salary */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6">
                <h3 className="text-emerald-400 text-sm font-medium mb-2">Salary (USD)</h3>
                <p className="text-2xl font-bold text-white mb-1">$100,000 - $120,000</p>
                <p className="text-emerald-400 text-sm">Yearly salary</p>
              </div>

              {/* Job Location */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-slate-300 text-sm font-medium mb-2">Job Location</h3>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-slate-400" />
                  <span className="text-white">{job.location || 'Dhaka, Bangladesh'}</span>
                </div>
              </div>

              {/* Job Overview */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-slate-300 text-sm font-medium mb-4">Job Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">JOB POSTED</p>
                      <p className="text-sm text-white">14 Jun, 2021</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">JOB EXPIRE IN</p>
                      <p className="text-sm text-white">14 Aug, 2021</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">JOB LEVEL</p>
                      <p className="text-sm text-white">Entry Level</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DocumentIcon className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">EXPERIENCE</p>
                      <p className="text-sm text-white">$50k-80k/month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AcademicCapIcon className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">EDUCATION</p>
                      <p className="text-sm text-white">Graduation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Links */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <button className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 mb-4">
                  <ShareIcon className="w-4 h-4" />
                  Copy Links
                </button>
                <div className="flex gap-4">
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                    <span className="text-slate-400 text-sm">LinkedIn</span>
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                    <span className="text-slate-400 text-sm">Facebook</span>
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                    <span className="text-slate-400 text-sm">Twitter</span>
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                    <span className="text-slate-400 text-sm">Email</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Related Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors duration-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white font-medium">Technical Support Specialist</h3>
                  <BookmarkIcon className="w-5 h-5 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-emerald-400 text-sm font-medium">PART-TIME</p>
                  <p className="text-slate-300 text-sm">Salary: $20,000 - $25,000</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <span className="text-slate-300 text-sm">Google Inc.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400 text-sm">Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
