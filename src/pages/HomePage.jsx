import { useState, useEffect, useCallback } from "react";
import JobCard from "../components/ui/JobCard";
import SearchAndFilterBar from "../components/ui/SearchAndFilter";


export default function HomePage() {
	const [jobs, setJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [filters, setFilters] = useState({
		search: "",
		location: "",
		jobType: "",
		tag: "",
		company: "",
		remote: "",
		salary: "",
	});

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const jobsPerPage = 10;

	useEffect(() => {
		async function fetchJobs() {
			try {
				const res = await fetch(
					"https://corsproxy.io/?https://arbeitnow.com/api/job-board-api"
				);
				if (!res.ok) throw new Error("Failed to fetch jobs");
				const data = await res.json();
				setJobs(data.data);
				setFilteredJobs(data.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchJobs();
	}, []);

	// Extract dynamic filter options from jobs
	const tagOptions = Array.from(new Set(jobs.flatMap(j => j.tags || []))).filter(Boolean);
	const companyOptions = Array.from(new Set(jobs.map(j => j.company_name))).filter(Boolean);
	const locationOptions = Array.from(new Set(jobs.map(j => j.location))).filter(Boolean);

	// Apply search + filter logic
	useEffect(() => {
		let filtered = jobs;

		if (filters.search) {
			filtered = filtered.filter((job) =>
				job.title.toLowerCase().includes(filters.search.toLowerCase())
			);
		}
		if (filters.location) {
			filtered = filtered.filter((job) =>
				job.location && job.location.toLowerCase().includes(filters.location.toLowerCase())
			);
		}
		if (filters.jobType) {
			filtered = filtered.filter((job) =>
				job.tags?.some((tag) =>
					tag.toLowerCase().includes(filters.jobType.toLowerCase())
				)
			);
		}
		if (filters.tag) {
			filtered = filtered.filter((job) =>
				job.tags?.includes(filters.tag)
			);
		}
		if (filters.company) {
			filtered = filtered.filter((job) =>
				job.company_name === filters.company
			);
		}
		if (filters.remote) {
			filtered = filtered.filter((job) =>
				job.location && job.location.toLowerCase().includes(filters.remote.toLowerCase())
			);
		}
		if (filters.salary) {
			filtered = filtered.filter((job) => {
				// If salary info is available in job, filter by min salary
				if (job.salary && typeof job.salary === "number") {
					return job.salary >= Number(filters.salary);
				}
				return true;
			});
		}

		setFilteredJobs(filtered);
		setCurrentPage(1); // Reset to first page on filter change
	}, [filters, jobs]);

	const handleFilter = useCallback((f) => setFilters((prev) => ({ ...prev, ...f })), []);

	if (loading) return <p className="text-center mt-10">Loading jobs...</p>;
	if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

	// Pagination calculations
	const totalJobs = filteredJobs.length;
	const totalPages = Math.ceil(totalJobs / jobsPerPage);
	const startIdx = (currentPage - 1) * jobsPerPage;
	const endIdx = startIdx + jobsPerPage;
	const jobsToShow = filteredJobs.slice(startIdx, endIdx);

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<SearchAndFilterBar
				onSearch={(val) => setFilters((f) => ({ ...f, search: val }))}
				onFilter={handleFilter}
				tagOptions={tagOptions}
				companyOptions={companyOptions}
				locationOptions={locationOptions}
			/>

			<div className="grid gap-4">
				{jobsToShow.length > 0 ? (
					jobsToShow.map((job) => (
						<JobCard
							key={job.slug}
							slug={job.slug}
							title={job.title}
							company={job.company_name}
							description={job.description}
						/>
					))
				) : (
					<p className="text-center mt-10 text-gray-500">No jobs found.</p>
				)}
			</div>

			{/* Pagination controls */}
			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-2 mt-8">
					<button
						className="btn btn-sm btn-outline"
						onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
						disabled={currentPage === 1}
					>
						Prev
					</button>
					{Array.from({ length: totalPages }, (_, i) => (
						<button
							key={i + 1}
							className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
							onClick={() => setCurrentPage(i + 1)}
						>
							{i + 1}
						</button>
					))}
					<button
						className="btn btn-sm btn-outline"
						onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
}
