import React from "react";

export default function RecentSearchesSidebar({ searches = [] }) {
  if (!searches.length) return (
    <div className="card bg-base-100 shadow p-4 mb-6 text-center text-base-content/70">
      No recent searches.
    </div>
  );
  return (
    <div className="card bg-base-100 shadow p-4 mb-6">
      <h3 className="font-bold text-lg text-accent mb-4">Recent Searches</h3>
      <ul className="flex flex-col gap-2">
        {searches.map((search, idx) => (
          <li key={idx} className="badge badge-outline badge-accent px-3 py-2 text-sm whitespace-nowrap">
            {search}
          </li>
        ))}
      </ul>
    </div>
  );
}
