/**
 * JobCardSaveButton - Floating save button for JobCard
 * Shows on hover with bookmark icon animation
 */

import { motion as Motion, AnimatePresence } from "framer-motion";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

/**
 * @param {Object} props
 * @param {boolean} props.saved - Whether job is saved
 * @param {boolean} props.isVisible - Whether button should be visible
 * @param {boolean} props.isLoading - Loading state
 * @param {Function} props.onClick - Click handler
 */
export default function JobCardSaveButton({ saved, isVisible, isLoading, onClick }) {
  return (
    <Motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.2, delay: 0.1 }}
      onClick={onClick}
      disabled={isLoading}
      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-base-100 shadow-lg border border-base-200 hover:shadow-xl transition-all duration-200"
      aria-label={saved ? "Remove from saved jobs" : "Save job"}
    >
      <AnimatePresence mode="wait">
        {saved ? (
          <Motion.div
            key="saved"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <BookmarkSolidIcon className="w-5 h-5 text-accent" />
          </Motion.div>
        ) : (
          <Motion.div
            key="unsaved"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <BookmarkIcon className="w-5 h-5 text-base-content/60" />
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.button>
  );
}
