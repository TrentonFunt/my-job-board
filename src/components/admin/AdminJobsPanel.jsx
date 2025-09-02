import { useEffect, useState, Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, Transition } from '@headlessui/react';
import AdminJobsPagination from "./AdminJobsPagination";
import AdminJobsBulkActions from "./AdminJobsBulkActions";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import useAdminStatus from "../../hooks/useAdminStatus";
import useUserRole from "./useUserRole";

export default function AdminJobsPanel() {
  const { role, loading: roleLoading } = useUserRole();
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { isAdmin, loading } = useAdminStatus();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterFeatured, setFilterFeatured] = useState("");
  const [updating, setUpdating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company_name: "",
    description: "",
    location: "",
    tags: "",
    featured: false,
    slug: "",
    application_link: ""
  });
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});

  // Place hooks directly inside function body
  useEffect(() => {
    async function fetchJobs() {
      if (!isAdmin) return;
      const jobsCol = collection(db, "jobs");
      const jobsSnap = await getDocs(jobsCol);
      setJobs(jobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchJobs();
  }, [isAdmin, success]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterFeatured]);

  useEffect(() => {
    async function fetchJobs() {
      if (!isAdmin) return;
      const jobsCol = collection(db, "jobs");
      const jobsSnap = await getDocs(jobsCol);
      setJobs(jobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchJobs();
  }, [isAdmin, success]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterFeatured]);
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    setDeleting(true);
    setSuccess("");
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setSuccess("Job deleted successfully!");
    } catch {
      setSuccess("Error deleting job.");
    } finally {
      setDeleting(false);
    }
  };
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    company_name: "",
    description: "",
    location: "",
    tags: "",
    featured: false,
    slug: "",
    application_link: ""
  });
  const [editing, setEditing] = useState(false);
  const handleEditClick = (job) => {
    setEditId(job.id);
    setEditForm({
      title: job.title || "",
      company_name: job.company_name || "",
      description: job.description || "",
      location: job.location || "",
      tags: (job.tags || []).join(", "),
      featured: !!job.featured,
      slug: job.slug || "",
      application_link: job.application_link || ""
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    // Inline validation
    if (name === "title" && value.trim() === "") {
      setEditFormErrors(errors => ({ ...errors, title: "Title is required." }));
    } else if (name === "title") {
      setEditFormErrors(errors => ({ ...errors, title: undefined }));
    }
    if (name === "company_name" && value.trim() === "") {
      setEditFormErrors(errors => ({ ...errors, company_name: "Company name is required." }));
    } else if (name === "company_name") {
      setEditFormErrors(errors => ({ ...errors, company_name: undefined }));
    }
    if (name === "application_link" && value.trim() && !/^https?:\/\/.+/.test(value.trim())) {
      setEditFormErrors(errors => ({ ...errors, application_link: "Must be a valid URL." }));
    } else if (name === "application_link") {
      setEditFormErrors(errors => ({ ...errors, application_link: undefined }));
    }
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    setEditing(true);
    setSuccess("");
    try {
      const jobRef = doc(db, "jobs", editId);
      const jobData = {
        ...editForm,
        tags: editForm.tags.split(",").map(t => t.trim()).filter(Boolean),
        featured: !!editForm.featured,
      };
      await updateDoc(jobRef, jobData);
      setSuccess("Job updated successfully!");
      setEditId(null);
    } catch {
      setSuccess("Error updating job.");
    } finally {
      setEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  useEffect(() => {
    async function fetchJobs() {
      if (!isAdmin) return;
      const jobsCol = collection(db, "jobs");
      const jobsSnap = await getDocs(jobsCol);
      setJobs(jobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchJobs();
  }, [isAdmin, success]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    // Inline validation
    if (name === "title" && value.trim() === "") {
      setFormErrors(errors => ({ ...errors, title: "Title is required." }));
    } else if (name === "title") {
      setFormErrors(errors => ({ ...errors, title: undefined }));
    }
    if (name === "company_name" && value.trim() === "") {
      setFormErrors(errors => ({ ...errors, company_name: "Company name is required." }));
    } else if (name === "company_name") {
      setFormErrors(errors => ({ ...errors, company_name: undefined }));
    }
    if (name === "application_link" && value.trim() && !/^https?:\/\/.+/.test(value.trim())) {
      setFormErrors(errors => ({ ...errors, application_link: "Must be a valid URL." }));
    } else if (name === "application_link") {
      setFormErrors(errors => ({ ...errors, application_link: undefined }));
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setCreating(true);
    setSuccess("");
    try {
      const jobData = {
        ...form,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        featured: !!form.featured,
      };
      await addDoc(collection(db, "jobs"), jobData);
      setForm({ title: "", company_name: "", description: "", location: "", tags: "", featured: false, slug: "" });
      setSuccess("Job created successfully!");
    } catch  {
          setSuccess("Error creating job.");
    } finally {
      setCreating(false);
    }
  };

  const handleToggleFeatured = async (jobId, currentStatus) => {
    setUpdating(true);
    const jobRef = doc(db, "jobs", jobId);
    await updateDoc(jobRef, { featured: !currentStatus });
    setJobs(jobs => jobs.map(j => j.id === jobId ? { ...j, featured: !currentStatus } : j));
    setUpdating(false);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="alert alert-error shadow-lg mt-8">
        <span>Access denied. Admins only.</span>
      </div>
    );
  }

  // Filter jobs by search and featured status
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company_name.toLowerCase().includes(search.toLowerCase());
    const matchesFeatured =
      filterFeatured === "" ||
      (filterFeatured === "featured" && job.featured) ||
      (filterFeatured === "not_featured" && !job.featured);
    return matchesSearch && matchesFeatured;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Bulk action handlers
  const handleSelectJob = (jobId) => {
    setSelectedJobIds(ids => ids.includes(jobId) ? ids.filter(id => id !== jobId) : [...ids, jobId]);
  };
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedJobIds(paginatedJobs.map(job => job.id));
    } else {
      setSelectedJobIds([]);
    }
  };
  const handleDeleteSelected = async () => {
    setDeleting(true);
    setSuccess("");
    setError("");
    try {
      await Promise.all(selectedJobIds.map(id => deleteDoc(doc(db, "jobs", id))));
      setSuccess("Selected jobs deleted.");
      setSelectedJobIds([]);
    } catch {
      setError("Error deleting selected jobs.");
    } finally {
      setDeleting(false);
      setShowBulkDeleteModal(false);
    }
  };
  const handleFeatureSelected = async () => {
    setUpdating(true);
    try {
      await Promise.all(selectedJobIds.map(id => updateDoc(doc(db, "jobs", id), { featured: true })));
      setSuccess("Selected jobs marked as featured.");
      setSelectedJobIds([]);
    } catch {
      setSuccess("Error updating selected jobs.");
    } finally {
      setUpdating(false);
    }
  };
  const handleUnfeatureSelected = async () => {
    setUpdating(true);
    try {
      await Promise.all(selectedJobIds.map(id => updateDoc(doc(db, "jobs", id), { featured: false })));
      setSuccess("Selected jobs unmarked as featured.");
      setSelectedJobIds([]);
    } catch {
      setSuccess("Error updating selected jobs.");
    } finally {
      setUpdating(false);
    }
  };


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin: Manage Featured Jobs</h2>
      {/* DaisyUI alerts for status messages */}
      {success && (
        <div className="alert alert-success shadow-lg mb-4">
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="alert alert-error shadow-lg mb-4">
          <span>{error}</span>
        </div>
      )}
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          className="input input-bordered w-full md:w-1/2"
          placeholder="Search by job title or company"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-1/3"
          value={filterFeatured}
          onChange={e => setFilterFeatured(e.target.value)}
        >
          <option value="">All Jobs</option>
          <option value="featured">Featured Only</option>
          <option value="not_featured">Not Featured</option>
        </select>
      </div>
      {role === "admin" || role === "editor" ? (
        <form className="card bg-base-100 border border-base-300 shadow p-4 mb-8 flex flex-col gap-3" onSubmit={handleCreateJob}>
          <h3 className="text-lg font-semibold mb-2">Add New Job</h3>
          <input id="job-title" name="title" value={form.title} onChange={handleFormChange} className="input input-bordered" placeholder="Job Title" required autoComplete="off" />
          {formErrors.title && <span className="text-error text-xs">{formErrors.title}</span>}
          <input id="company-name" name="company_name" value={form.company_name} onChange={handleFormChange} className="input input-bordered" placeholder="Company Name" required autoComplete="organization" />
          {formErrors.company_name && <span className="text-error text-xs">{formErrors.company_name}</span>}
          <input id="job-location" name="location" value={form.location} onChange={handleFormChange} className="input input-bordered" placeholder="Location" autoComplete="address-level2" />
          <input id="job-slug" name="slug" value={form.slug} onChange={handleFormChange} className="input input-bordered" placeholder="Slug (unique)" autoComplete="off" />
          <input id="job-application-link" name="application_link" value={form.application_link} onChange={handleFormChange} className="input input-bordered" placeholder="Application Link (URL)" autoComplete="url" />
          {formErrors.application_link && <span className="text-error text-xs">{formErrors.application_link}</span>}
          <textarea id="job-description" name="description" value={form.description} onChange={handleFormChange} className="textarea textarea-bordered" placeholder="Description" rows={3} required />
          <input id="job-tags" name="tags" value={form.tags} onChange={handleFormChange} className="input input-bordered" placeholder="Tags (comma separated)" autoComplete="off" />
          <label className="flex items-center gap-2" htmlFor="job-featured">
            <input id="job-featured" type="checkbox" name="featured" checked={form.featured} onChange={handleFormChange} className="checkbox" />
            <span>Featured</span>
          </label>
          <button className="btn btn-primary rounded mt-2" type="submit" disabled={creating}>
              {creating ? <span className="loading loading-spinner loading-xs"></span> : "Add Job"}
            </button>
        </form>
      ) : null}
      {filteredJobs.length === 0 ? (
        <div className="alert alert-info shadow-lg mt-4">No jobs found.</div>
      ) : (
        <>
          {role === "admin" && (
            <>
              <h3 className="text-lg font-semibold mb-2">Bulk Actions</h3>
              <AdminJobsBulkActions
                selectedJobIds={selectedJobIds}
                onDeleteSelected={() => setShowBulkDeleteModal(true)}
                onFeatureSelected={handleFeatureSelected}
                onUnfeatureSelected={handleUnfeatureSelected}
                deleting={deleting}
                updating={updating}
              />
            </>
          )}
          <AdminJobsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <table className="table w-full mb-6">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={paginatedJobs.length > 0 && paginatedJobs.every(job => selectedJobIds.includes(job.id))}
                    onChange={e => handleSelectAll(e.target.checked)}
                    disabled={role !== "admin"}
                  />
                </th>
                <th>Title</th>
                <th>Company</th>
                <th>Featured</th>
                <th>Application</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.map(job => (
                <tr key={job.id}>
                  {editId === job.id ? (
                    <td colSpan={6}>
                      <form className="flex flex-col gap-2" onSubmit={handleUpdateJob}>
                        <input id="edit-title" name="title" value={editForm.title} onChange={handleEditFormChange} className="input input-bordered" placeholder="Job Title" required />
                        {editFormErrors.title && <span className="text-error text-xs">{editFormErrors.title}</span>}
                        <input id="edit-company-name" name="company_name" value={editForm.company_name} onChange={handleEditFormChange} className="input input-bordered" placeholder="Company Name" required />
                        {editFormErrors.company_name && <span className="text-error text-xs">{editFormErrors.company_name}</span>}
                        <input id="edit-location" name="location" value={editForm.location} onChange={handleEditFormChange} className="input input-bordered" placeholder="Location" />
                        <input id="edit-slug" name="slug" value={editForm.slug} onChange={handleEditFormChange} className="input input-bordered" placeholder="Slug (unique)" />
                        <input id="edit-application-link" name="application_link" value={editForm.application_link} onChange={handleEditFormChange} className="input input-bordered" placeholder="Application Link (URL)" />
                        {editFormErrors.application_link && <span className="text-error text-xs">{editFormErrors.application_link}</span>}
                        <textarea id="edit-description" name="description" value={editForm.description} onChange={handleEditFormChange} className="textarea textarea-bordered" placeholder="Description" rows={2} required />
                        <input id="edit-tags" name="tags" value={editForm.tags} onChange={handleEditFormChange} className="input input-bordered" placeholder="Tags (comma separated)" />
                        <label className="flex items-center gap-2" htmlFor="edit-featured">
                          <input id="edit-featured" type="checkbox" name="featured" checked={editForm.featured} onChange={handleEditFormChange} className="checkbox" />
                          <span>Featured</span>
                        </label>
                        <div className="flex gap-2 mt-2">
                          <button className="btn btn-primary btn-sm rounded" type="submit" disabled={editing || role === "viewer"}>
                            {editing ? <span className="loading loading-spinner loading-xs"></span> : "Save"}
                          </button>
                          <button className="btn btn-ghost btn-sm rounded" type="button" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                      </form>
                    </td>
                  ) : (
                    <>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedJobIds.includes(job.id)}
                          onChange={() => handleSelectJob(job.id)}
                          disabled={role !== "admin"}
                        />
                      </td>
                      <td>{job.title}</td>
                      <td>{job.company_name}</td>
                      <td>{job.featured ? "Yes" : "No"}</td>
                      <td>
                        {job.application_link ? (
                          <a href={job.application_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Apply Now</a>
                        ) : (
                          <span className="text-xs text-gray-400">No link</span>
                        )}
                      </td>
                      <td className="flex gap-2">
                        <button
                          className={`btn btn-sm rounded ${job.featured ? "btn-error" : "btn-primary"}`}
                          onClick={() => handleToggleFeatured(job.id, job.featured)}
                          disabled={role !== "admin" || updating}
                        >
                          {updating ? <span className="loading loading-spinner loading-xs"></span> : job.featured ? "Unmark" : "Mark as Featured"}
                        </button>
                        <button
                          className="btn btn-primary btn-sm rounded"
                          type="button"
                          onClick={() => handleEditClick(job)}
                          disabled={role === "viewer" || updating}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-error btn-sm rounded"
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          disabled={role !== "admin" || deleting}
                        >
                          {deleting ? <span className="loading loading-spinner loading-xs"></span> : "Delete"}
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {/* Headless UI Dialog for bulk delete confirmation */}
      <Transition show={showBulkDeleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowBulkDeleteModal(false)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="card bg-base-100 shadow-xl max-w-md w-full p-6">
                <DialogTitle className="text-lg font-bold mb-2">Confirm Bulk Delete</DialogTitle>
                <p className="mb-4">Are you sure you want to delete <span className="font-semibold">{selectedJobIds.length}</span> selected jobs? This action cannot be undone.</p>
                <div className="flex gap-2 justify-end">
                  <button className="btn btn-ghost rounded" onClick={() => setShowBulkDeleteModal(false)} disabled={deleting}>Cancel</button>
                  <button className="btn btn-error rounded" onClick={handleDeleteSelected} disabled={deleting}>
                    {deleting ? <span className="loading loading-spinner loading-xs"></span> : "Delete"}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
