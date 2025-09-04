import React from "react";

const tags = ["Remote", "Frontend", "Backend", "Design", "Marketing", "Full-time", "Part-time"];

export default function TrendingTags({ onTagClick }) {
  return (
    <section className="my-10">
      <h2 className="text-xl font-bold text-accent mb-4">Trending Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            className="badge badge-accent badge-outline px-4 py-2 cursor-pointer hover:bg-accent hover:text-base-100 transition"
            onClick={() => onTagClick && onTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
