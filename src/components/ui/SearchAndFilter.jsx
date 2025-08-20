import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

export default function SearchAndFilterBar({ onSearch, onFilter, tagOptions = [], companyOptions = [], locationOptions = [] }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [location, setLocation] = useState("");
	const [tag, setTag] = useState("");
	const [company, setCompany] = useState("");
	const [remote, setRemote] = useState("");
	const [salary, setSalary] = useState("");

	const remoteOptions = ["Remote", "Hybrid", "Onsite"];

	 useEffect(() => {
		 if (onFilter) {
			 onFilter({ location, tag, company, remote, salary });
		 }
	 }, [location, tag, company, remote, salary, onFilter]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
		if (onSearch) onSearch(e.target.value);
	};

	return (
		<div className="flex flex-col gap-4 items-center mb-6 md:flex-row md:gap-4">
			{/* Search input */}
			<input
				type="text"
				placeholder="Search jobs..."
				value={searchTerm}
				onChange={handleSearch}
				className="input input-bordered w-full md:w-1/2"
			/>
			{/* Dropdowns side by side */}
			<div className="flex flex-row gap-4 w-full md:w-auto flex-wrap">
				{/* Location dropdown */}
				<Menu as="div" className="relative">
					<MenuButton className="btn btn-outline min-w-[10rem] flex justify-between items-center">
						<span>{location || "Select Location"}</span>
						<svg className="ml-2 w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</MenuButton>
					<MenuItems className="absolute mt-2 z-[1] p-2 shadow bg-base-100 rounded-box w-52 transition-all duration-150">
						{locationOptions.map((loc) => (
							<MenuItem key={loc}>
								{({ hovered }) => (
									<button
										onClick={() => setLocation(loc)}
										className={`menu-item w-full text-left px-4 py-2 rounded-md transition-colors duration-100 ${hovered ? "bg-primary text-primary-content" : ""}`}
									>
										{loc}
									</button>
								)}
							</MenuItem>
						))}
					</MenuItems>
				</Menu>
				{/* Removed static job type dropdown. Use dynamic tag dropdown for job type filtering. */}
				{/* Tag dropdown */}
				<Menu as="div" className="relative">
					<MenuButton className="btn btn-outline min-w-[10rem] flex justify-between items-center">
						<span>{tag || "Select Tag"}</span>
						<svg className="ml-2 w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</MenuButton>
					<MenuItems className="absolute mt-2 z-[1] p-2 shadow bg-base-100 rounded-box w-52 transition-all duration-150">
						{tagOptions.map((t) => (
							<MenuItem key={t}>
								{({ hovered }) => (
									<button
										onClick={() => setTag(t)}
										className={`menu-item w-full text-left px-4 py-2 rounded-md transition-colors duration-100 ${hovered ? "bg-primary text-primary-content" : ""}`}
									>
										{t}
									</button>
								)}
							</MenuItem>
						))}
					</MenuItems>
				</Menu>
				{/* Company dropdown */}
				<Menu as="div" className="relative">
					<MenuButton className="btn btn-outline min-w-[10rem] flex justify-between items-center">
						<span>{company || "Select Company"}</span>
						<svg className="ml-2 w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</MenuButton>
					<MenuItems className="absolute mt-2 z-[1] p-2 shadow bg-base-100 rounded-box w-52 transition-all duration-150">
						{companyOptions.map((c) => (
							<MenuItem key={c}>
								{({ hovered }) => (
									<button
										onClick={() => setCompany(c)}
										className={`menu-item w-full text-left px-4 py-2 rounded-md transition-colors duration-100 ${hovered ? "bg-primary text-primary-content" : ""}`}
									>
										{c}
									</button>
								)}
							</MenuItem>
						))}
					</MenuItems>
				</Menu>
				{/* Remote/Hybrid/Onsite dropdown */}
				<Menu as="div" className="relative">
					<MenuButton className="btn btn-outline min-w-[10rem] flex justify-between items-center">
						<span>{remote || "Remote/Hybrid/Onsite"}</span>
						<svg className="ml-2 w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</MenuButton>
					<MenuItems className="absolute mt-2 z-[1] p-2 shadow bg-base-100 rounded-box w-52 transition-all duration-150">
						{remoteOptions.map((r) => (
							<MenuItem key={r}>
								{({ hovered }) => (
									<button
										onClick={() => setRemote(r)}
										className={`menu-item w-full text-left px-4 py-2 rounded-md transition-colors duration-100 ${hovered ? "bg-primary text-primary-content" : ""}`}
									>
										{r}
									</button>
								)}
							</MenuItem>
						))}
					</MenuItems>
				</Menu>
				{/* Salary range input */}
				<input
					type="number"
					min="0"
					placeholder="Min Salary (€)"
					value={salary}
					onChange={(e) => setSalary(e.target.value)}
					className="input input-bordered w-32"
				/>
			</div>
		</div>
	);
}
