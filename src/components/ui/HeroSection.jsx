import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const HeroSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-base-100 via-base-200 to-base-100 py-12 sm:py-16 lg:py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <RocketLaunchIcon className="w-8 h-8 text-emerald-500" />
              <span className="text-emerald-500 font-semibold text-lg">Role Rocket</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              <span className="text-base-content drop-shadow-lg">Find Your</span>
              <span className="block role-rocket-gradient drop-shadow-lg">Dream Job</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-base-content/70 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Building Connections, Bridging Opportunities - Your Future Starts Here
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative max-w-2xl mx-auto lg:mx-0"
            >
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-base-content/60" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 sm:pl-12 pr-24 sm:pr-32 py-3 sm:py-4 bg-base-200/50 backdrop-blur-sm border border-base-300 rounded-xl text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                />
                <motion.button
                  onClick={handleSearch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 px-3 sm:px-6 py-1.5 sm:py-2 bg-primary hover:bg-primary-focus text-primary-content rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 text-sm sm:text-base"
                >
                  Search
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
            aria-hidden="true"
          >
            <div className="relative w-full h-[500px]">
              {/* Main Illustration Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl backdrop-blur-sm border border-base-300/50 p-8 overflow-hidden">
                
                {/* Abstract Job Search Visualization */}
                <div className="flex flex-col items-center justify-center h-full gap-6">
                  
                  {/* Search/Profile Card */}
                  <motion.div 
                    className="w-64 bg-base-100 rounded-xl shadow-lg p-4 border border-base-300"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-base-300 rounded w-24 mb-2"></div>
                        <div className="h-2 bg-base-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-base-200 rounded w-full"></div>
                      <div className="h-2 bg-base-200 rounded w-3/4"></div>
                    </div>
                  </motion.div>

                  {/* Connection Lines */}
                  <svg className="w-32 h-16 text-primary/30" viewBox="0 0 128 64">
                    <motion.path
                      d="M64 0 L32 32 L64 64 M64 0 L96 32 L64 64"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>

                  {/* Job Cards Row */}
                  <div className="flex gap-4">
                    {[
                      { icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "primary", delay: 0 },
                      { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "secondary", delay: 0.2 },
                      { icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "accent", delay: 0.4 }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className={`w-16 h-16 bg-${item.color}/20 rounded-xl flex items-center justify-center border border-${item.color}/30`}
                        animate={{ 
                          y: [0, -6, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: item.delay 
                        }}
                      >
                        <svg className={`w-8 h-8 text-${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                      </motion.div>
                    ))}
                  </div>

                  {/* Success Badge */}
                  <motion.div 
                    className="flex items-center gap-2 bg-success/20 text-success px-4 py-2 rounded-full border border-success/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">Your Match Found!</span>
                  </motion.div>
                </div>
                
                {/* Floating Decorative Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 left-8 w-4 h-4 bg-primary/50 rounded-full blur-sm"
                />
                <motion.div
                  animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 right-12 w-3 h-3 bg-secondary/50 rounded-full blur-sm"
                />
                <motion.div
                  animate={{ y: [-5, 15, -5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-16 left-16 w-2 h-2 bg-accent/50 rounded-full blur-sm"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-24 right-8 w-6 h-6 bg-info/30 rounded-full blur-md"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
