
import { useNavigate } from "react-router";
import { motion as Motion } from "framer-motion";
import { 
  MagnifyingGlassIcon, 
  BriefcaseIcon, 
  RocketLaunchIcon,
  CheckCircleIcon,
  StarIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  HeartIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";

export default function LandingPage() {
  const navigate = useNavigate();
  
  // Trending data
  const trendingTags = ["Remote", "React", "Design", "Marketing", "Full-time", "Python", "UX/UI", "DevOps"];
  
  // Features data
  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Smart Job Matching",
      description: "AI-powered algorithms match you with the perfect opportunities based on your skills and preferences."
    },
    {
      icon: BriefcaseIcon,
      title: "One-Click Applications",
      description: "Apply to multiple jobs instantly with our streamlined application process."
    },
    {
      icon: ChartBarIcon,
      title: "Application Tracking",
      description: "Monitor your application status and get real-time updates on your job search progress."
    },
    {
      icon: ShieldCheckIcon,
      title: "Verified Companies",
      description: "All companies are verified to ensure legitimate opportunities and protect job seekers."
    }
  ];

  // Stats data
  const stats = [
    { number: "50K+", label: "Active Jobs" },
    { number: "10K+", label: "Companies" },
    { number: "100K+", label: "Job Seekers" },
    { number: "95%", label: "Success Rate" }
  ];

  // Categories data
  const categories = [
    { name: "Development", icon: CodeBracketIcon, jobs: "2,500+", color: "text-blue-500" },
    { name: "Design", icon: PaintBrushIcon, jobs: "1,200+", color: "text-purple-500" },
    { name: "Marketing", icon: MegaphoneIcon, jobs: "800+", color: "text-green-500" },
    { name: "Finance", icon: BanknotesIcon, jobs: "600+", color: "text-yellow-500" },
    { name: "Education", icon: AcademicCapIcon, jobs: "400+", color: "text-indigo-500" },
    { name: "Healthcare", icon: HeartIcon, jobs: "900+", color: "text-red-500" }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "TechCorp",
      content: "Role Rocket helped me find my dream job in just 2 weeks! The matching algorithm is incredible.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "StartupXYZ",
      content: "The application tracking feature saved me so much time. I could see exactly where I stood with each application.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "DesignStudio",
      content: "Finally, a platform that gets it! The interface is gorgeous and actually makes sense for creative minds.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-16 lg:py-24 overflow-hidden">
        {/* Background Elements */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1, rotate: 45 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"
        />
        <Motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1, rotate: -30 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"
        />
        <Motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1, rotate: 60 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 4 }}
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-sky-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left mb-10 lg:mb-0">
              <Motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 role-rocket-gradient"
              >
                Launch Your Career, <br className="hidden sm:inline" />
                <span className="text-emerald-400">Faster.</span>
              </Motion.h1>
              
              <Motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Where career dreams ignite and professional destinies collide - your next adventure starts here. 
                Find your next opportunity or discover your perfect candidate.
              </Motion.p>

              {/* CTA Buttons */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                  onClick={() => navigate("/signup")}
                >
                  <RocketLaunchIcon className="w-6 h-6" />
                  Get Started Free
                </Button>
                <Button 
                  className="bg-transparent border-2 border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
                  onClick={() => navigate("/jobs")}
                >
                  Browse Jobs
                </Button>
              </Motion.div>

              {/* Trending Tags */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap justify-center lg:justify-start gap-2"
              >
                <span className="text-slate-400 text-sm mr-2">Trending:</span>
                {trendingTags.slice(0, 4).map((tag, index) => (
                  <Motion.button
                key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
                onClick={() => navigate(`/jobs?tag=${encodeURIComponent(tag)}`)}
              >
                {tag}
                  </Motion.button>
                ))}
              </Motion.div>
            </div>

            {/* Hero Image/Illustration */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <RocketLaunchIcon className="w-32 h-32 text-emerald-400" />
                </div>
                <Motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center"
                >
                  <StarIcon className="w-8 h-8 text-white" />
                </Motion.div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                <div className="text-slate-300 text-lg">{stat.label}</div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose <span className="role-rocket-gradient">Role Rocket</span>?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We've crafted the ultimate career matchmaking experience - where algorithms meet intuition and connections spark magic.
            </p>
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </Motion.div>
            ))}
          </div>
          </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Explore Categories</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Find opportunities across all industries and specializations
            </p>
          </Motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-700 rounded-xl p-6 text-center hover:bg-slate-600 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/jobs?category=${encodeURIComponent(category.name)}`)}
              >
                <category.icon className={`w-8 h-8 mx-auto mb-3 ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-white font-semibold mb-1">{category.name}</h3>
                <p className="text-slate-400 text-sm">{category.jobs} jobs</p>
              </Motion.div>
            ))}
        </div>
      </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get started in minutes and find your next opportunity
            </p>
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and build your professional profile with your skills, experience, and career goals.",
                icon: UserGroupIcon
              },
              {
                step: "02", 
                title: "Discover Opportunities",
                description: "Our AI matches you with relevant jobs and companies based on your profile and preferences.",
                icon: MagnifyingGlassIcon
              },
              {
                step: "03",
                title: "Apply & Track",
                description: "Apply with one click and track your application progress through our intuitive dashboard.",
                icon: CheckCircleIcon
              }
            ].map((step, index) => (
              <Motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">{step.step}</span>
            </div>
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-emerald-400" />
          </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-slate-300 text-lg">{step.description}</p>
              </Motion.div>
            ))}
            </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">What Our Users Say</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join thousands of professionals who found their dream jobs through Role Rocket
            </p>
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-700 rounded-xl p-6 border border-slate-600"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
            </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-slate-400">{testimonial.role} at {testimonial.company}</div>
          </div>
              </Motion.div>
            ))}
        </div>
      </div>
    </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-purple-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Launch Your Career?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already using Role Rocket to find their next opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => navigate("/signup")}
              >
                Get Started Free
              </Button>
              <Button 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
                onClick={() => navigate("/jobs")}
              >
                Browse Jobs
              </Button>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
}
