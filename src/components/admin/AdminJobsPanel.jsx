import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import useAdminStatus from "../../hooks/useAdminStatus";

export default function AdminJobsPanel() {
  const { isAdmin, loading } = useAdminStatus();
  const [jobs, setJobs] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company_name: "",
    description: "",
    location: "",
    tags: "",
    featured: false,
    slug: ""
  });
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      const jobsCol = collection(db, "jobs");
      const jobsSnap = await getDocs(jobsCol);
      setJobs(jobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    if (isAdmin) fetchJobs();
  }, [isAdmin, success]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
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

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return <p>Access denied. Admins only.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin: Manage Featured Jobs</h2>
      <form className="card bg-base-100 border border-base-300 shadow p-4 mb-8 flex flex-col gap-3" onSubmit={handleCreateJob}>
        <h3 className="text-lg font-semibold mb-2">Add New Job</h3>
        <input name="title" value={form.title} onChange={handleFormChange} className="input input-bordered" placeholder="Job Title" required />
        <input name="company_name" value={form.company_name} onChange={handleFormChange} className="input input-bordered" placeholder="Company Name" required />
        <input name="location" value={form.location} onChange={handleFormChange} className="input input-bordered" placeholder="Location" />
        <input name="slug" value={form.slug} onChange={handleFormChange} className="input input-bordered" placeholder="Slug (unique)" />
        <textarea name="description" value={form.description} onChange={handleFormChange} className="textarea textarea-bordered" placeholder="Description" rows={3} required />
        <input name="tags" value={form.tags} onChange={handleFormChange} className="input input-bordered" placeholder="Tags (comma separated)" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleFormChange} className="checkbox" />
          <span>Featured</span>
        </label>
        <button className="btn btn-primary mt-2" type="submit" disabled={creating}>Add Job</button>
        {success && <p className="text-success text-sm mt-2">{success}</p>}
      </form>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <table className="table w-full mb-6">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Featured</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company_name}</td>
                <td>{job.featured ? "Yes" : "No"}</td>
                <td>
                  <button
                    className={`btn btn-sm ${job.featured ? "btn-error" : "btn-success"}`}
                    onClick={() => handleToggleFeatured(job.id, job.featured)}
                    disabled={updating}
                  >
                    {job.featured ? "Unmark" : "Mark as Featured"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
