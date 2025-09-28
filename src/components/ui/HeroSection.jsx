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
            className="relative"
          >
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
              {/* Main Illustration Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl backdrop-blur-sm border border-base-300/50 p-4 sm:p-6 lg:p-8">
                {/* Person Illustration */}
                <div className="flex items-center justify-center h-full">
                  <div className="relative">
                    {/* Person Figure */}
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-focus rounded-full flex items-center justify-center mb-4 mx-auto">
                      <div className="w-24 h-24 bg-base-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">👨‍💻</span>
                      </div>
                    </div>
                    
                    {/* Laptop */}
                    <div className="w-40 h-24 bg-base-300 rounded-lg mx-auto relative">
                      <div className="absolute inset-2 bg-base-200 rounded flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary rounded"></div>
                      </div>
                    </div>
                    
                    {/* Plant */}
                    <div className="absolute -right-4 top-8 w-8 h-12 bg-primary rounded-t-full"></div>
                    <div className="absolute -right-2 top-6 w-4 h-4 bg-primary/70 rounded-full"></div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 left-8 w-4 h-4 bg-primary/70 rounded-full"
                />
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-16 right-12 w-3 h-3 bg-secondary/70 rounded-full"
                />
                <motion.div
                  animate={{ y: [-5, 15, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-12 left-12 w-2 h-2 bg-info/70 rounded-full"
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
