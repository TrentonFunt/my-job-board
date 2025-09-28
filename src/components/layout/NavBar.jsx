import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { useAuth } from "../../context/useAuth";
import useAdminStatus from "../../hooks/useAdminStatus";
import useUserType from "../../hooks/useUserType";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Link, useLocation } from "react-router";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon, 
  ChevronDownIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user, loading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminStatus();
  const { userType } = useUserType();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <Motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="navbar w-full bg-base-100/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-base-300"
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-2 sm:px-4 md:px-8">
        {/* Logo / Name and sidebar toggle */}
        <div className="flex items-center gap-2 h-12">
          {/* Sidebar toggle only on /account and mobile */}
          {location.pathname === "/account" && (
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden btn btn-ghost btn-circle flex items-center justify-center h-12"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              onClick={() => setSidebarOpen((prev) => !prev)}
              style={{ alignSelf: 'center' }}
            >
              <AnimatePresence mode="wait">
                {sidebarOpen ? (
                  <Motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </Motion.div>
                ) : (
                  <Motion.div
                    key="open"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </Motion.div>
                )}
              </AnimatePresence>
            </Motion.button>
          )}
          <Motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={user ? "/jobs" : "/"}
              className="flex items-center h-12"
              onClick={e => {
                if (!user && location.pathname === "/auth") {
                  e.preventDefault();
                  navigate("/");
                }
              }}
            >
              <span className="text-2xl font-bold tracking-tight flex items-center h-12 role-rocket-gradient">
                Role Rocket
              </span>
            </Link>
          </Motion.div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {/* Public Navigation Links */}
          {[
            { to: "/jobs", label: "Jobs" },
            { to: "/blog", label: "Blog" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" }
          ].map((link, index) => (
            <Motion.div
              key={link.to}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link 
                to={link.to} 
                className="btn btn-ghost rounded-btn text-base font-medium hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-200"
              >
                {link.label}
              </Link>
            </Motion.div>
          ))}
          
          {/* Theme Toggle */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <ThemeToggle />
          </Motion.div>
          
          {/* Sign Up Button for non-authenticated users */}
          {!user && (
            <Motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Link to="/signup" className="btn btn-primary rounded-btn text-base font-semibold ml-2 transition-all duration-200">
                Sign Up
              </Link>
            </Motion.div>
          )}
          
          {/* User Dropdown for authenticated users */}
          {!loading && user && (
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 bg-base-200 hover:bg-base-300 text-base-content px-4 py-2 rounded-lg transition-all duration-200 border border-base-300 hover:border-primary/50">
                <UserCircleIcon className="w-5 h-5" />
                <span className="font-medium">{user.displayName || user.email?.split('@')[0] || 'User'}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </MenuButton>
              
              <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-base-100 border border-base-300 rounded-lg shadow-xl focus:outline-none z-50">
                <div className="py-2">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-base-300">
                    <p className="text-sm font-medium text-base-content">{user.displayName || 'User'}</p>
                    <p className="text-sm text-base-content/60">{user.email}</p>
                  </div>
                  
                  {/* Menu Items */}
                  <MenuItem>
                    {({ focus }) => (
                      <Link 
                        to={userType === "employer" ? "/employer-dashboard" : "/account"} 
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 ${
                          focus ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:text-base-content'
                        }`}
                      >
                        <Cog6ToothIcon className="w-5 h-5" />
                        {userType === "employer" ? "Employer Dashboard" : "Account Settings"}
                      </Link>
                    )}
                  </MenuItem>
                  
                  {isAdmin && !adminLoading && (
                    <MenuItem>
                      {({ focus }) => (
                        <Link 
                          to="/admin" 
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 ${
                            focus ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:text-base-content'
                          }`}
                        >
                          <ShieldCheckIcon className="w-5 h-5" />
                          Admin Panel
                        </Link>
                      )}
                    </MenuItem>
                  )}
                  
                  <div className="border-t border-base-300 my-1"></div>
                  
                  <MenuItem>
                    {({ focus }) => (
                      <button 
                        onClick={handleSignOut}
                        className={`flex items-center gap-3 px-4 py-3 text-sm w-full text-left transition-colors duration-200 ${
                          focus ? 'bg-error/10 text-error' : 'text-base-content/70 hover:text-error'
                        }`}
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        Sign Out
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center h-12">
          <Menu as="div" className="relative text-left h-12 flex items-center">
            <MenuButton className="btn btn-ghost btn-circle flex items-center justify-center h-12">
              <Motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bars3Icon className="w-6 h-6" />
              </Motion.div>
            </MenuButton>
            <MenuItems className="fixed top-6 right-2 w-64 origin-top-right bg-base-100/95 backdrop-blur-md border border-base-300 rounded-lg shadow-xl focus:outline-none z-[60] p-2 max-h-[70vh] overflow-auto overscroll-contain">
              <Motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="py-2 flex flex-col gap-1"
              >
                {/* Public Navigation Links */}
                {[
                  { to: "/jobs", label: "Jobs" },
                  { to: "/blog", label: "Blog" },
                  { to: "/about", label: "About" },
                  { to: "/contact", label: "Contact" }
                ].map((link, index) => (
                  <MenuItem key={link.to}>
                    {({ focus }) => (
                      <Motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link 
                          to={link.to} 
                          className={`btn btn-ghost w-full justify-start text-base-content/70 hover:text-base-content transition-all duration-200 ${focus ? 'bg-primary/10 text-primary' : ''}`}
                        >
                          {link.label}
                        </Link>
                      </Motion.div>
                    )}
                  </MenuItem>
                ))}
                
                {/* User Section */}
                {!loading && user && (
                  <>
                    <div className="border-t border-base-300 my-2"></div>
                    
                    {/* User Info */}
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-base-content">{user.displayName || 'User'}</p>
                      <p className="text-xs text-base-content/60">{user.email}</p>
                    </div>
                    
                    {/* User Menu Items */}
                    <MenuItem>
                      {({ focus }) => (
                        <Motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Link 
                            to={userType === "employer" ? "/employer-dashboard" : "/account"} 
                            className={`flex items-center gap-3 w-full px-3 py-2 text-sm text-base-content/70 hover:text-base-content transition-all duration-200 ${focus ? 'bg-primary/10 text-primary' : ''}`}
                          >
                            <Cog6ToothIcon className="w-5 h-5" />
                            {userType === "employer" ? "Employer Dashboard" : "Account Settings"}
                          </Link>
                        </Motion.div>
                      )}
                    </MenuItem>
                    
                    {isAdmin && !adminLoading && (
                      <MenuItem>
                        {({ focus }) => (
                          <Motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 }}
                          >
                            <Link 
                              to="/admin" 
                              className={`flex items-center gap-3 w-full px-3 py-2 text-sm text-base-content/70 hover:text-base-content transition-all duration-200 ${focus ? 'bg-primary/10 text-primary' : ''}`}
                            >
                              <ShieldCheckIcon className="w-5 h-5" />
                              Admin Panel
                            </Link>
                          </Motion.div>
                        )}
                      </MenuItem>
                    )}
                    
                    <div className="border-t border-base-300 my-2"></div>
                    
                    <MenuItem>
                      {({ focus }) => (
                        <Motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <button 
                            className={`flex items-center gap-3 w-full px-3 py-2 text-sm text-base-content/70 hover:text-error transition-all duration-200 ${focus ? 'bg-error/10 text-error' : ''}`} 
                            onClick={handleSignOut}
                          >
                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                            Sign Out
                          </button>
                        </Motion.div>
                      )}
                    </MenuItem>
                  </>
                )}
                
                {/* Sign Up for non-authenticated users */}
                {!user && (
                  <MenuItem>
                    {({ focus }) => (
                      <Motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link 
                          to="/signup" 
                          className={`btn btn-primary w-full justify-start transition-all duration-200 ${focus ? 'bg-primary-focus' : ''}`}
                        >
                          Sign Up
                        </Link>
                      </Motion.div>
                    )}
                  </MenuItem>
                )}
              </Motion.div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </Motion.nav>
  );
}
