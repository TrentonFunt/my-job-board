import React from "react";

// Example static blog data
const blogPosts = [
  {
    id: 1,
    title: "How to Ace Your Next Interview",
    summary: "Top tips and strategies to impress recruiters and land your dream job.",
    link: "#"
  },
  {
    id: 2,
    title: "Remote Work: Pros, Cons, and Best Practices",
    summary: "Explore the benefits and challenges of remote jobs, plus tips for success.",
    link: "#"
  },
  {
    id: 3,
    title: "Building a Standout Resume in 2025",
    summary: "Learn how to craft a resume that gets noticed in today's job market.",
    link: "#"
  }
];

export default function BlogHighlights() {
  return (
    <section className="mb-8 mt-12">
      <h2 className="text-xl font-bold text-accent mb-4">Blog Highlights</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map(post => (
          <div key={post.id} className="card bg-base-100 shadow p-4 border">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-sm mb-2 text-base-content/70">{post.summary}</p>
            <a href={post.link} className="link link-accent text-sm">Read More</a>
          </div>
        ))}
      </div>
    </section>
  );
}
