/**
 * JobCard - Main job listing card component
 * Displays job information with save and apply functionality
 * 
 * Features:
 * - Consistent card sizing regardless of content
 * - Animated hover states
 * - Save/unsave jobs
 * - Quick apply tracking
 */

import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { MapPinIcon, CurrencyDollarIcon, TagIcon } from "@heroicons/react/24/outline";
import { motion as Motion } from "framer-motion";
import toast from "react-hot-toast";
import { isJobSaved, toggleSaveJob, trackApplication } from "../../services/savedJobs";

// Sub-components
import JobCardHeader from "./JobCardHeader";
import JobCardBadge from "./JobCardBadge";
import JobCardActions from "./JobCardActions";
import JobCardSaveButton from "./JobCardSaveButton";

/**
 * Strip HTML tags from a string
 * @param {string} html - HTML string to strip
 * @returns {string} Plain text
 */
function stripHTML(html) {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
}

/**
 * Truncate text to a maximum length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum character length
 * @returns {string} Truncated text
 */
function truncateText(text, maxLength = 100) {
  if (!text) return "";
  const stripped = stripHTML(text);
  if (stripped.length <= maxLength) return stripped;
  return stripped.slice(0, maxLength).trim() + "...";
}

// Card height constant for consistency
const CARD_HEIGHT = "h-[340px]";
const DESCRIPTION_LENGTH = 100;

export default function JobCard({ 
  title, 
  company, 
  description, 
  slug, 
  location, 
  salary, 
  tags = [], 
  url, 
  source 
}) {
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Check saved status
  useEffect(() => {
    async function checkSaved() {
      if (!user) {
        setSaved(false);
        return;
      }
      const isSaved = await isJobSaved(user.uid, slug);
      setSaved(isSaved);
    }
    checkSaved();
  }, [slug, user]);

  /**
   * Handle save/unsave job
   */
  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to save jobs");
      return;
    }
    
    setIsLoading(true);
    try {
      const jobData = { title, company, description, slug };
      const result = await toggleSaveJob(user.uid, jobData, saved);
      
      if (result.success) {
        setSaved(result.saved);
        toast.success(result.saved ? "Job saved successfully!" : "Job removed from saved");
      } else {
        toast.error(result.error || "Failed to save job");
      }
    } catch (err) {
      console.error("Failed to save job:", err);
      toast.error("Failed to save job");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle quick apply - tracks application
   */
  const handleQuickApply = async () => {
    if (!user) {
      toast.error("Please sign in to track applications");
      return;
    }
    
    setIsApplying(true);
    try {
      const applicationData = {
        company,
        position: title,
        location,
        salary,
        jobUrl: url,
        appliedDate: new Date(),
        status: "APPLIED",
        notes: `Applied via ${source || 'Role Rocket'}`
      };
      
      const result = await trackApplication(user.uid, applicationData);
      
      if (result.success) {
        toast.success("Application tracked! Check your Application Tracker.");
      } else {
        toast.error(result.error || "Failed to track application");
      }
    } catch (err) {
      console.error("Failed to track application:", err);
      toast.error("Failed to track application");
    } finally {
      setIsApplying(false);
    }
  };

  // Job data object for actions component
  const jobData = { slug, title, company, description, location, salary, tags, url, source };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`card bg-base-100 border border-base-300 p-6 w-full ${CARD_HEIGHT} flex flex-col group cursor-pointer relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
      tabIndex={0}
    >
      {/* Animated background gradient */}
      <Motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating save button */}
      <JobCardSaveButton 
        saved={saved}
        isVisible={isHovered}
        isLoading={isLoading}
        onClick={handleSave}
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Header - Title & Company */}
        <JobCardHeader title={title} company={company} />

        {/* Job metadata badges */}
        <Motion.div 
          className="flex flex-wrap gap-2 items-center mb-3 min-h-[28px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {location && (
            <JobCardBadge icon={<MapPinIcon className="w-3 h-3" />}>
              <span className="truncate max-w-[120px]">{location}</span>
            </JobCardBadge>
          )}
          {salary != null && salary !== '' && (
            <JobCardBadge icon={<CurrencyDollarIcon className="w-3 h-3" />}>
              {salary}
            </JobCardBadge>
          )}
          {tags?.length > 0 && (
            <JobCardBadge icon={<TagIcon className="w-3 h-3" />}>
              {tags.slice(0, 2).join(', ')}
              {tags.length > 2 && <span className="ml-1">+{tags.length - 2}</span>}
            </JobCardBadge>
          )}
        </Motion.div>

        {/* Description - fixed height for consistency */}
        <Motion.p 
          className="text-sm text-base-content/80 leading-relaxed line-clamp-3 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {truncateText(description, DESCRIPTION_LENGTH)}
        </Motion.p>

        {/* Spacer to push actions to bottom */}
        <div className="flex-1 min-h-2" />

        {/* Action buttons - always at bottom */}
        <JobCardActions
          job={jobData}
          saved={saved}
          isLoading={isLoading}
          isApplying={isApplying}
          onSave={handleSave}
          onApply={handleQuickApply}
        />
      </div>
    </Motion.div>
  );
}