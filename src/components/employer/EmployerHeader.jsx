import { motion as Motion } from "framer-motion";
import { PlusIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";

/**
 * Header titles and descriptions for each tab
 */
const TAB_CONFIG = {
  overview: { title: "Dashboard Overview", desc: (name) => `Welcome back, ${name}` },
  jobs: { title: "My Jobs", desc: () => "Manage your job postings" },
  applications: { title: "Applications", desc: () => "Review candidate applications" },
  profile: { title: "Company Profile", desc: () => "Manage your company profile" },
  notifications: { title: "Notifications", desc: () => "Configure your notification preferences" },
  settings: { title: "Settings", desc: () => "Account and privacy settings" },
  password: { title: "Change Password", desc: () => "Update your password" }
};

/**
 * Top header bar for Employer Dashboard
 * @param {{ activeTab: string, userName: string, onPostJob: Function, setSidebarOpen: Function }} props
 */
export default function EmployerHeader({ activeTab, userName, onPostJob, setSidebarOpen }) {
  const config = TAB_CONFIG[activeTab] || TAB_CONFIG.overview;

  return (
    <div className="bg-base-200 border-b border-base-300 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-base-content/60 hover:text-base-content p-2 -m-2 touch-manipulation"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-base-content truncate">
                {config.title}
              </h1>
              <p className="text-base-content/70 text-xs sm:text-sm truncate">
                {config.desc(userName)}
              </p>
            </div>
          </div>
          {activeTab === "jobs" && (
            <Motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onPostJob}
                className="btn btn-primary btn-sm sm:btn-md flex items-center gap-2 touch-manipulation"
              >
                <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Post New Job</span>
                <span className="sm:hidden">Post</span>
              </Button>
            </Motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
