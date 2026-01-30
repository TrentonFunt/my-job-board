import { motion as Motion } from "framer-motion";
import { 
  ChartBarIcon,
  BriefcaseIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

/**
 * Sidebar navigation for Employer Dashboard
 * @param {{ activeTab: string, setActiveTab: Function, sidebarOpen: boolean, setSidebarOpen: Function }} props
 */
export default function EmployerSidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const navItems = [
    { id: "overview", label: "Overview", icon: ChartBarIcon },
    { id: "jobs", label: "My Jobs", icon: BriefcaseIcon },
    { id: "applications", label: "Applications", icon: UserGroupIcon },
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "notifications", label: "Notifications", icon: BellIcon },
    { id: "settings", label: "Settings", icon: Cog6ToothIcon },
    { id: "password", label: "Change Password", icon: BuildingOfficeIcon }
  ];

  return (
    <Motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-base-200 border-r border-base-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-base-300">
        <h2 className="text-xl font-bold text-base-content">Employer Dashboard</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-base-content/60 hover:text-base-content"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-primary text-primary-content"
                  : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </Motion.div>
  );
}
