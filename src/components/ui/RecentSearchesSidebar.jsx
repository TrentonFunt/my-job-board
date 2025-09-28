import React from "react";

export default function RecentSearchesSidebar({ searches = [] }) {
  // Only show the last 5 searches
  const lastFive = searches.slice(0, 5);
  if (!lastFive.length) return (
    <div className="card-modern w-full p-6 mb-6 text-center text-slate-300">
      No recent searches.
    </div>
  );
  return (
    <div className="card-modern w-full p-6 mb-6">
      <h3 className="font-bold text-lg text-emerald-400 mb-4">Recent Searches</h3>
      <div className="flex flex-wrap gap-3 items-center">
        {lastFive.map((search, idx) => (
          <span key={idx} className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-2 text-sm rounded-full whitespace-nowrap hover:bg-emerald-500/30 transition-colors duration-200 cursor-pointer">
            {search}
          </span>
        ))}
      </div>
    </div>
  );
}
