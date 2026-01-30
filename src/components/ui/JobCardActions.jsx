/**
 * JobCardActions - Action buttons for JobCard
 * Handles View Details, Apply, and Save actions
 */

import { Link } from "react-router";
import { motion as Motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

/**
 * Loading spinner component
 */
function LoadingSpinner() {
  return (
    <Motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
    />
  );
}

/**
 * @param {Object} props
 * @param {Object} props.job - Job data object
 * @param {boolean} props.saved - Whether job is saved
 * @param {boolean} props.isLoading - Save button loading state
 * @param {boolean} props.isApplying - Apply button loading state
 * @param {Function} props.onSave - Save button click handler
 * @param {Function} props.onApply - Apply button click handler
 */
export default function JobCardActions({ 
  job, 
  saved, 
  isLoading, 
  isApplying, 
  onSave, 
  onApply 
}) {
  const { slug, title, company, description, location, salary, tags, url, source } = job;

  return (
    <Motion.div 
      className="flex flex-col gap-2 mt-auto pt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Link 
        to={`/job/${slug}`} 
        state={{ job: { slug, title, company_name: company, description, location, salary, tags, url, source } }}
      >
        <Motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Button className="w-full btn btn-primary shadow-lg hover:shadow-xl transition-all duration-200 text-sm">
            View Details
          </Button>
        </Motion.div>
      </Link>
      
      <div className="flex gap-2">
        <Motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          <Button
            className="w-full btn btn-secondary shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-1 text-sm"
            onClick={onApply}
            disabled={isApplying}
          >
            {isApplying ? (
              <LoadingSpinner />
            ) : (
              <>
                <PaperAirplaneIcon className="w-4 h-4" />
                <span>Apply</span>
              </>
            )}
          </Button>
        </Motion.div>
        
        <Motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          <Button
            className={`w-full btn transition-all duration-200 text-sm ${
              saved ? "btn-primary" : "btn-outline btn-primary"
            }`}
            onClick={onSave}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : (saved ? "Saved" : "Save")}
          </Button>
        </Motion.div>
      </div>
    </Motion.div>
  );
}
