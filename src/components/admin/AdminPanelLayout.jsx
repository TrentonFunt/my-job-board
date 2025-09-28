import { useState } from "react";
import { motion as Motion } from "framer-motion";
import Button from "../ui/Button";
import AdminUserManagement from "./AdminUserManagement";
import AdminJobAnalytics from "./AdminJobAnalytics";
import AdminNotifications from "./AdminNotifications";
import AdminSettings from "./AdminSettings";
import AdminFeedbackSupport from "./AdminFeedbackSupport";
import AdminJobsPanel from "./AdminJobsPanel";

const MENU = [
  { key: "users", label: "User Management" },
  { key: "jobs", label: "Jobs Panel" },
  { key: "analytics", label: "Job Analytics" },
  { key: "notifications", label: "Notifications" },
  { key: "settings", label: "Settings" },
  { key: "feedback", label: "Feedback & Support" },
];

export default function AdminPanelLayout() {
  const [active, setActive] = useState("users");

  return (
    <div className="flex min-h-screen bg-base-100">
      <aside className="w-64 bg-base-100 border-r border-base-300 flex flex-col p-6">
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold role-rocket-gradient text-center">Admin Panel</h1>
        </Motion.div>
        
        <nav className="flex flex-col gap-1">
          {MENU.map((item, index) => (
            <Motion.button
              key={item.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                active === item.key
                  ? "bg-primary text-primary-content border-l-4 border-primary-focus"
                  : "text-base-content/70 hover:text-base-content hover:bg-base-300"
              }`}
              onClick={() => setActive(item.key)}
              type="button"
            >
              {item.label}
            </Motion.button>
          ))}
        </nav>
      </aside>
      
      <main className="flex-1 p-6 overflow-y-auto">
        <Motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {active === "users" && <AdminUserManagement />}
          {active === "jobs" && <AdminJobsPanel />}
          {active === "analytics" && <AdminJobAnalytics />}
          {active === "notifications" && <AdminNotifications />}
          {active === "settings" && <AdminSettings />}
          {active === "feedback" && <AdminFeedbackSupport />}
        </Motion.div>
      </main>
    </div>
  );
}
