import { useState, useEffect, useCallback } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where, orderBy } from "firebase/firestore";
import { useAuth } from "../context/useAuth";
import useUserType from "../hooks/useUserType";

// Layout Components
import EmployerSidebar from "../components/employer/EmployerSidebar";
import EmployerHeader from "../components/employer/EmployerHeader";

// Tab Components
import EmployerOverview from "../components/employer/EmployerOverview";
import EmployerJobsList from "../components/employer/EmployerJobsList";
import EmployerApplicationsList from "../components/employer/EmployerApplicationsList";
import JobFormModal from "../components/employer/JobFormModal";

// Account Components (shared)
import ProfileSection from "../components/account/ProfileSection";
import NotificationsSection from "../components/account/NotificationsSection";
import SettingsSection from "../components/account/SettingsSection";
import ChangePasswordSection from "../components/account/ChangePasswordSection";
import EditProfileModal from "../components/account/EditProfileModal";
import SuccessAlert from "../components/ui/SuccessAlert";

/**
 * Employer Dashboard - Main page for employers to manage jobs and applications
 */
export default function EmployerDashboard() {
  const { user } = useAuth();
  const { userType, userData, loading } = useUserType();
  const navigate = useNavigate();
  
  // UI State
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Data State
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  
  // Job Form State
  const [showJobForm, setShowJobForm] = useState(false);
  const [showEditJobForm, setShowEditJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
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
  
  // Selection State (bulk actions)
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  
  // Filter State
  const [applicationFilter, setApplicationFilter] = useState("all");
  const [applicationSearch, setApplicationSearch] = useState("");
  
  // Edit Profile State
  const [editOpen, setEditOpen] = useState(false);
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

  // Redirect if not an employer
  useEffect(() => {
    if (!loading && userType !== "employer") {
      navigate("/account");
    }
  }, [userType, loading, navigate]);

  // Fetch jobs
  const fetchJobs = useCallback(async () => {
    if (!user?.uid) return;
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
  }, [user?.uid]);

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    if (!user?.uid) return;
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
  }, [user?.uid]);

  // Initial data fetch
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

  // =========================================================================
  // JOB HANDLERS
  // =========================================================================
  
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
      resetJobForm();
      setShowJobForm(false);
      showSuccessMessage();
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
      showSuccessMessage();
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

  const handleSelectJob = (jobId) => {
    if (jobId === null) {
      setSelectedJobs([]);
      return;
    }
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
        showSuccessMessage();
        fetchJobs();
      } catch (error) {
        console.error("Error deleting jobs:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // =========================================================================
  // APPLICATION HANDLERS
  // =========================================================================

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

  const handleSelectApplication = (applicationId) => {
    if (applicationId === null) {
      setSelectedApplications([]);
      return;
    }
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
      showSuccessMessage();
      fetchApplications();
    } catch (error) {
      console.error("Error updating applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================================
  // UTILITY FUNCTIONS
  // =========================================================================

  const resetJobForm = () => {
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
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const clearApplicationFilters = () => {
    setApplicationSearch("");
    setApplicationFilter("all");
  };

  // Filter applications
  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.candidateName?.toLowerCase().includes(applicationSearch.toLowerCase()) ||
                         application.jobTitle?.toLowerCase().includes(applicationSearch.toLowerCase());
    const matchesFilter = applicationFilter === "all" || application.status === applicationFilter;
    return matchesSearch && matchesFilter;
  });

  // =========================================================================
  // RENDER
  // =========================================================================

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

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex min-h-screen bg-base-100">
        {/* Sidebar */}
        <EmployerSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <Motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 flex flex-col lg:ml-0"
        >
          {/* Header */}
          <EmployerHeader
            activeTab={activeTab}
            userName={userData?.companyName || user?.displayName || ""}
            onPostJob={() => setShowJobForm(true)}
            setSidebarOpen={setSidebarOpen}
          />

          {/* Content Area */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <SuccessAlert message="Operation completed successfully!" show={showSuccess} />
            
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <EmployerOverview
                jobs={jobs}
                applications={applications}
                onPostJob={() => setShowJobForm(true)}
                setActiveTab={setActiveTab}
              />
            )}

            {/* Jobs Tab */}
            {activeTab === "jobs" && (
              <EmployerJobsList
                jobs={jobs}
                selectedJobs={selectedJobs}
                isLoading={isLoading}
                onSelectJob={handleSelectJob}
                onSelectAllJobs={handleSelectAllJobs}
                onEditJob={handleEditJob}
                onDeleteJob={handleDeleteJob}
                onBulkDeleteJobs={handleBulkDeleteJobs}
                onPostJob={() => setShowJobForm(true)}
              />
            )}

            {/* Applications Tab */}
            {activeTab === "applications" && (
              <EmployerApplicationsList
                applications={applications}
                filteredApplications={filteredApplications}
                selectedApplications={selectedApplications}
                applicationFilter={applicationFilter}
                applicationSearch={applicationSearch}
                isLoading={isLoading}
                onSearchChange={setApplicationSearch}
                onFilterChange={setApplicationFilter}
                onClearFilters={clearApplicationFilters}
                onSelectApplication={handleSelectApplication}
                onSelectAllApplications={handleSelectAllApplications}
                onUpdateStatus={handleUpdateApplicationStatus}
                onBulkUpdateStatus={handleBulkUpdateApplicationStatus}
              />
            )}

            {/* Profile Tab */}
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

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NotificationsSection />
              </Motion.div>
            )}

            {/* Settings Tab */}
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

            {/* Change Password Tab */}
            {activeTab === "password" && (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ChangePasswordSection />
              </Motion.div>
            )}
          </div>
        </Motion.div>
      </div>

      {/* Create Job Modal */}
      <JobFormModal
        isOpen={showJobForm}
        isEdit={false}
        jobData={newJob}
        isLoading={isLoading}
        onClose={() => setShowJobForm(false)}
        onSubmit={handleCreateJob}
        onChange={setNewJob}
      />

      {/* Edit Job Modal */}
      <JobFormModal
        isOpen={showEditJobForm}
        isEdit={true}
        jobData={newJob}
        isLoading={isLoading}
        onClose={() => {
          setShowEditJobForm(false);
          setEditingJob(null);
        }}
        onSubmit={handleUpdateJob}
        onChange={setNewJob}
      />

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
          const currentUser = auth.currentUser;
          if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid);
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
            showSuccessMessage();
          }
        }}
      />
    </Motion.div>
  );
}
