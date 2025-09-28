import React from "react";
import { motion as Motion } from "framer-motion";
import { Link, useParams } from "react-router";
import { 
  CalendarIcon,
  ClockIcon,
  ArrowLeftIcon,
  UserIcon,
  TagIcon,
  ShareIcon
} from "@heroicons/react/24/outline";

// Extended blog data with full content
const blogPosts = [
  {
    id: 1,
    title: "How to Ace Your Next Interview",
    summary: "Top tips and strategies to impress recruiters and land your dream job.",
    content: `
      <p>Interviewing can be nerve-wracking, but with the right preparation, you can confidently showcase your skills and land your dream job. Here are our top strategies for interview success:</p>
      
      <h2>Essential Interview Preparation Steps</h2>
      
      <h3>1. Research the Company Thoroughly</h3>
      <p>Before your interview, spend time learning about the company's mission, values, recent news, and industry position. This knowledge will help you ask informed questions and demonstrate genuine interest.</p>
      
      <p>Start by visiting their website, reading their latest press releases, and checking their social media presence. Understanding their company culture and recent achievements will help you tailor your responses and show that you're genuinely interested in joining their team.</p>
      
      <h3>2. Practice Common Interview Questions</h3>
      <p>Prepare answers for common questions like "Tell me about yourself," "Why do you want to work here?" and "What are your strengths and weaknesses?" Practice with a friend or in front of a mirror.</p>
      
      <p>Create a list of your key accomplishments and be ready to discuss them using the STAR method (Situation, Task, Action, Result). This structured approach will help you provide clear, compelling examples of your skills and experience.</p>
      
      <h3>3. Prepare Your Own Questions</h3>
      <p>Having thoughtful questions ready shows your interest and helps you evaluate if the role is right for you. Ask about team dynamics, growth opportunities, and company culture.</p>
      
      <p>Some great questions to ask include:</p>
      <ul>
        <li>What does success look like in this role?</li>
        <li>How does the team collaborate on projects?</li>
        <li>What opportunities are there for professional development?</li>
        <li>What are the biggest challenges facing the team right now?</li>
      </ul>
      
      <h3>4. Dress Appropriately</h3>
      <p>Research the company's dress code and dress one level above what's expected. When in doubt, business professional is always a safe choice.</p>
      
      <p>Your appearance should reflect the company's culture while showing that you take the opportunity seriously. If you're unsure about the dress code, don't hesitate to ask the recruiter or hiring manager for guidance.</p>
      
      <h3>5. Follow Up</h3>
      <p>Send a thank-you email within 24 hours of your interview. Reference specific points from your conversation and reiterate your interest in the position.</p>
      
      <p>This follow-up is not just a courtesy—it's another opportunity to reinforce why you're the right candidate for the role. Mention something specific you discussed and how it relates to your qualifications and enthusiasm for the position.</p>
    `,
    author: "Sarah Johnson",
    authorBio: "Senior HR Manager with 10+ years of experience in talent acquisition and career development.",
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
    content: `
      <p>Remote work has become the new normal for many professionals. While it offers flexibility and work-life balance, it also comes with unique challenges. Here's how to make the most of remote work:</p>
      
      <h2>Understanding Remote Work Dynamics</h2>
      
      <p>The shift to remote work has fundamentally changed how we approach our careers. Whether you're new to remote work or looking to optimize your current setup, understanding both the benefits and challenges is crucial for success.</p>
      
      <h3>The Benefits of Remote Work</h3>
      <p>Remote work offers numerous advantages that can significantly improve your quality of life and job satisfaction:</p>
      
      <ul>
        <li><strong>Flexibility:</strong> Set your own schedule and work from anywhere</li>
        <li><strong>Cost Savings:</strong> No commuting costs or expensive work wardrobe</li>
        <li><strong>Better Work-Life Balance:</strong> More time with family and personal pursuits</li>
        <li><strong>Increased Productivity:</strong> Fewer office distractions</li>
        <li><strong>Environmental Benefits:</strong> Reduced carbon footprint from commuting</li>
        <li><strong>Access to Global Opportunities:</strong> Work for companies worldwide</li>
      </ul>
      
      <h3>Common Challenges</h3>
      <p>Despite its benefits, remote work presents unique obstacles that require proactive management:</p>
      
      <ul>
        <li><strong>Isolation:</strong> Limited social interaction with colleagues</li>
        <li><strong>Communication:</strong> Misunderstandings due to lack of face-to-face interaction</li>
        <li><strong>Distractions:</strong> Home environment can be distracting</li>
        <li><strong>Work-Life Boundaries:</strong> Difficulty separating work and personal time</li>
        <li><strong>Technology Issues:</strong> Reliance on stable internet and equipment</li>
        <li><strong>Career Visibility:</strong> Staying visible to management and colleagues</li>
      </ul>
      
      <h3>Best Practices for Remote Work Success</h3>
      <p>To thrive in a remote work environment, consider implementing these strategies:</p>
      
      <p><strong>Create a Dedicated Workspace:</strong> Set up a specific area in your home that's solely for work. This helps create mental boundaries and improves focus.</p>
      
      <p><strong>Establish a Routine:</strong> Maintain consistent work hours and daily routines to structure your day effectively.</p>
      
      <p><strong>Communicate Regularly:</strong> Stay in touch with your team through regular check-ins, video calls, and collaborative tools.</p>
      
      <p><strong>Set Clear Boundaries:</strong> Define when you're "at work" and when you're "off work" to maintain a healthy work-life balance.</p>
      
      <p><strong>Invest in Technology:</strong> Ensure you have reliable internet, a good webcam, and quality headphones for virtual meetings.</p>
    `,
    author: "Michael Chen",
    authorBio: "Remote work consultant and former tech startup founder with expertise in distributed teams.",
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
    content: `
      <p>Your resume is often the first impression you make on potential employers. In today's competitive job market, it's crucial to create a resume that stands out from the crowd while being optimized for both human readers and applicant tracking systems (ATS).</p>
      
      <h2>Crafting a Standout Resume</h2>
      
      <p>A well-crafted resume can be the difference between landing an interview and being overlooked. With recruiters spending an average of 6 seconds reviewing each resume, every element must work together to create a compelling narrative of your professional journey.</p>
      
      <h3>Key Elements of a Modern Resume</h3>
      <p>Today's resumes need to balance visual appeal with ATS compatibility. Here are the essential components:</p>
      
      <ul>
        <li><strong>Clean, ATS-Friendly Format:</strong> Use simple fonts and clear section headers</li>
        <li><strong>Quantified Achievements:</strong> Include specific numbers and results</li>
        <li><strong>Relevant Keywords:</strong> Optimize for applicant tracking systems</li>
        <li><strong>Professional Summary:</strong> A compelling 2-3 sentence overview</li>
        <li><strong>Skills Section:</strong> Highlight both technical and soft skills</li>
        <li><strong>Contact Information:</strong> Professional email and LinkedIn profile</li>
      </ul>
      
      <h3>What to Include</h3>
      <p>Focus on your most relevant experience, skills, and achievements. Tailor your resume for each job application by highlighting the most relevant qualifications.</p>
      
      <p><strong>Professional Summary:</strong> Start with a powerful summary that highlights your key strengths and career objectives. This should be tailored to the specific role you're applying for.</p>
      
      <p><strong>Work Experience:</strong> List your roles in reverse chronological order, focusing on achievements rather than just responsibilities. Use action verbs and quantify your impact whenever possible.</p>
      
      <p><strong>Education:</strong> Include relevant degrees, certifications, and professional development courses that enhance your candidacy.</p>
      
      <h3>Common Mistakes to Avoid</h3>
      <p>Steer clear of these common pitfalls that can hurt your chances:</p>
      
      <ul>
        <li>Including irrelevant personal information (age, marital status, photos)</li>
        <li>Using outdated formats or fonts that are hard to read</li>
        <li>Making it too long (keep it to 1-2 pages maximum)</li>
        <li>Including typos or grammatical errors</li>
        <li>Using generic objectives instead of tailored summaries</li>
        <li>Listing every job you've ever had (focus on relevant experience)</li>
        <li>Using unprofessional email addresses</li>
      </ul>
      
      <h3>Pro Tips for 2025</h3>
      <p>Stay ahead of the curve with these modern resume strategies:</p>
      
      <p><strong>Optimize for ATS:</strong> Use standard section headers like "Experience," "Education," and "Skills." Avoid graphics, tables, or complex formatting that might confuse ATS systems.</p>
      
      <p><strong>Include Relevant Keywords:</strong> Study the job description and incorporate relevant keywords naturally throughout your resume.</p>
      
      <p><strong>Show Impact:</strong> Use metrics and specific examples to demonstrate your value. Instead of "Managed a team," write "Led a team of 8 developers, resulting in 30% faster project delivery."</p>
    `,
    author: "Emily Rodriguez",
    authorBio: "Career coach and former recruiter specializing in resume optimization and job search strategies.",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Resume Tips",
    tags: ["resume", "career", "job search"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop"
  }
];

export default function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
          <Link 
            to="/blog"
            className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
              to="/blog"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 mb-6"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <div className="mb-4">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-slate-300 mb-6 max-w-3xl">
              {post.summary}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
              <button className="flex items-center gap-2 hover:text-emerald-400 transition-colors duration-200">
                <ShareIcon className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </Motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800 rounded-xl p-8 border border-slate-700"
              >
                <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div 
                  className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-slate-300 prose-ol:text-slate-300 prose-li:text-slate-300 prose-li:mb-2 prose-strong:text-white prose-strong:font-semibold prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-emerald-400 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:text-white prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-8 prose-h1:text-white"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </Motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                {/* Author Info */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">About the Author</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{post.author}</p>
                      <p className="text-sm text-slate-400">{post.authorBio}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="flex items-center gap-1 bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm"
                      >
                        <TagIcon className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related Posts */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {blogPosts
                      .filter(p => p.id !== post.id && p.category === post.category)
                      .slice(0, 3)
                      .map((relatedPost) => (
                        <Link 
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.id}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            <img 
                              src={relatedPost.image} 
                              alt={relatedPost.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <p className="text-xs text-slate-400 mt-1">
                                {new Date(relatedPost.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </Motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }
        
        .prose h2 {
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #10b981;
        }
        
        .prose h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .prose ul, .prose ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        
        .prose strong {
          color: #ffffff;
          font-weight: 600;
        }
        
        .prose blockquote {
          border-left: 4px solid #10b981;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #cbd5e1;
        }
        
        .prose code {
          background-color: #1e293b;
          color: #10b981;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        
        .prose pre {
          background-color: #1e293b;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .prose pre code {
          background-color: transparent;
          padding: 0;
          color: #e2e8f0;
        }
      `}</style>
    </div>
  );
}
