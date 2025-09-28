import React from "react";
import { motion as Motion } from "framer-motion";

export default function AccountSidebar({ userData, avatarPreview, activeSection, setActiveSection, open, setOpen }) {
  const getInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    return "TA"; // Default initials as shown in Figma
  };

  return (
    <aside className={`w-64 bg-base-100 border-r border-base-300 flex flex-col p-6 min-h-screen fixed top-0 left-0 z-40 transition-transform duration-300 md:relative md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} md:flex md:static md:shadow-none shadow-xl`}>
      {/* Sidebar header: Role Rocket logo */}
      <div className="mb-8 flex items-center justify-center">
        <div className="text-2xl font-bold role-rocket-gradient text-center">Account Settings</div>
      </div>
      
      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="avatar mb-4 relative flex items-center justify-center">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold">
              <span className="flex items-center justify-center w-full h-full">{getInitials()}</span>
            </div>
          )}
        </div>
        <h3 className="font-bold text-lg text-base-content mb-1 text-center">
          {userData?.firstName && userData?.lastName 
            ? `${userData.firstName} ${userData.lastName}` 
            : "Tiwalade Adedeji"}
        </h3>
        <p className="text-base-content/70 text-sm text-center">
          {userData?.email || "ddejilade22@gmail.com"}
        </p>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-col gap-1 w-full">
        {[
          { id: "profile", label: "Profile" },
          { id: "password", label: "Change Password" },
          { id: "saved", label: "Saved Jobs" },
          { id: "applications", label: "Application Tracker" },
          { id: "notifications", label: "Notifications" },
          { id: "settings", label: "Settings" }
        ].map((item, index) => (
          <Motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === item.id
                ? "bg-primary text-primary-content border-l-4 border-primary-focus"
                : "text-base-content/70 hover:text-base-content hover:bg-base-300"
            }`}
            onClick={() => { setActiveSection(item.id); setOpen(false); }}
            aria-label={item.label}
            type="button"
          >
            {item.label}
          </Motion.button>
        ))}
      </nav>
    </aside>
  );
}
