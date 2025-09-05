import { useState, useEffect, useCallback } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from "firebase/firestore";
import JobCard from "../components/ui/JobCard";
import Button from "../components/ui/Button";
import SearchAndFilterBar from "../components/ui/SearchAndFilter";
import Spinner from "../components/ui/Spinner";
import UserProfileSummary from "../components/ui/UserProfileSummary";

import BlogHighlights from "../components/ui/BlogHighlights";
import RecentSearchesSidebarContainer from "../components/ui/RecentSearchesSidebarContainer";
import FeaturedJobs from "../components/ui/FeaturedJobs";
import CompanySpotlight from "../components/ui/CompanySpotlight";
import TrendingTags from "../components/ui/TrendingTags";
import Testimonials from "../components/ui/Testimonials";



export default function HomePage() {
	const [jobs, setJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [recommended, setRecommended] = useState([]);

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
				// Fetch jobs from API
				const res = await fetch(
					"https://corsproxy.io/?https://arbeitnow.com/api/job-board-api"
				);
				if (!res.ok) throw new Error("Failed to fetch jobs");
				const apiData = await res.json();
				// Fetch jobs from Firestore
				const jobsCol = collection(db, "jobs");
				const jobsSnap = await getDocs(jobsCol);
				const firestoreJobs = jobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
				// Merge both sources
				const mergedJobs = [...apiData.data, ...firestoreJobs];
				setJobs(mergedJobs);
				setFilteredJobs(mergedJobs);
				// Personalized recommendations
				const user = auth.currentUser;
				if (user) {
					// Fetch recent searches
					const searchesRef = collection(db, "users", user.uid, "recentSearches");
					const searchesQ = query(searchesRef, orderBy("timestamp", "desc"), limit(5));
					const searchesSnap = await getDocs(searchesQ);
					const recentTerms = searchesSnap.docs.map(doc => doc.data().term.toLowerCase());
					// Fetch saved jobs
					const savedCol = collection(db, "users", user.uid, "savedJobs");
					const savedSnap = await getDocs(savedCol);
					const savedSlugs = savedSnap.docs.map(doc => doc.id);
					// Recommend jobs that match recent search terms or are saved
					let recs = mergedJobs.filter(job => {
						const title = job.title?.toLowerCase() || "";
						const tags = (job.tags || []).map(t => t.toLowerCase());
						const matchesSearch = recentTerms.some(term => title.includes(term) || tags.includes(term));
						const isSaved = savedSlugs.includes(job.slug);
						return matchesSearch || isSaved;
					});
					// Remove duplicates and limit to 6
					recs = recs.filter((job, idx, arr) => arr.findIndex(j => j.slug === job.slug) === idx).slice(0, 6);
					setRecommended(recs);
				} else {
					setRecommended([]);
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchJobs();
	}, []);



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

		// Handler for trending tag click
		const handleTrendingTagClick = (tag) => {
			setFilters((prev) => ({ ...prev, tag }));
		};

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

	// Dynamic filter options
	const tagOptions = Array.from(new Set(jobs.flatMap(j => j.tags || []))).filter(Boolean);
	const companyOptions = Array.from(new Set(jobs.map(j => j.company_name))).filter(Boolean);
	const locationOptions = Array.from(new Set(jobs.map(j => j.location))).filter(Boolean);

	return (
		<div className="w-full px-1 sm:px-2 py-4 sm:py-8">
			<UserProfileSummary />
			<div className="container mx-auto max-w-screen-2xl px-0 sm:px-6">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
					{/* Left sidebar */}
					<aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
						<RecentSearchesSidebarContainer />
					</aside>
					{/* Main content */}
					<div className="col-span-1 lg:col-span-6 xl:col-span-6">
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
						{/* Personalized Recommendations */}
						{recommended.length > 0 && (
							<div className="mb-8">
								<h2 className="text-lg font-bold text-accent mb-4">Recommended for You</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
									{recommended.map((job) => (
										<JobCard
											key={job.slug}
											slug={job.slug}
											title={job.title}
											company={job.company_name}
											description={job.description}
											location={job.location}
											salary={job.salary}
											tags={job.tags}
										/>
									))}
								</div>
							</div>
						)}
						<TrendingTags onTagClick={handleTrendingTagClick} />
						<FeaturedJobs jobs={jobs} />
						<div className="w-full mt-4 sm:mt-8">
							<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
								{jobsToShow.length > 0 ? (
									jobsToShow.map((job) => (
										<JobCard
											key={job.slug}
											slug={job.slug}
											title={job.title}
											company={job.company_name}
											description={job.description}
											location={job.location}
											salary={job.salary}
											tags={job.tags}
										/>
									))
								) : (
									<p className="text-center mt-10 text-base-content/70">No jobs found.</p>
								)}
							</div>
						</div>
						{/* Pagination controls */}
						{totalPages > 1 && (
							<div className="flex flex-wrap justify-center items-center gap-2 mt-4 sm:mt-8">
								<Button
									className="btn-xs sm:btn-sm btn-outline btn-accent"
									onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
									disabled={currentPage === 1}
								>
									Prev
								</Button>
								{Array.from({ length: totalPages }, (_, i) => (
									<Button
										key={i + 1}
										className={`btn-xs sm:btn-sm ${currentPage === i + 1 ? "btn-accent" : "btn-outline btn-accent"}`}
										onClick={() => setCurrentPage(i + 1)}
									>
										{i + 1}
									</Button>
								))}
								<Button
									className="btn-xs sm:btn-sm btn-outline btn-accent"
									onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
									disabled={currentPage === totalPages}
								>
									Next
								</Button>
							</div>
						)}
						<BlogHighlights />
						<div className="mt-8">
							<Testimonials />
						</div>
					</div>
					{/* Right sidebar */}
					<aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
						<CompanySpotlight />
					</aside>
				</div>
			</div>
		</div>
	);
}
