import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  onFilter, 
  onSearch,
  locationOptions = [], 
  activeFilters = {}
}) => {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    tag: '',
    company: '',
    remote: '',
    source: '',
    salary: '',
    jobType: ''
  });

  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Update filters when activeFilters prop changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, ...activeFilters }));
  }, [activeFilters]);

  // Count active filters
  useEffect(() => {
    const count = Object.values(filters).filter(value => value && value !== '').length;
    setActiveFilterCount(count);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      location: '',
      tag: '',
      company: '',
      remote: '',
      source: '',
      salary: '',
      jobType: ''
    };
    setFilters(clearedFilters);
    if (onFilter) {
      onFilter(clearedFilters);
    }
  };

  const removeFilter = (key) => {
    const newFilters = { ...filters, [key]: '' };
    setFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    handleFilterChange('search', value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const jobTypes = ['Full Time', 'Part Time', 'Internship', 'Temporary', 'Contract Based'];
  const salaryRanges = [
    '$10 - $100',
    '$100 - $1,000', 
    '$1,000 - $10,000',
    '$10,000 - $100,000',
    '$100,000+',
    'Custom'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-base-200 border-l border-base-300 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-base-content">Filters</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-base-300 rounded-lg transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5 text-base-content/70" />
                </button>
              </div>

              {/* Active Filters */}
              {activeFilterCount > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-base-content/70 mb-3">Active Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(filters).map(([key, value]) => {
                      if (!value || value === '') return null;
                      return (
                        <span
                          key={key}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm rounded-full"
                        >
                          {key === 'search' ? 'Search' : key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                          <button
                            onClick={() => removeFilter(key)}
                            className="ml-1 hover:text-emerald-300"
                          >
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Job title or keyword
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={handleSearch}
                    placeholder="Search jobs..."
                    className="w-full bg-base-100 border border-base-300 rounded-lg px-10 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-base-content/70 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/60" />
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full bg-base-100 border border-base-300 rounded-lg px-10 py-3 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    <option value="">Select Location</option>
                    {locationOptions.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Industry */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-base-content/70 mb-3">Industry</h3>
                <div className="space-y-2">
                  {['All Category', 'Developments', 'Business', 'Finance & Accounting', 'IT and Software', 'Office Productivity', 'Personal Development', 'Design', 'Marketing'].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="industry"
                        value={category}
                        checked={filters.tag === category}
                        onChange={(e) => handleFilterChange('tag', e.target.value)}
                        className="mr-3 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-base-content/70 text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-base-content/70 mb-3">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value={type}
                        checked={filters.jobType === type}
                        onChange={(e) => handleFilterChange('jobType', e.target.value)}
                        className="mr-3 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-slate-300 text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-base-content/70 mb-3">Salary Yearly</h3>
                <div className="space-y-2">
                  {salaryRanges.map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="radio"
                        name="salary"
                        value={range}
                        checked={filters.salary === range}
                        onChange={(e) => handleFilterChange('salary', e.target.value)}
                        className="mr-3 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-slate-300 text-sm">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Remote Job Toggle */}
              <div className="mb-6">
                <label className="flex items-center justify-between">
                  <span className="text-base-content/70 text-sm">Remote Job</span>
                  <input
                    type="checkbox"
                    checked={filters.remote === 'true'}
                    onChange={(e) => handleFilterChange('remote', e.target.checked ? 'true' : '')}
                    className="w-4 h-4 text-primary bg-base-100 border-base-300 rounded focus:ring-primary"
                  />
                </label>
              </div>

              {/* Apply Filter Button */}
              <button
                onClick={onClose}
                className="w-full bg-primary hover:bg-primary-focus text-primary-content py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
              >
                Apply Filter
              </button>

              {/* Clear All Button */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="w-full mt-3 bg-base-100 hover:bg-base-200 text-base-content/70 py-3 px-4 rounded-lg font-medium transition-all duration-200"
                >
                  Clear All
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;
