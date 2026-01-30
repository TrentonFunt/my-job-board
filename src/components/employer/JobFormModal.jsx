import { motion as Motion, AnimatePresence } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";

/**
 * Modal for creating or editing job postings
 * @param {{
 *   isOpen: boolean,
 *   isEdit: boolean,
 *   jobData: Object,
 *   isLoading: boolean,
 *   onClose: Function,
 *   onSubmit: Function,
 *   onChange: Function
 * }} props
 */
export default function JobFormModal({
  isOpen,
  isEdit = false,
  jobData,
  isLoading,
  onClose,
  onSubmit,
  onChange
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-base-100 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-base-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-base-content">
              {isEdit ? "Edit Job" : "Post New Job"}
            </h2>
            <button
              onClick={onClose}
              className="text-base-content/60 hover:text-base-content transition-colors duration-200"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                id="job-title"
                name="title"
                placeholder="Job Title"
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={jobData.title}
                onChange={(e) => onChange({ ...jobData, title: e.target.value })}
                required
                autoComplete="off"
              />
              <input
                type="text"
                id="job-company"
                name="company"
                placeholder="Company Name"
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={jobData.company}
                onChange={(e) => onChange({ ...jobData, company: e.target.value })}
                required
                autoComplete="organization"
              />
              <input
                type="text"
                id="job-location"
                name="location"
                placeholder="Location"
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={jobData.location}
                onChange={(e) => onChange({ ...jobData, location: e.target.value })}
                required
                autoComplete="off"
              />
              <select
                id="job-type"
                name="type"
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={jobData.type}
                onChange={(e) => onChange({ ...jobData, type: e.target.value })}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
              <input
                type="text"
                id="job-salary"
                name="salary"
                placeholder="Salary Range"
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={jobData.salary}
                onChange={(e) => onChange({ ...jobData, salary: e.target.value })}
                autoComplete="off"
              />
            </div>

            <textarea
              id="job-description"
              name="description"
              placeholder="Job Description"
              rows={4}
              className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              value={jobData.description}
              onChange={(e) => onChange({ ...jobData, description: e.target.value })}
              required
            />

            <textarea
              id="job-requirements"
              name="requirements"
              placeholder="Requirements"
              rows={3}
              className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              value={jobData.requirements}
              onChange={(e) => onChange({ ...jobData, requirements: e.target.value })}
            />

            <textarea
              id="job-benefits"
              name="benefits"
              placeholder="Benefits"
              rows={3}
              className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              value={jobData.benefits}
              onChange={(e) => onChange({ ...jobData, benefits: e.target.value })}
            />

            <input
              type="url"
              id="job-application-url"
              name="applicationUrl"
              placeholder="Application URL (optional)"
              className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              value={jobData.applicationUrl}
              onChange={(e) => onChange({ ...jobData, applicationUrl: e.target.value })}
              autoComplete="url"
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={isLoading}
              >
                {isLoading ? (isEdit ? "Updating..." : "Posting...") : (isEdit ? "Update Job" : "Post Job")}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
}
