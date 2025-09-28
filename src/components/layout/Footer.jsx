import { Link } from "react-router";
import { motion as Motion } from "framer-motion";
import { 
  RocketLaunchIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact" },
        { to: "/careers", label: "Careers" },
        { to: "/blog", label: "Blog" }
      ]
    },
    {
      title: "For Job Seekers",
      links: [
        { to: "/jobs", label: "Browse Jobs" },
        { to: "/signup", label: "Create Account" },
        { to: "/account", label: "My Account" },
        { to: "/help", label: "Help Center" }
      ]
    },
    {
      title: "For Employers",
      links: [
        { to: "/employers", label: "Post Jobs" },
        { to: "/pricing", label: "Pricing" },
        { to: "/solutions", label: "Solutions" },
        { to: "/recruiters", label: "For Recruiters" }
      ]
    },
    {
      title: "Resources",
      links: [
        { to: "/privacy", label: "Privacy Policy" },
        { to: "/terms", label: "Terms of Service" },
        { to: "/cookies", label: "Cookie Policy" },
        { to: "/accessibility", label: "Accessibility" }
      ]
    }
  ];

  const socialLinks = [
    {
      name: "Twitter",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.19 8.19 0 01-2.357.637A4.118 4.118 0 0021.448 4.1a8.224 8.224 0 01-2.605.98A4.107 4.107 0 0016.616 3c-2.266 0-4.104 1.823-4.104 4.07 0 .32.036.634.106.934C8.728 7.87 5.8 6.1 3.67 3.149a4.025 4.025 0 00-.555 2.048c0 1.413.724 2.662 1.825 3.393A4.093 4.093 0 012.8 7.15v.051c0 1.974 1.41 3.624 3.292 4.001a4.1 4.1 0 01-1.085.144c-.265 0-.522-.026-.772-.075.523 1.623 2.037 2.805 3.833 2.836A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.601 2.002 3.601 4.604v5.592z"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-base-100 text-base-content">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <RocketLaunchIcon className="w-8 h-8 text-emerald-400" />
                <span className="text-2xl font-bold role-rocket-gradient">Role Rocket</span>
              </div>
              <p className="text-base-content/70 mb-6 max-w-md leading-relaxed">
                Where career trajectories launch and professional dreams become reality. 
                Find your next opportunity or discover your perfect candidate.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-base-content/70">
                  <EnvelopeIcon className="w-5 h-5 text-emerald-400" />
                  <span>hello@rolerocket.com</span>
                </div>
                <div className="flex items-center gap-3 text-base-content/70">
                  <PhoneIcon className="w-5 h-5 text-emerald-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-base-content/70">
                  <MapPinIcon className="w-5 h-5 text-emerald-400" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <Motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-base-200 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-200 group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-base-content/60 group-hover:text-primary-content transition-colors duration-200" />
                  </Motion.a>
                ))}
              </div>
            </Motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <Motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-base-content mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <Motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </Motion.li>
                ))}
              </ul>
            </Motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-xl font-semibold text-base-content mb-2">Stay Updated</h3>
            <p className="text-base-content/70 mb-6">Get the latest job opportunities and career tips delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-base-200 border border-base-300 rounded-lg text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="bg-primary hover:bg-primary-focus text-primary-content px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                Subscribe
              </button>
            </div>
          </Motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div className="text-base-content/60 text-sm">
              &copy; {currentYear} <span className="font-semibold text-primary">Role Rocket</span>. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-base-content/60 hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-base-content/60 hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-base-content/60 hover:text-primary transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </Motion.div>
        </div>
      </div>
    </footer>
  );
}
