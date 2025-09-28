import { useState, useEffect, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  PlusIcon,
  BriefcaseIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  UserIcon,
  BuildingOfficeIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import useUserType from "../hooks/useUserType";
import { useNavigate } from "react-router";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where, orderBy } from "firebase/firestore";
import { useAuth } from "../context/useAuth";
import ProfileSection from "../components/account/ProfileSection";
import NotificationsSection from "../components/account/NotificationsSection";
import SettingsSection from "../components/account/SettingsSection";
import ChangePasswordSection from "../components/account/ChangePasswordSection";
import EditProfileModal from "../components/account/EditProfileModal";
import SuccessAlert from "../components/ui/SuccessAlert";
import Spinner from "../components/ui/Spinner";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const { userType, userData, loading } = useUserType();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showEditJobForm, setShowEditJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [applicationFilter, setApplicationFilter] = useState("all");
  const [applicationSearch, setApplicationSearch] = useState("");
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  // Removed unused bulk actions state
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    companyName: "",
    twitter: "",
    linkedin: "",
    showTwitter: true,
    showLinkedin: true,
  });
  const [formErrors, setFormErrors] = useState({});
  const [newJob, setNewJob] = useState({
    title: "",
    company: userData?.companyName || "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
    applicationUrl: ""
  });

  // Redirect if not an employer
  useEffect(() => {
    if (!loading && userType !== "employer") {
      navigate("/account");
    }
  }, [userType, loading, navigate]);

  const fetchJobs = useCallback(async () => {
    try {
      const q = query(
        collection(db, "employerJobs"),
        where("employerId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const jobsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [user.uid]);

  const fetchApplications = useCallback(async () => {
    try {
      const q = query(
        collection(db, "applications"),
        where("employerId", "==", user.uid),
        orderBy("appliedAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const applicationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(applicationsData);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  }, [user.uid]);

  // Fetch jobs posted by this employer
  useEffect(() => {
    if (user && userType === "employer") {
      fetchJobs();
      fetchApplications();
    }
  }, [user, userType, fetchJobs, fetchApplications]);

  // Populate edit form when userData changes
  useEffect(() => {
    if (userData) {
      setEditForm({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        bio: userData.bio || "",
        companyName: userData.companyName || "",
        twitter: userData.twitter || "",
        linkedin: userData.linkedin || "",
        showTwitter: true,
        showLinkedin: true,
      });
    }
  }, [userData]);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addDoc(collection(db, "employerJobs"), {
        ...newJob,
        employerId: user.uid,
        employerName: userData?.companyName || user.displayName,
        createdAt: new Date().toISOString(),
        status: "active",
        applicationsCount: 0,
        source: "employer",
        slug: newJob.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      });
      setNewJob({
        title: "",
        company: userData?.companyName || "",
        location: "",
        type: "Full-time",
        salary: "",
        description: "",
        requirements: "",
        benefits: "",
        applicationUrl: ""
      });
      setShowJobForm(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      fetchJobs();
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      company: job.company || userData?.companyName || "",
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits,
      applicationUrl: job.applicationUrl
    });
    setShowEditJobForm(true);
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    if (!editingJob) return;
    
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "employerJobs", editingJob.id), {
        ...newJob,
        updatedAt: new Date().toISOString()
      });
      setShowEditJobForm(false);
      setEditingJob(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteDoc(doc(db, "employerJobs", jobId));
        fetchJobs();
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const handleUpdateApplicationStatus = async (applicationId, status) => {
    try {
      await updateDoc(doc(db, "applications", applicationId), {
        status,
        updatedAt: new Date().toISOString()
      });
      fetchApplications();
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  // Bulk operations for jobs
  const handleSelectJob = (jobId) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAllJobs = () => {
    setSelectedJobs(prev => 
      prev.length === jobs.length ? [] : jobs.map(job => job.id)
    );
  };

  const handleBulkDeleteJobs = async () => {
    if (selectedJobs.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedJobs.length} job(s)?`)) {
      setIsLoading(true);
      try {
        await Promise.all(
          selectedJobs.map(jobId => deleteDoc(doc(db, "employerJobs", jobId)))
        );
        setSelectedJobs([]);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        fetchJobs();
      } catch (error) {
        console.error("Error deleting jobs:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Bulk operations for applications
  const handleSelectApplication = (applicationId) => {
    setSelectedApplications(prev => 
      prev.includes(applicationId) 
        ? prev.filter(id => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  const handleSelectAllApplications = () => {
    setSelectedApplications(prev => 
      prev.length === filteredApplications.length ? [] : filteredApplications.map(app => app.id)
    );
  };

  const handleBulkUpdateApplicationStatus = async (status) => {
    if (selectedApplications.length === 0) return;
    
    setIsLoading(true);
    try {
      await Promise.all(
        selectedApplications.map(applicationId => 
          updateDoc(doc(db, "applications", applicationId), {
            status,
            updatedAt: new Date().toISOString()
          })
        )
      );
      setSelectedApplications([]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      fetchApplications();
    } catch (error) {
      console.error("Error updating applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-base-content">Loading...</div>
      </div>
    );
  }

  if (userType !== "employer") {
    return null;
  }

  // Filter applications based on search and status
  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.candidateName?.toLowerCase().includes(applicationSearch.toLowerCase()) ||
                         application.jobTitle?.toLowerCase().includes(applicationSearch.toLowerCase());
    const matchesFilter = applicationFilter === "all" || application.status === applicationFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    {
      title: "Total Jobs",
      value: jobs.length,
      icon: BriefcaseIcon,
      color: "text-blue-500",
      change: "+2 this week"
    },
    {
      title: "Total Applications",
      value: applications.length,
      icon: UserGroupIcon,
      color: "text-green-500",
      change: "+12 this week"
    },
    {
      title: "Pending Reviews",
      value: applications.filter(app => app.status === "pending").length,
      icon: ClockIcon,
      color: "text-yellow-500",
      change: "Needs attention"
    },
    {
      title: "Active Jobs",
      value: jobs.filter(job => job.status === "active").length,
      icon: CheckCircleIcon,
      color: "text-emerald-500",
      change: "All systems go"
    }
  ];

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex min-h-screen bg-base-100">
        {/* Sidebar */}
        <Motion.div 
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-base-200 border-r border-base-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-base-300">
            <h2 className="text-xl font-bold text-base-content">Employer Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-base-content/60 hover:text-base-content"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {[
                { id: "overview", label: "Overview", icon: ChartBarIcon },
                { id: "jobs", label: "My Jobs", icon: BriefcaseIcon },
                { id: "applications", label: "Applications", icon: UserGroupIcon },
                { id: "profile", label: "Profile", icon: UserIcon },
                { id: "notifications", label: "Notifications", icon: BellIcon },
                { id: "settings", label: "Settings", icon: Cog6ToothIcon },
                { id: "password", label: "Change Password", icon: BuildingOfficeIcon }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-primary text-primary-content"
                      : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </Motion.div>

        {/* Main Content */}
        <Motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 flex flex-col lg:ml-0"
        >
          {/* Header */}
          <div className="bg-base-200 border-b border-base-300 sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden text-base-content/60 hover:text-base-content p-2 -m-2 touch-manipulation"
                  >
                    <Bars3Icon className="w-6 h-6" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-lg sm:text-2xl font-bold text-base-content truncate">
                      {activeTab === "overview" && "Dashboard Overview"}
                      {activeTab === "jobs" && "My Jobs"}
                      {activeTab === "applications" && "Applications"}
                      {activeTab === "profile" && "Company Profile"}
                      {activeTab === "notifications" && "Notifications"}
                      {activeTab === "settings" && "Settings"}
                      {activeTab === "password" && "Change Password"}
                    </h1>
                    <p className="text-base-content/70 text-xs sm:text-sm truncate">
                      {activeTab === "overview" && `Welcome back, ${userData?.companyName || user.displayName}`}
                      {activeTab === "jobs" && "Manage your job postings"}
                      {activeTab === "applications" && "Review candidate applications"}
                      {activeTab === "profile" && "Manage your company profile"}
                      {activeTab === "notifications" && "Configure your notification preferences"}
                      {activeTab === "settings" && "Account and privacy settings"}
                      {activeTab === "password" && "Update your password"}
                    </p>
                  </div>
                </div>
                {activeTab === "jobs" && (
                  <Motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setShowJobForm(true)}
                      className="btn btn-primary btn-sm sm:btn-md flex items-center gap-2 touch-manipulation"
                    >
                      <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Post New Job</span>
                      <span className="sm:hidden">Post</span>
                    </Button>
                  </Motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <SuccessAlert message="Operation completed successfully!" show={showSuccess} />
            
            {/* Profile Section */}
            {activeTab === "profile" && (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProfileSection
                  avatarPreview={userData?.avatarUrl || null}
                  avatarInputRef={null}
                  onAvatarChange={() => {}}
                  userData={userData}
                  status="active"
                  handleEdit={() => setEditOpen(true)}
                  handleSignOut={() => {}}
                />
              </Motion.div>
            )}

            {/* Notifications Section */}
            {activeTab === "notifications" && (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NotificationsSection />
              </Motion.div>
            )}

            {/* Settings Section */}
            {activeTab === "settings" && (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SettingsSection 
                  userData={userData}
                  onUpdateUserData={() => {}}
                />
              </Motion.div>
            )}

            {/* Change Password Section */}
            {activeTab === "password" && (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ChangePasswordSection />
              </Motion.div>
            )}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <Motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-base-200 rounded-xl p-4 sm:p-6 border border-base-300 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-base-content/60 text-sm">{stat.title}</p>
                      <p className="text-2xl sm:text-3xl font-bold text-base-content mt-1 sm:mt-2">{stat.value}</p>
                      <p className="text-xs text-base-content/50 mt-1">{stat.change}</p>
                    </div>
                    <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                  </div>
                </Motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-base-200 rounded-xl p-4 sm:p-6 border border-base-300 mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <button
                  onClick={() => setShowJobForm(true)}
                  className="btn btn-primary flex items-center justify-center gap-2 touch-manipulation"
                >
                  <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Post New Job</span>
                </button>
                <button
                  onClick={() => setActiveTab("applications")}
                  className="btn btn-secondary flex items-center justify-center gap-2 touch-manipulation"
                >
                  <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Review Applications</span>
                </button>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="btn btn-accent flex items-center justify-center gap-2 touch-manipulation sm:col-span-2 lg:col-span-1"
                >
                  <BriefcaseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Manage Jobs</span>
                </button>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-base-200 rounded-xl p-6 border border-base-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-base-content">Recent Applications</h3>
                <button
                  onClick={() => setActiveTab("applications")}
                  className="text-primary hover:text-primary-focus text-sm transition-colors duration-200"
                >
                  View all
                </button>
              </div>
              {applications.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between py-3 border-b border-base-300 last:border-b-0">
                  <div>
                    <p className="text-base-content font-medium">{application.jobTitle}</p>
                    <p className="text-base-content/60 text-sm">{application.candidateName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    application.status === "pending" ? "bg-warning/20 text-warning" :
                    application.status === "accepted" ? "bg-success/20 text-success" :
                    "bg-error/20 text-error"
                  }`}>
                    {application.status}
                  </span>
                </div>
              ))}
              {applications.length === 0 && (
                <p className="text-base-content/60 text-center py-8">No applications yet</p>
              )}
            </div>
          </Motion.div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Bulk Actions for Jobs */}
            {jobs.length > 0 && (
              <div className="bg-base-200 rounded-xl p-4 border border-base-300 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedJobs.length === jobs.length && jobs.length > 0}
                      onChange={handleSelectAllJobs}
                      className="checkbox checkbox-primary"
                    />
                    <span className="text-sm text-base-content/70">
                      {selectedJobs.length > 0 
                        ? `${selectedJobs.length} job(s) selected`
                        : 'Select all jobs'
                      }
                    </span>
                  </div>
                  
                  {selectedJobs.length > 0 && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleBulkDeleteJobs}
                        className="btn btn-error btn-sm"
                        disabled={isLoading}
                      >
                        {isLoading ? "Deleting..." : `Delete ${selectedJobs.length} job(s)`}
                      </button>
                      <button
                        onClick={() => setSelectedJobs([])}
                        className="btn btn-ghost btn-sm"
                      >
                        Clear selection
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid gap-6">
              {jobs.map((job, index) => (
                <Motion.div 
                  key={job.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-base-200 rounded-xl p-4 sm:p-6 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(job.id)}
                        onChange={() => handleSelectJob(job.id)}
                        className="checkbox checkbox-primary mt-1 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-2 truncate">{job.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-base-content/60 text-sm mb-4">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                            <span className="truncate">{job.location}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></span>
                            <span className="truncate">{job.type}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></span>
                            <span className="truncate">{job.salary}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-info rounded-full flex-shrink-0"></span>
                            <span className="truncate">{job.applicationsCount} applications</span>
                          </span>
                        </div>
                        <p className="text-base-content/70 text-sm line-clamp-2">{job.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 sm:ml-4 sm:flex-col lg:flex-row">
                      <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() => {/* View job details */}}
                          className="btn btn-ghost btn-sm flex-1 sm:flex-none touch-manipulation"
                          title="View Details"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span className="sm:hidden ml-2">View</span>
                        </Button>
                      </Motion.div>
                      <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() => handleEditJob(job)}
                          className="btn btn-primary btn-sm flex-1 sm:flex-none touch-manipulation"
                          title="Edit Job"
                        >
                          <PencilIcon className="w-4 h-4" />
                          <span className="sm:hidden ml-2">Edit</span>
                        </Button>
                      </Motion.div>
                      <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() => handleDeleteJob(job.id)}
                          className="btn btn-error btn-sm flex-1 sm:flex-none touch-manipulation"
                          title="Delete Job"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span className="sm:hidden ml-2">Delete</span>
                        </Button>
                      </Motion.div>
                    </div>
                  </div>
                </Motion.div>
              ))}
              {jobs.length === 0 && (
                <div className="text-center py-12">
                  <BriefcaseIcon className="w-16 h-16 text-base-content/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-base-content mb-2">No jobs posted yet</h3>
                  <p className="text-base-content/60 mb-6">Start by posting your first job to attract candidates</p>
                  <Button
                    onClick={() => setShowJobForm(true)}
                    className="btn btn-primary px-6 py-3"
                  >
                    Post Your First Job
                  </Button>
                </div>
              )}
            </div>
          </Motion.div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
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
                    onChange={(e) => setApplicationSearch(e.target.value)}
                  />
                </div>
                <div className="sm:w-48">
                  <select
                    className="w-full bg-base-100 border border-base-300 rounded-lg px-4 py-3 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    value={applicationFilter}
                    onChange={(e) => setApplicationFilter(e.target.value)}
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
                    onClick={() => {
                      setApplicationSearch("");
                      setApplicationFilter("all");
                    }}
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
                      onChange={handleSelectAllApplications}
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
                        onClick={() => handleBulkUpdateApplicationStatus("accepted")}
                        className="btn btn-success btn-sm"
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : `Accept ${selectedApplications.length}`}
                      </button>
                      <button
                        onClick={() => handleBulkUpdateApplicationStatus("rejected")}
                        className="btn btn-error btn-sm"
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : `Reject ${selectedApplications.length}`}
                      </button>
                      <button
                        onClick={() => setSelectedApplications([])}
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
                        onChange={() => handleSelectApplication(application.id)}
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
                            onClick={() => handleUpdateApplicationStatus(application.id, "accepted")}
                            className="btn btn-success btn-sm flex-1 sm:flex-none touch-manipulation"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleUpdateApplicationStatus(application.id, "rejected")}
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
                    onClick={() => {
                      setApplicationSearch("");
                      setApplicationFilter("all");
                    }}
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
        )}
      </div>

      {/* Job Posting Modal */}
      <AnimatePresence>
        {showJobForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-base-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-base-content">Post New Job</h2>
              <button
                onClick={() => setShowJobForm(false)}
                className="text-base-content/60 hover:text-base-content transition-colors duration-200"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="job-title"
                  name="title"
                  placeholder="Job Title"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  required
                  autoComplete="off"
                />
                <input
                  type="text"
                  id="job-company"
                  name="company"
                  placeholder="Company Name"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  required
                  autoComplete="organization"
                />
                <input
                  type="text"
                  id="job-location"
                  name="location"
                  placeholder="Location"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  required
                  autoComplete="off"
                />
                <select
                  id="job-type"
                  name="type"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={newJob.type}
                  onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
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
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  autoComplete="off"
                />
              </div>

              <textarea
                id="job-description"
                name="description"
                placeholder="Job Description"
                rows={4}
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                required
              />

              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows={3}
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={newJob.requirements}
                onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
              />

              <textarea
                id="job-benefits"
                name="benefits"
                placeholder="Benefits"
                rows={3}
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={newJob.benefits}
                onChange={(e) => setNewJob({ ...newJob, benefits: e.target.value })}
              />

              <input
                type="url"
                id="job-application-url"
                name="applicationUrl"
                placeholder="Application URL (optional)"
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={newJob.applicationUrl}
                onChange={(e) => setNewJob({ ...newJob, applicationUrl: e.target.value })}
                autoComplete="url"
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? "Posting..." : "Post Job"}
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowJobForm(false)}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Motion.div>
        </div>
        )}
      </AnimatePresence>

      {/* Edit Job Modal */}
      <AnimatePresence>
        {showEditJobForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-base-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-base-content">Edit Job</h2>
              <button
                onClick={() => {
                  setShowEditJobForm(false);
                  setEditingJob(null);
                }}
                className="text-base-content/60 hover:text-base-content transition-colors duration-200"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdateJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="edit-job-title"
                  name="title"
                  placeholder="Job Title"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  required
                  autoComplete="off"
                />
                <input
                  type="text"
                  id="edit-job-company"
                  name="company"
                  placeholder="Company Name"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  required
                  autoComplete="organization"
                />
                <input
                  type="text"
                  id="edit-job-location"
                  name="location"
                  placeholder="Location"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  required
                  autoComplete="off"
                />
                <select
                  id="edit-job-type"
                  name="type"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={newJob.type}
                  onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
                <input
                  type="text"
                  id="edit-job-salary"
                  name="salary"
                  placeholder="Salary Range"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  autoComplete="off"
                />
              </div>

              <textarea
                id="edit-job-description"
                name="description"
                placeholder="Job Description"
                rows={4}
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                required
              />

              <textarea
                id="edit-job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows={3}
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={newJob.requirements}
                onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
              />

              <textarea
                id="edit-job-benefits"
                name="benefits"
                placeholder="Benefits"
                rows={3}
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={newJob.benefits}
                onChange={(e) => setNewJob({ ...newJob, benefits: e.target.value })}
              />

              <input
                type="url"
                id="edit-job-application-url"
                name="applicationUrl"
                placeholder="Application URL (optional)"
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={newJob.applicationUrl}
                onChange={(e) => setNewJob({ ...newJob, applicationUrl: e.target.value })}
                autoComplete="url"
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Job"}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowEditJobForm(false);
                    setEditingJob(null);
                  }}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Motion.div>
        </div>
        )}
      </AnimatePresence>
        </Motion.div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        editOpen={editOpen}
        editForm={editForm}
        setEditForm={setEditForm}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        setEditOpen={setEditOpen}
        auth={auth}
        db={db}
        updateUserData={async (form) => {
          const user = auth.currentUser;
          if (user) {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              phone: form.phone,
              address: form.address,
              bio: form.bio,
              companyName: form.companyName,
              twitter: form.showTwitter ? form.twitter : "",
              linkedin: form.showLinkedin ? form.linkedin : "",
            });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
          }
        }}
      />
    </Motion.div>
  );
}
