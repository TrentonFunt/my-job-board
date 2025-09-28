import React from "react";
import { motion } from "framer-motion";
import { 
  RocketLaunchIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  ChartBarIcon,
  ShieldCheckIcon,
  HeartIcon,
  LightBulbIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  const features = [
    {
      icon: RocketLaunchIcon,
      title: "Fast & Efficient",
      description: "Lightning-fast searches that actually understand what you're looking for - no more endless scrolling through irrelevant posts."
    },
    {
      icon: UserGroupIcon,
      title: "Community Driven",
      description: "A thriving ecosystem where talent meets opportunity - think LinkedIn, but actually useful and less cringe."
    },
    {
      icon: BuildingOfficeIcon,
      title: "Top Companies",
      description: "From startups that could be the next unicorn to established giants - we've got the companies that actually matter."
    },
    {
      icon: ChartBarIcon,
      title: "Smart Analytics",
      description: "Real-time market intelligence that tells you what you're actually worth - no more guessing games."
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure & Reliable",
      description: "Fort Knox-level security for your career data - because your privacy matters more than their profits."
    },
    {
      icon: GlobeAltIcon,
      title: "Global Reach",
      description: "Your passport to global opportunities - work from Bali, Berlin, or anywhere your wanderlust takes you."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Job Listings" },
    { number: "5,000+", label: "Companies" },
    { number: "50,000+", label: "Job Seekers" },
    { number: "95%", label: "Success Rate" }
  ];

  const values = [
    {
      icon: HeartIcon,
      title: "Passion",
      description: "We're obsessed with creating those 'holy crap, this is perfect' moments between people and their dream careers."
    },
    {
      icon: LightBulbIcon,
      title: "Innovation",
      description: "We're constantly breaking the mold - because the old way of job hunting is broken and we're here to fix it."
    },
    {
      icon: UserGroupIcon,
      title: "Community",
      description: "A tribe of ambitious go-getters who actually want to see each other succeed - no toxic competition, just pure support."
    }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-base-content drop-shadow-lg">About</span>
              <span className="block role-rocket-gradient drop-shadow-lg">Role Rocket</span>
            </h1>
            <p className="text-lg sm:text-xl text-base-content/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              Building Connections, Bridging Opportunities - Your Future Starts Here
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 sm:mb-20"
          >
            <div className="bg-base-200 rounded-2xl p-8 sm:p-12 border border-base-300">
              <div className="text-center mb-8">
                <RocketLaunchIcon className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">Our Mission</h2>
              </div>
              <p className="text-lg sm:text-xl text-base-content/70 text-center max-w-4xl mx-auto leading-relaxed">
                Role Rocket is your career's launchpad - where opportunities meet ambition and dreams take flight. 
                We believe that everyone deserves access to meaningful career opportunities, and we're committed to making 
                the job search process faster, smarter, and more enjoyable.
              </p>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 sm:mb-20"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-base-200 rounded-xl p-6 sm:p-8 border border-base-300 text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-500 mb-2">{stat.number}</div>
                  <div className="text-base-content/70 text-sm sm:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 sm:mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">Why Choose Role Rocket?</h2>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                We've built Role Rocket with job seekers and employers in mind, offering features that make the hiring process seamless and efficient.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-base-200 rounded-xl p-6 sm:p-8 border border-base-300 hover:border-primary/50 transition-all duration-300"
                >
                  <feature.icon className="w-12 h-12 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-semibold text-base-content mb-3">{feature.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Values Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 sm:mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">Our Values</h2>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                These core values guide everything we do at Role Rocket and shape our commitment to our community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-base-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border border-base-300">
                    <value.icon className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-base-content mb-3">{value.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Technology Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 sm:mb-20"
          >
            <div className="bg-base-200 rounded-2xl p-8 sm:p-12 border border-base-300">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">Built with Modern Technology</h2>
                <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                  Built with the tech stack that actually matters - no legacy baggage, just pure performance and developer happiness.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "React", color: "text-blue-400" },
                  { name: "Vite", color: "text-purple-400" },
                  { name: "Tailwind CSS", color: "text-cyan-400" },
                  { name: "Firebase", color: "text-orange-400" },
                  { name: "DaisyUI", color: "text-pink-400" },
                  { name: "Framer Motion", color: "text-green-400" },
                  { name: "Headless UI", color: "text-indigo-400" },
                  { name: "TypeScript", color: "text-blue-300" }
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className={`text-2xl font-bold ${tech.color} mb-2`}>{tech.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-purple-500 rounded-2xl p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-content mb-4">Ready to Launch Your Career?</h2>
              <p className="text-lg text-primary-content/90 mb-8 max-w-2xl mx-auto">
                Join thousands of job seekers who have found their dream jobs through Role Rocket. 
                Start your journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/jobs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
                >
                  Browse Jobs
                </motion.a>
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-primary-content text-primary-content px-8 py-3 rounded-lg font-semibold hover:bg-primary-content hover:text-primary transition-all duration-200"
                >
                  Sign Up Free
                </motion.a>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
