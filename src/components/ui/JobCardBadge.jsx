/**
 * JobCardBadge - Small badge component for job metadata
 * Used for location, salary, and tags display
 */

import { motion as Motion } from "framer-motion";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {React.ReactNode} props.children - Badge content
 */
export default function JobCardBadge({ icon, children }) {
  return (
    <Motion.span 
      className="flex items-center gap-1 text-xs text-base-content/70 bg-base-200 px-2 py-1 rounded-full"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className="text-primary">{icon}</span>}
      {children}
    </Motion.span>
  );
}
