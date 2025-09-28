import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, FunnelIcon, MapPinIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import FilterSidebar from "./FilterSidebar";

export default function SearchAndFilterBar({ onSearch, onFilter, tagOptions = [], companyOptions = [], locationOptions = [], sourceOptions = [] }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [location, setLocation] = useState("");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [activeFilters, setActiveFilters] = useState({});

	// Debounced search
	useEffect(() => {
		if (!onSearch) return;
		const id = setTimeout(() => {
			onSearch(searchTerm);
		}, 300);
		return () => clearTimeout(id);
	}, [searchTerm, onSearch]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleFilter = (filters) => {
		setActiveFilters(filters);
		if (onFilter) {
			onFilter(filters);
		}
	};

	const activeFilterCount = Object.values(activeFilters).filter(value => value && value !== '').length;

	return (
		<>
			<motion.div 
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="space-y-4"
			>
				{/* Main search bar */}
				<motion.div 
					className="relative"
					whileFocus={{ scale: 1.02 }}
					transition={{ duration: 0.2 }}
				>
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
						{/* Search Input */}
						<div className="relative flex-1">
							<MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-base-content/60" />
			<input
				type="text"
				id="searchTerm"
				name="searchTerm"
								placeholder="Job title or keyword"
				value={searchTerm}
				onChange={handleSearch}
								className="w-full bg-base-200 border border-base-300 rounded-lg px-10 sm:px-12 py-3 sm:py-4 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm sm:text-base"
								autoComplete="off"
							/>
						</div>

						{/* Location Input */}
						<div className="relative flex-1">
							<MapPinIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-base-content/60" />
							<input
								type="text"
								id="search-location"
								name="location"
								placeholder="NewTown, Kolkata"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								className="w-full bg-base-200 border border-base-300 rounded-lg px-10 sm:px-12 py-3 sm:py-4 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm sm:text-base"
								autoComplete="off"
							/>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-2 sm:gap-4">
							{/* Search Button */}
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 flex-1 sm:flex-none"
							>
								<ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto sm:mx-0" />
								<span className="sm:hidden text-sm">Search</span>
							</motion.button>

							{/* Filter Button */}
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setIsFilterOpen(true)}
								className="bg-white hover:bg-gray-100 text-slate-800 px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 flex-1 sm:flex-none"
							>
								<FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5" />
								<span className="text-sm sm:text-base">Filters</span>
								{activeFilterCount > 0 && (
									<motion.span
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full"
									>
										{activeFilterCount}
									</motion.span>
								)}
							</motion.button>
			</div>
		</div>
				</motion.div>
			</motion.div>

			{/* Filter Sidebar */}
			<FilterSidebar
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				onFilter={handleFilter}
				onSearch={onSearch}
				tagOptions={tagOptions}
				companyOptions={companyOptions}
				locationOptions={locationOptions}
				sourceOptions={sourceOptions}
				activeFilters={activeFilters}
			/>
		</>
	);
}