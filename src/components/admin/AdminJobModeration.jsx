import { useState, useEffect, useCallback } from "react";
import { motion as Motion } from "framer-motion";
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  EyeIcon,
  ClockIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc, query, where, orderBy } from "firebase/firestore";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

/**
 * Admin Job Moderation Panel
 * Allows admins to review, approve, or reject employer-posted jobs
 */
export default function AdminJobModeration() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending"); // pending, approved, rejected, all
  const [selectedJob, setSelectedJob] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      let q;
      if (filter === "all") {
        q = query(
          collection(db, "employerJobs"),
          orderBy("createdAt", "desc")
        );
      } else {
        q = query(
          collection(db, "employerJobs"),
          where("status", "==", filter),
          orderBy("createdAt", "desc")
        );
      }
      
      const snapshot = await getDocs(q);
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs for moderation:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleUpdateStatus = async (jobId, newStatus) => {
    setActionLoading(true);
    try {
      await updateDoc(doc(db, "employerJobs", jobId), {
        status: newStatus,
        moderatedAt: new Date().toISOString(),
        moderationNote: newStatus === "approved" 
          ? "Approved by admin" 
          : "Rejected by admin"
      });
      
      // Update local state
      setJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: newStatus, moderatedAt: new Date().toISOString() }
          : job
      ));
      
      // Close preview if this job was being viewed
      if (selectedJob?.id === jobId) {
        setSelectedJob(null);
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-warning/20 text-warning",
      approved: "bg-success/20 text-success",
      rejected: "bg-error/20 text-error",
      active: "bg-success/20 text-success"
    };
    return styles[status] || styles.pending;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
      case "active":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "rejected":
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  const pendingCount = jobs.filter(j => j.status === "pending").length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Job Moderation</h2>
          <p className="text-base-content/60 text-sm mt-1">
            Review and approve employer-posted jobs before they go live
          </p>
        </div>
        
        {pendingCount > 0 && (
          <div className="badge badge-warning gap-2 py-3 px-4">
            <ClockIcon className="w-4 h-4" />
            {pendingCount} pending review
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-1 mb-6 w-fit">
        {[
          { key: "pending", label: "Pending" },
          { key: "approved", label: "Approved" },
          { key: "rejected", label: "Rejected" },
          { key: "all", label: "All" }
        ].map(tab => (
          <button
            key={tab.key}
            className={`tab ${filter === tab.key ? "tab-active" : ""}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
            {tab.key === "pending" && pendingCount > 0 && (
              <span className="ml-2 badge badge-sm badge-warning">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-xl border border-base-300">
          <BriefcaseIcon className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-base-content mb-2">
            No {filter === "all" ? "" : filter} jobs
          </h3>
          <p className="text-base-content/60">
            {filter === "pending" 
              ? "All employer jobs have been reviewed!" 
              : "No jobs match this filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <Motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-base-200 rounded-xl p-4 sm:p-6 border border-base-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`badge gap-1 ${getStatusBadge(job.status)}`}>
                      {getStatusIcon(job.status)}
                      {job.status}
                    </span>
                    <span className="text-xs text-base-content/50">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-base-content mb-2 truncate">
                    {job.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-base-content/70 mb-3">
                    <div className="flex items-center gap-2">
                      <BuildingOfficeIcon className="w-4 h-4 text-primary" />
                      <span className="truncate">{job.company || job.employerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-secondary" />
                      <span className="truncate">{job.location || "Remote"}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="w-4 h-4 text-accent" />
                        <span className="truncate">{job.salary}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <BriefcaseIcon className="w-4 h-4 text-info" />
                      <span className="truncate">{job.type || "Full-time"}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-base-content/60 line-clamp-2">
                    {job.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[140px]">
                  <Button
                    onClick={() => setSelectedJob(job)}
                    className="btn btn-ghost btn-sm flex-1 lg:flex-none"
                  >
                    <EyeIcon className="w-4 h-4" />
                    Preview
                  </Button>
                  
                  {job.status === "pending" && (
                    <>
                      <Button
                        onClick={() => handleUpdateStatus(job.id, "approved")}
                        className="btn btn-success btn-sm flex-1 lg:flex-none"
                        disabled={actionLoading}
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleUpdateStatus(job.id, "rejected")}
                        className="btn btn-error btn-sm flex-1 lg:flex-none"
                        disabled={actionLoading}
                      >
                        <XCircleIcon className="w-4 h-4" />
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {job.status === "approved" && (
                    <Button
                      onClick={() => handleUpdateStatus(job.id, "rejected")}
                      className="btn btn-warning btn-sm flex-1 lg:flex-none"
                      disabled={actionLoading}
                    >
                      Revoke
                    </Button>
                  )}
                  
                  {job.status === "rejected" && (
                    <Button
                      onClick={() => handleUpdateStatus(job.id, "approved")}
                      className="btn btn-success btn-sm flex-1 lg:flex-none"
                      disabled={actionLoading}
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      )}

      {/* Job Preview Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-base-300 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-200">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-base-content">Job Preview</h3>
                <span className={`badge gap-1 ${getStatusBadge(selectedJob.status)}`}>
                  {getStatusIcon(selectedJob.status)}
                  {selectedJob.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <h2 className="text-2xl font-bold text-base-content mb-2">
                {selectedJob.title}
              </h2>
              
              <div className="flex flex-wrap gap-4 text-sm text-base-content/70 mb-6">
                <span className="flex items-center gap-1">
                  <BuildingOfficeIcon className="w-4 h-4" />
                  {selectedJob.company || selectedJob.employerName}
                </span>
                <span className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  {selectedJob.location || "Remote"}
                </span>
                {selectedJob.salary && (
                  <span className="flex items-center gap-1">
                    <CurrencyDollarIcon className="w-4 h-4" />
                    {selectedJob.salary}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <BriefcaseIcon className="w-4 h-4" />
                  {selectedJob.type || "Full-time"}
                </span>
              </div>

              <div className="space-y-6">
                {selectedJob.description && (
                  <div>
                    <h4 className="font-semibold text-base-content mb-2">Description</h4>
                    <p className="text-base-content/70 whitespace-pre-wrap">{selectedJob.description}</p>
                  </div>
                )}
                
                {selectedJob.requirements && (
                  <div>
                    <h4 className="font-semibold text-base-content mb-2">Requirements</h4>
                    <p className="text-base-content/70 whitespace-pre-wrap">{selectedJob.requirements}</p>
                  </div>
                )}
                
                {selectedJob.benefits && (
                  <div>
                    <h4 className="font-semibold text-base-content mb-2">Benefits</h4>
                    <p className="text-base-content/70 whitespace-pre-wrap">{selectedJob.benefits}</p>
                  </div>
                )}

                {selectedJob.applicationUrl && (
                  <div>
                    <h4 className="font-semibold text-base-content mb-2">Application URL</h4>
                    <a 
                      href={selectedJob.applicationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {selectedJob.applicationUrl}
                    </a>
                  </div>
                )}

                <div className="text-xs text-base-content/50 pt-4 border-t border-base-300">
                  <p>Employer: {selectedJob.employerName}</p>
                  <p>Posted: {new Date(selectedJob.createdAt).toLocaleString()}</p>
                  {selectedJob.moderatedAt && (
                    <p>Moderated: {new Date(selectedJob.moderatedAt).toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            {selectedJob.status === "pending" && (
              <div className="flex gap-3 p-4 border-t border-base-300 bg-base-200">
                <Button
                  onClick={() => handleUpdateStatus(selectedJob.id, "approved")}
                  className="btn btn-success flex-1"
                  disabled={actionLoading}
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  Approve Job
                </Button>
                <Button
                  onClick={() => handleUpdateStatus(selectedJob.id, "rejected")}
                  className="btn btn-error flex-1"
                  disabled={actionLoading}
                >
                  <XCircleIcon className="w-5 h-5" />
                  Reject Job
                </Button>
              </div>
            )}
          </Motion.div>
        </div>
      )}
    </div>
  );
}
