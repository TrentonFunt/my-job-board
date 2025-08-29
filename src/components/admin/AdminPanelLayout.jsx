import { useState } from "react";
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
    <div className="flex min-h-screen bg-base-200">
      <aside className="w-64 bg-base-100 border-r border-base-300 flex flex-col p-4">
        <h1 className="text-2xl font-bold text-accent mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          {MENU.map(item => (
            <button
              key={item.key}
              className={`btn btn-ghost justify-start text-left ${active === item.key ? "btn-active bg-base-300" : ""}`}
              onClick={() => setActive(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 overflow-y-auto">
        {active === "users" && <AdminUserManagement />}
        {active === "jobs" && <AdminJobsPanel />}
        {active === "analytics" && <AdminJobAnalytics />}
        {active === "notifications" && <AdminNotifications />}
        {active === "settings" && <AdminSettings />}
        {active === "feedback" && <AdminFeedbackSupport />}
      </main>
    </div>
  );
}
