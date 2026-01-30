import { motion as Motion } from "framer-motion";
import { 
  BriefcaseIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";

/**
 * Get status badge styling and icon for job status
 * @param {string} status - Job status (pending, approved, rejected)
 * @returns {{ className: string, icon: JSX.Element, label: string }}
 */
function getStatusBadgeInfo(status) {
  switch (status) {
    case "approved":
    case "active":
      return {
        className: "bg-success/20 text-success",
        icon: <CheckCircleIcon className="w-3 h-3" />,
        label: "Live"
      };
    case "rejected":
      return {
        className: "bg-error/20 text-error",
        icon: <XCircleIcon className="w-3 h-3" />,
        label: "Rejected"
      };
    case "pending":
    default:
      return {
        className: "bg-warning/20 text-warning",
        icon: <ClockIcon className="w-3 h-3" />,
        label: "Pending Review"
      };
  }
}

/**
 * Jobs list tab for Employer Dashboard
 * @param {{ 
 *   jobs: Array, 
 *   selectedJobs: Array,
 *   isLoading: boolean,
 *   onSelectJob: Function,
 *   onSelectAllJobs: Function,
 *   onEditJob: Function,
 *   onDeleteJob: Function,
 *   onBulkDeleteJobs: Function,
 *   onPostJob: Function
 * }} props
 */
export default function EmployerJobsList({ 
  jobs, 
  selectedJobs,
  isLoading,
  onSelectJob,
  onSelectAllJobs,
  onEditJob,
  onDeleteJob,
  onBulkDeleteJobs,
  onPostJob
}) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Bulk Actions for Jobs */}
      {jobs.length > 0 && (
        <div className="bg-base-200 rounded-xl p-4 border border-base-300 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedJobs.length === jobs.length && jobs.length > 0}
                onChange={onSelectAllJobs}
                className="checkbox checkbox-primary"
              />
              <span className="text-sm text-base-content/70">
                {selectedJobs.length > 0 
                  ? `${selectedJobs.length} job(s) selected`
                  : 'Select all jobs'
                }
              </span>
            </div>
            
            {selectedJobs.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={onBulkDeleteJobs}
                  className="btn btn-error btn-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : `Delete ${selectedJobs.length} job(s)`}
                </button>
                <button
                  onClick={() => onSelectJob(null)} // Clear selection
                  className="btn btn-ghost btn-sm"
                >
                  Clear selection
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {jobs.map((job, index) => (
          <Motion.div 
            key={job.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-base-200 rounded-xl p-4 sm:p-6 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={selectedJobs.includes(job.id)}
                  onChange={() => onSelectJob(job.id)}
                  className="checkbox checkbox-primary mt-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-base-content truncate">{job.title}</h3>
                    {/* Job Status Badge */}
                    {(() => {
                      const statusInfo = getStatusBadgeInfo(job.status);
                      return (
                        <span className={`badge badge-sm gap-1 flex-shrink-0 ${statusInfo.className}`}>
                          {statusInfo.icon}
                          {statusInfo.label}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-base-content/60 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                      <span className="truncate">{job.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></span>
                      <span className="truncate">{job.type}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></span>
                      <span className="truncate">{job.salary}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-info rounded-full flex-shrink-0"></span>
                      <span className="truncate">{job.applicationsCount} applications</span>
                    </span>
                  </div>
                  <p className="text-base-content/70 text-sm line-clamp-2">{job.description}</p>
                </div>
              </div>
              <div className="flex gap-2 sm:ml-4 sm:flex-col lg:flex-row">
                <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => {/* View job details */}}
                    className="btn btn-ghost btn-sm flex-1 sm:flex-none touch-manipulation"
                    title="View Details"
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span className="sm:hidden ml-2">View</span>
                  </Button>
                </Motion.div>
                <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => onEditJob(job)}
                    className="btn btn-primary btn-sm flex-1 sm:flex-none touch-manipulation"
                    title="Edit Job"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span className="sm:hidden ml-2">Edit</span>
                  </Button>
                </Motion.div>
                <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => onDeleteJob(job.id)}
                    className="btn btn-error btn-sm flex-1 sm:flex-none touch-manipulation"
                    title="Delete Job"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="sm:hidden ml-2">Delete</span>
                  </Button>
                </Motion.div>
              </div>
            </div>
          </Motion.div>
        ))}
        
        {jobs.length === 0 && (
          <div className="text-center py-12">
            <BriefcaseIcon className="w-16 h-16 text-base-content/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-base-content mb-2">No jobs posted yet</h3>
            <p className="text-base-content/60 mb-6">Start by posting your first job to attract candidates</p>
            <Button
              onClick={onPostJob}
              className="btn btn-primary px-6 py-3"
            >
              Post Your First Job
            </Button>
          </div>
        )}
      </div>
    </Motion.div>
  );
}
