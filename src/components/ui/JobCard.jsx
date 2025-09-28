import { Link } from "react-router";
import Button from "./Button";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { doc, setDoc, deleteDoc, getDoc, addDoc, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { MapPinIcon, CurrencyDollarIcon, TagIcon, HeartIcon, BookmarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { motion as Motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function stripHTML(html) {
  return html.replace(/<[^>]+>/g, "");
}

export default function JobCard({ title, company, description, slug, location, salary, tags = [], url, source }) {
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function checkSaved() {
      if (!user) {
        setSaved(false);
        return;
      }
      const docRef = doc(db, "users", user.uid, "savedJobs", slug);
      const docSnap = await getDoc(docRef);
      setSaved(docSnap.exists());
    }
    checkSaved();
  }, [slug, user]);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to save jobs");
      return;
    }
    
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", user.uid, "savedJobs", slug);
      if (!saved) {
        await setDoc(docRef, { title, company, description, slug });
        setSaved(true);
        toast.success("Job saved successfully!");
      } else {
        await deleteDoc(docRef);
        setSaved(false);
        toast.success("Job removed from saved");
      }
    } catch (err) {
      console.error("Failed to save job:", err);
      toast.error("Failed to save job");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickApply = async () => {
    if (!user) {
      toast.error("Please sign in to track applications");
      return;
    }
    
    setIsApplying(true);
    try {
      const applicationsRef = collection(db, "users", user.uid, "applications");
      await addDoc(applicationsRef, {
        company: company,
        position: title,
        location: location,
        salary: salary,
        jobUrl: url,
        appliedDate: new Date(),
        status: "APPLIED",
        notes: `Applied via ${source || 'Role Rocket'}`
      });
      toast.success("Application tracked! Check your Application Tracker.");
    } catch (err) {
      console.error("Failed to track application:", err);
      toast.error("Failed to track application");
    } finally {
      setIsApplying(false);
    }
  };

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
      className="card bg-base-100 border border-base-300 p-6 w-full group cursor-pointer relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      tabIndex={0}
    >
      {/* Animated background gradient */}
      <Motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Save button - floating */}
      <Motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.2, delay: 0.1 }}
        onClick={handleSave}
        disabled={isLoading}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-base-100 shadow-lg border border-base-200 hover:shadow-xl transition-all duration-200"
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

      <div className="relative z-10">
        {/* Header with animated title */}
        <Motion.div 
          className="flex items-start justify-between gap-3 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex-1">
            <Motion.h2 
              className="card-title text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </Motion.h2>
            <Motion.p 
              className="text-sm text-base-content/70 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {company}
            </Motion.p>
          </div>
        </Motion.div>

        {/* Job details with staggered animation */}
        <Motion.div 
          className="flex flex-wrap gap-3 items-center mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {location && (
            <Motion.span 
              className="flex items-center gap-1 text-xs text-base-content/70 bg-base-200 px-2 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <MapPinIcon className="w-3 h-3 text-primary" />
              {location}
            </Motion.span>
          )}
          {typeof salary !== 'undefined' && salary !== null && salary !== '' && (
            <Motion.span 
              className="flex items-center gap-1 text-xs text-base-content/70 bg-base-200 px-2 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <CurrencyDollarIcon className="w-3 h-3 text-primary" />
              {salary}
            </Motion.span>
          )}
          {tags && tags.length > 0 && (
            <Motion.span 
              className="flex items-center gap-1 text-xs text-base-content/70 bg-base-200 px-2 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <TagIcon className="w-3 h-3 text-primary" />
              {tags.slice(0, 2).join(', ')}
              {tags.length > 2 && <span className="ml-1">+{tags.length - 2}</span>}
            </Motion.span>
          )}
        </Motion.div>

        {/* Description with fade in */}
        <Motion.p 
          className="text-sm text-base-content/80 mb-4 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {stripHTML(description).slice(0, 120)}...
        </Motion.p>

        {/* Action buttons with enhanced animations */}
        <Motion.div 
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to={`/job/${slug}`} state={{ job: { slug, title, company_name: company, description, location, salary, tags, url, source } }}>
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
                onClick={handleQuickApply}
                disabled={isApplying}
              >
                {isApplying ? (
                  <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                  />
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
                  saved 
                    ? "btn-primary" 
                    : "btn-outline btn-primary"
                }`}
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                  />
                ) : (
                  saved ? "Saved" : "Save"
                )}
              </Button>
            </Motion.div>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
}
