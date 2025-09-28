import { useState, useEffect, useCallback, useRef } from "react";
import useJobs from "../hooks/useJobs";
import { motion as Motion, AnimatePresence } from "framer-motion";
import HeroSection from "../components/ui/HeroSection";
import CategoryFilters from "../components/ui/CategoryFilters";
import JobCard from "../components/ui/JobCard";
import Button from "../components/ui/Button";
import SearchAndFilterBar from "../components/ui/SearchAndFilter";
import UserProfileSummary from "../components/ui/UserProfileSummary";
import RecentSearchesSidebarContainer from "../components/ui/RecentSearchesSidebarContainer";
import TrendingTags from "../components/ui/TrendingTags";
import FeaturedJobs from "../components/homepage/FeaturedJobs";
import CompanySpotlight from "../components/ui/CompanySpotlight";
import Testimonials from "../components/homepage/Testimonials";
import BlogHighlights from "../components/ui/BlogHighlights";
import RecentApplications from "../components/ui/RecentApplications";
import { useSearchParams } from "react-router";
import { db, auth } from "../firebase";
import { collection, query, getDocs, addDoc, serverTimestamp, orderBy, limit, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function HomePage() {
	const [jobs, setJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [recommended, setRecommended] = useState([]);
	const [user, setUser] = useState(null);
	const [filters, setFilters] = useState({
		search: "",
		location: "",
		tag: "",
		company: "",
		remote: "",
		source: "",
		salary: ""
	});

	const { jobs: apiJobs, loading: apiLoading, error: apiError } = useJobs();
	const [searchParams, setSearchParams] = useSearchParams();

	// Pagination derived from URL
	const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
	const itemsPerPage = 12;

	// Fetch employer jobs and merge with API jobs
	useEffect(() => {
		const fetchEmployerJobs = async () => {
			try {
				const employerJobsRef = collection(db, "employerJobs");
				const employerJobsQuery = query(employerJobsRef, where("status", "==", "active"));
				const employerJobsSnap = await getDocs(employerJobsQuery);
				const employerJobs = employerJobsSnap.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
					company_name: doc.data().company,
					url: doc.data().applicationUrl || "#"
				}));
				return employerJobs;
			} catch (error) {
				console.error("Error fetching employer jobs:", error);
				return [];
			}
		};

		const dedupeBySlug = (items) => {
			if (!Array.isArray(items)) return [];
			const seen = new Set();
			return items.filter((j) => {
				if (!j?.slug || seen.has(j.slug)) return false;
				seen.add(j.slug);
				return true;
			});
		}

		const mergeJobs = async () => {
			const employerJobs = await fetchEmployerJobs();
			const merged = dedupeBySlug([...(apiJobs || []), ...employerJobs]);
			setJobs(merged);
			setFilteredJobs(merged);
		};

		mergeJobs();
	}, [apiJobs]);

	// Fetch user's saved jobs for recommendations
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setUser(user);
			if (!user) {
				setRecommended([]);
				return;
			}
			try {
				const searchesRef = collection(db, "users", user.uid, "recentSearches");
				const searchesQ = query(searchesRef, orderBy("timestamp", "desc"), limit(5));
				const searchesSnap = await getDocs(searchesQ);
				const recentTerms = searchesSnap.docs.map(doc => doc.data().term).join(" ");

				const savedRef = collection(db, "users", user.uid, "savedJobs");
				const savedSnap = await getDocs(savedRef);
				const savedSlugs = new Set(savedSnap.docs.map(doc => doc.data().slug));

				let recs = jobs.filter(job => {
					const matchesSearch = recentTerms && (
						job.title?.toLowerCase().includes(recentTerms.toLowerCase()) ||
						job.company_name?.toLowerCase().includes(recentTerms.toLowerCase()) ||
						job.tags?.some(tag => tag.toLowerCase().includes(recentTerms.toLowerCase()))
					);
					const isSaved = savedSlugs.has(job.slug);
					return matchesSearch || isSaved;
				});
				recs = recs.filter((job, idx, arr) => arr.findIndex(j => j.slug === job.slug) === idx).slice(0, 6);
				setRecommended(recs);
			} catch {
				setRecommended([]);
			}
		});
		return () => unsubscribe();
	}, [jobs]);

	// Filter jobs based on current filters
	useEffect(() => {
		if (!jobs.length) {
			setFilteredJobs([]);
			return;
		}

		let filtered = jobs;

		if (filters.search) {
			const searchLower = filters.search.toLowerCase();
			filtered = filtered.filter(job =>
				job.title?.toLowerCase().includes(searchLower) ||
				job.company_name?.toLowerCase().includes(searchLower) ||
				job.description?.toLowerCase().includes(searchLower) ||
				job.tags?.some(tag => tag.toLowerCase().includes(searchLower))
			);
		}

		if (filters.location) {
			filtered = filtered.filter(job => job.location === filters.location);
		}

		if (filters.tag) {
			filtered = filtered.filter(job => job.tags?.includes(filters.tag));
		}

		if (filters.company) {
			filtered = filtered.filter(job => job.company_name === filters.company);
		}

		if (filters.remote) {
			filtered = filtered.filter(job => {
				if (filters.remote === "Yes") return job.remote === true;
				if (filters.remote === "No") return job.remote === false;
				return true;
			});
		}

		if (filters.source) {
			filtered = filtered.filter(job => job.source === filters.source);
		}

		if (filters.salary) {
			filtered = filtered.filter(job => {
				if (job.salary && typeof job.salary === 'string') {
					const salaryMatch = job.salary.match(/\d+/);
					if (salaryMatch) {
						return job.salary >= Number(filters.salary);
					}
				}
				return true;
			});
		}

		setFilteredJobs(filtered);
	}, [filters, jobs]);

	// Pagination calculations
	const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const jobsToShow = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

	// Update URL when page changes
	const setPage = useCallback((page) => {
		const clamped = Math.max(1, Math.min(page, totalPages));
		if (clamped === currentPage) {
			return;
		}
		const next = new URLSearchParams(searchParams);
		if (clamped > 1) next.set("page", String(clamped)); else next.delete("page");
		const curr = searchParams.toString();
		const nxt = next.toString();
		if (curr !== nxt) {
			setSearchParams(next, { replace: true });
		}
	}, [currentPage, totalPages, searchParams, setSearchParams]);

	// Handle filter changes
	const handleFilter = useCallback((newFilters) => {
		setFilters(prev => ({ ...prev, ...newFilters }));
		setPage(1);
	}, [setPage]);

	// Handle trending tag clicks
	const handleTrendingTagClick = useCallback((tag) => {
		setFilters(prev => ({ ...prev, tag, search: "" }));
		setPage(1);
	}, [setPage]);

	// Save search term to Firestore (debounced) - keep hooks before any returns
	const searchTimerRef = useRef();
	const handleSearchWithSave = useCallback(async (val) => {
		setFilters((f) => ({ ...f, search: val }));
		if ((val || '').trim()) setPage(1);
		const user = auth.currentUser;
		if (!user || !val?.trim()) return;
		if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
		searchTimerRef.current = setTimeout(async () => {
			try {
				const searchesRef = collection(db, "users", user.uid, "recentSearches");
				await addDoc(searchesRef, { term: val, timestamp: serverTimestamp() });
			} catch (err) {
				console.error("Failed to save search:", err);
			}
		}, 1000);
	}, [setPage]);

	// Early render returns after hooks are declared
	if (apiLoading) {
		return (
			<div className="w-full px-1 sm:px-2 py-4 sm:py-8">
				<UserProfileSummary />
				<div className="container mx-auto max-w-screen-2xl px-0 sm:px-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
						{Array.from({ length: 6 }).map((_, i) => (
							<div key={i} className="card bg-base-100 shadow-xl border border-base-300 p-6">
								<div className="animate-pulse">
									<div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
									<div className="h-3 bg-base-300 rounded w-1/2 mb-4"></div>
									<div className="h-3 bg-base-300 rounded w-full mb-2"></div>
									<div className="h-3 bg-base-300 rounded w-2/3"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
	if (apiError) return <p className="text-center mt-10 text-red-500">{apiError}</p>;

	// Dynamic filter options
	const tagOptions = Array.from(new Set(jobs.flatMap(j => j.tags || []))).filter(Boolean);
	const companyOptions = Array.from(new Set(jobs.map(j => j.company_name))).filter(Boolean);
	const locationOptions = Array.from(new Set(jobs.map(j => j.location))).filter(Boolean);

	return (
		<div className="min-h-screen w-full">
			{/* Hero Section */}
			<HeroSection onSearch={handleSearchWithSave} />
			
			{/* Category Filters */}
			<CategoryFilters onCategoryClick={handleSearchWithSave} />
			
			{/* Main Content */}
			<div className="w-full py-8 bg-base-100">
				<div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
					{/* User Profile Summary */}
					<UserProfileSummary />
					
					{/* Search and Filter Bar */}
					<div className="bg-base-200 rounded-lg p-6 mb-6 border border-base-300">
						<h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-6">Find Your Next Job</h2>
						<SearchAndFilterBar
							onSearch={handleSearchWithSave}
							onFilter={handleFilter}
							tagOptions={tagOptions}
							companyOptions={companyOptions}
							locationOptions={locationOptions}
							sourceOptions={["arbeitnow","remotive","jobicy"]}
						/>
					</div>
						
					{/* Recent Searches - moved under search bar */}
					<div className="mb-6">
						<RecentSearchesSidebarContainer />
					</div>
						
					{/* Personalized Recommendations */}
					{recommended.length > 0 && (
						<div className="mb-8">
							<h2 className="text-2xl font-bold text-base-content mb-6">Recommended for You</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
										url={job.url}
										source={job.source}
									/>
								))}
							</div>
						</div>
					)}
					<TrendingTags onTagClick={handleTrendingTagClick} />
					<FeaturedJobs />
						
					{/* Job Listings Section */}
					<div className="w-full mt-8">
						<h2 className="text-2xl font-bold text-base-content mb-6">Most Popular Vacancies</h2>
						<AnimatePresence mode="wait">
							{jobsToShow.length > 0 ? (
								<Motion.div 
									key="jobs-grid"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
									className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
								>
									{jobsToShow.map((job, index) => (
										<Motion.div
											key={job.slug}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{ 
												duration: 0.4, 
												delay: index * 0.1,
												ease: "easeOut"
											}}
										>
											<JobCard
												slug={job.slug}
												title={job.title}
												company={job.company_name}
												description={job.description}
												location={job.location}
												salary={job.salary}
												tags={job.tags}
												url={job.url}
												source={job.source}
											/>
										</Motion.div>
									))}
								</Motion.div>
							) : (
								<Motion.div
									key="no-jobs"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.3 }}
									className="text-center py-12"
								>
									<p className="text-lg text-base-content/70">No jobs found matching your criteria.</p>
								</Motion.div>
							)}
						</AnimatePresence>
					</div>
					
					{/* Pagination controls */}
					{totalPages > 1 && (
						<Motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.3 }}
							className="flex flex-wrap justify-center items-center gap-2 mt-4 sm:mt-8"
						>
							<Motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									className="btn-xs sm:btn-sm btn-outline btn-accent"
									onClick={() => setPage(currentPage - 1)}
									disabled={currentPage === 1}
								>
									Prev
								</Button>
							</Motion.div>
							{Array.from({ length: totalPages }, (_, i) => (
								<Motion.div
									key={i + 1}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.6 + (i * 0.05), duration: 0.2 }}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<Button
										className={`btn-xs sm:btn-sm transition-all duration-200 ${
											currentPage === i + 1 
												? "btn-accent shadow-lg shadow-accent/25" 
												: "btn-outline btn-accent hover:bg-accent/10"
										}`}
										onClick={() => setPage(i + 1)}
									>
										{i + 1}
									</Button>
								</Motion.div>
							))}
							<Motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									className="btn-xs sm:btn-sm btn-outline btn-accent"
									onClick={() => setPage(currentPage + 1)}
									disabled={currentPage === totalPages}
								>
									Next
								</Button>
							</Motion.div>
						</Motion.div>
					)}
					
					{/* Blog Highlights */}
					<div className="mt-8">
						<BlogHighlights />
					</div>
					
					{/* Show testimonials for unauthenticated users, recent applications for authenticated users */}
					{!user ? (
						<div className="mt-8">
							<Testimonials />
						</div>
					) : (
						<div className="mt-8">
							<RecentApplications />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}