import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db, auth } from "../../firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon, 
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { 
  CheckCircleIcon as CheckCircleSolidIcon,
  ClockIcon as ClockSolidIcon,
  XCircleIcon as XCircleSolidIcon
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const APPLICATION_STATUSES = {
  APPLIED: { 
    label: "Applied", 
    color: "info", 
    icon: ClockIcon,
    bgClass: "bg-blue-100 dark:bg-blue-900/20",
    borderClass: "border-blue-200 dark:border-blue-800",
    iconBgClass: "bg-blue-200 dark:bg-blue-800",
    textClass: "text-blue-600 dark:text-blue-400"
  },
  INTERVIEW: { 
    label: "Interview", 
    color: "warning", 
    icon: EyeIcon,
    bgClass: "bg-yellow-100 dark:bg-yellow-900/20",
    borderClass: "border-yellow-200 dark:border-yellow-800",
    iconBgClass: "bg-yellow-200 dark:bg-yellow-800",
    textClass: "text-yellow-600 dark:text-yellow-400"
  },
  OFFER: { 
    label: "Offer", 
    color: "success", 
    icon: CheckCircleIcon,
    bgClass: "bg-green-100 dark:bg-green-900/20",
    borderClass: "border-green-200 dark:border-green-800",
    iconBgClass: "bg-green-200 dark:bg-green-800",
    textClass: "text-green-600 dark:text-green-400"
  },
  REJECTED: { 
    label: "Rejected", 
    color: "error", 
    icon: XCircleIcon,
    bgClass: "bg-red-100 dark:bg-red-900/20",
    borderClass: "border-red-200 dark:border-red-800",
    iconBgClass: "bg-red-200 dark:bg-red-800",
    textClass: "text-red-600 dark:text-red-400"
  }
};

export default function ApplicationTracker() {
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchApplications = useCallback(async () => {
    if (!user) return;
    try {
      const applicationsRef = collection(db, "users", user.uid, "applications");
      const q = query(applicationsRef, orderBy("appliedDate", "desc"));
      const snapshot = await getDocs(q);
      const apps = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(apps);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchApplications();
    } else {
      setApplications([]);
      setLoading(false);
    }
  }, [user, fetchApplications]);

  const addApplication = async (applicationData) => {
    try {
      const applicationsRef = collection(db, "users", user.uid, "applications");
      await addDoc(applicationsRef, {
        ...applicationData,
        appliedDate: new Date(),
        status: "APPLIED",
        notes: ""
      });
      toast.success("Application added successfully!");
      fetchApplications();
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add application:", error);
      toast.error("Failed to add application");
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const appRef = doc(db, "users", user.uid, "applications", id);
      await updateDoc(appRef, { status });
      toast.success("Status updated!");
      fetchApplications();
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const deleteApplication = async (id) => {
    try {
      const appRef = doc(db, "users", user.uid, "applications", id);
      await deleteDoc(appRef);
      toast.success("Application removed");
      fetchApplications();
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast.error("Failed to delete application");
    }
  };

  const getStatusStats = () => {
    const stats = {
      APPLIED: 0,
      INTERVIEW: 0,
      OFFER: 0,
      REJECTED: 0
    };
    
    applications.forEach(app => {
      stats[app.status] = (stats[app.status] || 0) + 1;
    });
    
    return stats;
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 shadow-xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-base-content mb-4">Application Tracker</h2>
        <p className="text-base-content/70 mb-6">
          Sign in to track your job applications and never lose track of your progress again.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary"
          onClick={() => window.location.href = '/auth'}
        >
          Sign In to Track Applications
        </motion.button>
      </motion.div>
    );
  }

  const stats = getStatusStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-base-content">Application Tracker</h2>
          <p className="text-base-content/70 mt-1">
            Keep track of all your job applications in one place
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Application
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(APPLICATION_STATUSES).map(([key, status]) => {
          const Icon = status.icon;
          const count = stats[key] || 0;
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * Object.keys(APPLICATION_STATUSES).indexOf(key) }}
              className={`card ${status.bgClass} border ${status.borderClass} p-4`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${status.iconBgClass}`}>
                  <Icon className={`w-6 h-6 ${status.textClass}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${status.textClass}`}>{count}</div>
                  <div className="text-sm text-base-content/70">{status.label}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Application Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="card bg-base-100 shadow-xl p-6"
          >
            <AddApplicationForm 
              onSubmit={addApplication}
              onCancel={() => setShowAddForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Applications List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="loading loading-spinner loading-lg text-accent"></div>
          </div>
        ) : applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card bg-base-100 shadow-xl p-8 text-center"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-base-content mb-2">No applications yet</h3>
            <p className="text-base-content/70 mb-4">
              Start tracking your job applications to stay organized and never miss a follow-up.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary"
            >
              Add Your First Application
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {applications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card bg-base-100 shadow-lg p-4 border border-base-200"
              >
                <ApplicationCard
                  application={app}
                  onStatusChange={updateApplicationStatus}
                  onDelete={deleteApplication}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function AddApplicationForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    salary: "",
    jobUrl: "",
    notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.position) {
      toast.error("Company and position are required");
      return;
    }
    onSubmit(formData);
    setFormData({
      company: "",
      position: "",
      location: "",
      salary: "",
      jobUrl: "",
      notes: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold text-base-content mb-4">Add New Application</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">Company *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label className="label">
            <span className="label-text">Position *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
        
        <div>
          <label className="label">
            <span className="label-text">Salary</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            placeholder="e.g., $80,000 - $100,000"
          />
        </div>
      </div>
      
      <div>
        <label className="label">
          <span className="label-text">Job URL</span>
        </label>
        <input
          type="url"
          className="input input-bordered w-full"
          value={formData.jobUrl}
          onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>
      
      <div>
        <label className="label">
          <span className="label-text">Notes</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Any additional notes about this application..."
        />
      </div>
      
      <div className="flex gap-2 justify-end">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="btn btn-ghost"
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary"
        >
          Add Application
        </motion.button>
      </div>
    </form>
  );
}

function ApplicationCard({ application, onStatusChange, onDelete, onEdit }) {
  const status = APPLICATION_STATUSES[application.status];
  const StatusIcon = status.icon;

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-full ${status.iconBgClass}`}>
            <StatusIcon className={`w-5 h-5 ${status.textClass}`} />
          </div>
          <div>
            <h4 className="font-bold text-base-content">{application.position}</h4>
            <p className="text-sm text-base-content/70">{application.company}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-base-content/60">
          {application.location && (
            <span>📍 {application.location}</span>
          )}
          {application.salary && (
            <span>💰 {application.salary}</span>
          )}
          <span>📅 {new Date(application.appliedDate.toDate()).toLocaleDateString()}</span>
        </div>
        
        {application.notes && (
          <p className="text-sm text-base-content/70 mt-2 italic">
            "{application.notes}"
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {/* Status Dropdown */}
        <div className="dropdown dropdown-end">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            tabIndex={0}
            className={`btn btn-sm btn-outline ${status.textClass} border-current`}
          >
            {status.label}
          </motion.div>
          <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[1]">
            {Object.entries(APPLICATION_STATUSES).map(([key, statusOption]) => (
              <li key={key}>
                <button
                  onClick={() => onStatusChange(application.id, key)}
                  className={`${statusOption.textClass}`}
                >
                  {statusOption.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-1">
          {application.jobUrl && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm btn-circle"
              title="View Job Posting"
            >
              <EyeIcon className="w-4 h-4" />
            </motion.a>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(application.id)}
            className="btn btn-ghost btn-sm btn-circle"
            title="Edit Application"
          >
            <PencilIcon className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(application.id)}
            className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error/10"
            title="Delete Application"
          >
            <TrashIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
