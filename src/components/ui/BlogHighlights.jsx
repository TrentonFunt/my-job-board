import React from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router";
import { 
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

// Example static blog data
const blogPosts = [
  {
    id: 1,
    title: "How to Ace Your Next Interview",
    summary: "Top tips and strategies to impress recruiters and land your dream job.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Career Tips",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=face"
  },
  {
    id: 2,
    title: "Remote Work: Pros, Cons, and Best Practices",
    summary: "Explore the benefits and challenges of remote jobs, plus tips for success.",
    author: "Michael Chen",
    date: "2024-01-12",
    readTime: "7 min read",
    category: "Remote Work",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Building a Standout Resume in 2025",
    summary: "Learn how to craft a resume that gets noticed in today's job market.",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Resume Tips",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop"
  }
];

export default function BlogHighlights() {
  return (
    <section className="mb-8 mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Latest Blog Posts</h2>
        <Link 
          to="/blog"
          className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200 flex items-center gap-2"
        >
          View All Posts
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Link to={`/blog/${post.id}`}>
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                    {post.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <span className="text-emerald-400 font-medium">Read More →</span>
                  </div>
                </div>
              </div>
            </Link>
          </Motion.div>
        ))}
      </div>
    </section>
  );
}
