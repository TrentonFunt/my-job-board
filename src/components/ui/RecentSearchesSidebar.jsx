import React from "react";

export default function RecentSearchesSidebar({ searches = [] }) {
  // Only show the last 5 searches
  const lastFive = searches.slice(0, 5);
  if (!lastFive.length) return (
    <div className="card bg-base-100 shadow w-full p-2 sm:p-4 mb-4 sm:mb-6 text-center text-base-content/70">
      No recent searches.
    </div>
  );
  return (
    <div className="card bg-base-100 shadow w-full p-2 sm:p-4 mb-4 sm:mb-6">
      <h3 className="font-bold text-base sm:text-lg text-accent mb-2 sm:mb-4">Recent Searches</h3>
      <div className="flex flex-wrap gap-2 items-center">
        {lastFive.map((search, idx) => (
          <span key={idx} className="badge badge-outline badge-accent px-2 py-1 text-xs sm:text-sm whitespace-nowrap">
            {search}
          </span>
        ))}
      </div>
    </div>
  );
}
