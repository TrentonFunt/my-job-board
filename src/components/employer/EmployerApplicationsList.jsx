import { motion as Motion } from "framer-motion";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";

/**
 * Applications list tab for Employer Dashboard
 * @param {{
 *   applications: Array,
 *   filteredApplications: Array,
 *   selectedApplications: Array,
 *   applicationFilter: string,
 *   applicationSearch: string,
 *   isLoading: boolean,
 *   onSearchChange: Function,
 *   onFilterChange: Function,
 *   onClearFilters: Function,
 *   onSelectApplication: Function,
 *   onSelectAllApplications: Function,
 *   onUpdateStatus: Function,
 *   onBulkUpdateStatus: Function
 * }} props
 */
export default function EmployerApplicationsList({
  applications,
  filteredApplications,
  selectedApplications,
  applicationFilter,
  applicationSearch,
  isLoading,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  onSelectApplication,
  onSelectAllApplications,
  onUpdateStatus,
  onBulkUpdateStatus
}) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search and Filter Controls */}
      <div className="bg-base-200 rounded-xl p-6 border border-base-300 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by candidate name or job title..."
              className="w-full bg-base-100 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              value={applicationSearch}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <select
              className="w-full bg-base-100 border border-base-300 rounded-lg px-4 py-3 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              value={applicationFilter}
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-base-content/60">
          <span>Showing {filteredApplications.length} of {applications.length} applications</span>
          {(applicationSearch || applicationFilter !== "all") && (
            <button
              onClick={onClearFilters}
              className="text-primary hover:text-primary-focus transition-colors duration-200"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Bulk Actions for Applications */}
      {filteredApplications.length > 0 && (
        <div className="bg-base-200 rounded-xl p-4 border border-base-300 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                onChange={onSelectAllApplications}
                className="checkbox checkbox-primary"
              />
              <span className="text-sm text-base-content/70">
                {selectedApplications.length > 0 
                  ? `${selectedApplications.length} application(s) selected`
                  : 'Select all applications'
                }
              </span>
            </div>
            
            {selectedApplications.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => onBulkUpdateStatus("accepted")}
                  className="btn btn-success btn-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : `Accept ${selectedApplications.length}`}
                </button>
                <button
                  onClick={() => onBulkUpdateStatus("rejected")}
                  className="btn btn-error btn-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : `Reject ${selectedApplications.length}`}
                </button>
                <button
                  onClick={() => onSelectApplication(null)}
                  className="btn btn-ghost btn-sm"
                >
                  Clear selection
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div key={application.id} className="bg-base-200 rounded-xl p-4 sm:p-6 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={selectedApplications.includes(application.id)}
                  onChange={() => onSelectApplication(application.id)}
                  className="checkbox checkbox-primary mt-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-base-content mb-2 truncate">{application.jobTitle}</h3>
                  <p className="text-base-content/70 mb-2 truncate">Applied by: {application.candidateName}</p>
                  <p className="text-base-content/60 text-sm mb-4">
                    Applied on: {new Date(application.appliedAt).toLocaleDateString()}
                  </p>
                  {application.coverLetter && (
                    <p className="text-base-content/70 text-sm line-clamp-3">{application.coverLetter}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:ml-4 sm:min-w-0">
                <span className={`px-3 py-1 rounded-full text-sm text-center ${
                  application.status === "pending" ? "bg-warning/20 text-warning" :
                  application.status === "accepted" ? "bg-success/20 text-success" :
                  "bg-error/20 text-error"
                }`}>
                  {application.status}
                </span>
                {application.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onUpdateStatus(application.id, "accepted")}
                      className="btn btn-success btn-sm flex-1 sm:flex-none touch-manipulation"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => onUpdateStatus(application.id, "rejected")}
                      className="btn btn-error btn-sm flex-1 sm:flex-none touch-manipulation"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {filteredApplications.length === 0 && applications.length > 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="w-16 h-16 text-base-content/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-base-content mb-2">No applications match your filters</h3>
            <p className="text-base-content/60 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={onClearFilters}
              className="btn btn-primary"
            >
              Clear filters
            </button>
          </div>
        )}
        
        {applications.length === 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="w-16 h-16 text-base-content/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-base-content mb-2">No applications yet</h3>
            <p className="text-base-content/60">Applications will appear here once candidates start applying to your jobs</p>
          </div>
        )}
      </div>
    </Motion.div>
  );
}
