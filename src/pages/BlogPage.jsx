import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router";
import { 
  CalendarIcon,
  ClockIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  TagIcon
} from "@heroicons/react/24/outline";

// Extended blog data
const blogPosts = [
  {
    id: 1,
    title: "How to Ace Your Next Interview",
    summary: "Top tips and strategies to impress recruiters and land your dream job.",
    content: "Interviewing can be nerve-wracking, but with the right preparation, you can confidently showcase your skills and land your dream job. Here are our top strategies for interview success...",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Career Tips",
    tags: ["interview", "career", "tips"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=face"
  },
  {
    id: 2,
    title: "Remote Work: Pros, Cons, and Best Practices",
    summary: "Explore the benefits and challenges of remote jobs, plus tips for success.",
    content: "Remote work has become the new normal for many professionals. While it offers flexibility and work-life balance, it also comes with unique challenges. Here's how to make the most of remote work...",
    author: "Michael Chen",
    date: "2024-01-12",
    readTime: "7 min read",
    category: "Remote Work",
    tags: ["remote work", "productivity", "work-life balance"],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Building a Standout Resume in 2025",
    summary: "Learn how to craft a resume that gets noticed in today's job market.",
    content: "Your resume is often the first impression you make on potential employers. In today's competitive job market, it's crucial to create a resume that stands out from the crowd...",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Resume Tips",
    tags: ["resume", "career", "job search"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Networking Strategies for Career Growth",
    summary: "Build meaningful professional relationships that advance your career.",
    content: "Networking isn't just about collecting business cards. It's about building genuine relationships that can open doors to new opportunities and career growth...",
    author: "David Kim",
    date: "2024-01-08",
    readTime: "8 min read",
    category: "Networking",
    tags: ["networking", "career growth", "professional relationships"],
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Salary Negotiation: Getting What You Deserve",
    summary: "Master the art of salary negotiation with these proven strategies.",
    content: "Salary negotiation can be intimidating, but it's a crucial skill for career advancement. Learn how to research, prepare, and confidently negotiate your worth...",
    author: "Lisa Wang",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Career Tips",
    tags: ["salary", "negotiation", "career advancement"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 6,
    title: "The Future of Work: Trends to Watch",
    summary: "Explore emerging trends that are shaping the future of work.",
    content: "The workplace is evolving rapidly. From AI integration to flexible work arrangements, here are the key trends that will shape how we work in the coming years...",
    author: "Alex Thompson",
    date: "2024-01-03",
    readTime: "9 min read",
    category: "Industry Trends",
    tags: ["future of work", "AI", "technology", "trends"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop"
  }
];

const categories = ["All", "Career Tips", "Remote Work", "Resume Tips", "Networking", "Industry Trends"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/jobs"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 mb-4"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Career Blog</h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Expert insights, tips, and strategies to help you advance your career and find your dream job.
            </p>
          </Motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Motion.div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <Motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 h-full">
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
                  
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-3 flex-grow">
                      {post.summary}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="flex items-center gap-1 bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs"
                        >
                          <TagIcon className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
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

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-slate-400 mb-4">
              <MagnifyingGlassIcon className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
              <p>Try adjusting your search terms or category filter.</p>
            </div>
          </Motion.div>
        )}
      </div>
    </div>
  );
}
