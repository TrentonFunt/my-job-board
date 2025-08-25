import { useState, useEffect, useCallback } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import JobCard from "../components/ui/JobCard";
import SearchAndFilterBar from "../components/ui/SearchAndFilter";
import Spinner from "../components/ui/Spinner";
import UserProfileSummary from "../components/ui/UserProfileSummary";
import RecentSearchesSidebarContainer from "../components/ui/RecentSearchesSidebarContainer";


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

	if (loading) return <Spinner className="mt-10" />;
	if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

	// Pagination calculations
	const totalJobs = filteredJobs.length;
	const totalPages = Math.ceil(totalJobs / jobsPerPage);
	const startIdx = (currentPage - 1) * jobsPerPage;
	const endIdx = startIdx + jobsPerPage;
	const jobsToShow = filteredJobs.slice(startIdx, endIdx);


	// Save search term to Firestore
	const handleSearchWithSave = async (val) => {
		setFilters((f) => ({ ...f, search: val }));
		const user = auth.currentUser;
		if (user && val.trim()) {
			try {
				const searchesRef = collection(db, "users", user.uid, "recentSearches");
				await addDoc(searchesRef, {
					term: val,
					timestamp: serverTimestamp(),
				});
			} catch {
				// Optionally handle error
			}
		}
	};

	return (
		<div className="w-full px-2 sm:px-4 py-4 sm:py-8">
			<UserProfileSummary />
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 w-full">
				{/* Main job search and recent searches side by side */}
				<div className="md:col-span-8 lg:col-span-9">
					<div className="card bg-base-100 shadow-xl border border-base-300 p-4 sm:p-8 mb-4 sm:mb-8">
						<h1 className="text-2xl sm:text-4xl font-bold text-accent mb-4 sm:mb-6">Find Your Next Job</h1>
						<SearchAndFilterBar
							onSearch={handleSearchWithSave}
							onFilter={handleFilter}
							tagOptions={tagOptions}
							companyOptions={companyOptions}
							locationOptions={locationOptions}
						/>
					</div>
				</div>
				<aside className="block w-full mb-4 md:mb-0 md:col-span-4 lg:col-span-3">
					<RecentSearchesSidebarContainer />
				</aside>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8">
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
					<p className="text-center mt-10 text-base-content/70">No jobs found.</p>
				)}
			</div>
			{/* Pagination controls */}
			{totalPages > 1 && (
				<div className="flex flex-wrap justify-center items-center gap-2 mt-4 sm:mt-8">
					<button
						className="btn btn-xs sm:btn-sm btn-outline btn-accent"
						onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
						disabled={currentPage === 1}
					>
						Prev
					</button>
					{Array.from({ length: totalPages }, (_, i) => (
						<button
							key={i + 1}
							className={`btn btn-xs sm:btn-sm ${currentPage === i + 1 ? "btn-accent" : "btn-outline btn-accent"}`}
							onClick={() => setCurrentPage(i + 1)}
						>
							{i + 1}
						</button>
					))}
					<button
						className="btn btn-xs sm:btn-sm btn-outline btn-accent"
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
