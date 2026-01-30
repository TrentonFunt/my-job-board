/**
 * JobCardHeader - Header section of JobCard
 * Displays job title and company name
 */

import { motion as Motion } from "framer-motion";

/**
 * @param {Object} props
 * @param {string} props.title - Job title
 * @param {string} props.company - Company name
 */
export default function JobCardHeader({ title, company }) {
  return (
    <Motion.div 
      className="flex items-start justify-between gap-3 mb-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex-1 min-w-0">
        <Motion.h2 
          className="card-title text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          title={title}
        >
          {title}
        </Motion.h2>
        <Motion.p 
          className="text-sm text-base-content/70 mt-1 truncate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          title={company}
        >
          {company}
        </Motion.p>
      </div>
    </Motion.div>
  );
}
