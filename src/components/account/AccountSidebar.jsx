import React from "react";

export default function AccountSidebar({ userData, avatarPreview, activeSection, setActiveSection, open, setOpen }) {
  return (
    <aside className={`w-64 bg-base-100 border-r border-base-300 flex flex-col p-4 min-h-screen fixed top-0 left-0 z-40 transition-transform duration-300 md:relative md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} md:flex md:static md:shadow-none shadow-xl`}>
      {/* Sidebar header: brand name only */}
      <div className="mb-6 md:justify-center flex items-center">
        <div className="text-2xl font-bold text-accent text-center">Role Rocket</div>
      </div>
      <div className="flex flex-col items-center mb-8 mt-2">
        <div className="avatar mb-2 relative flex items-center justify-center">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary text-base-100 flex items-center justify-center text-2xl font-bold">
              <span className="flex items-center justify-center w-full h-full">{userData?.firstName?.[0] || "U"}{userData?.lastName?.[0] || "N"}</span>
            </div>
          )}
          <button
            className="btn btn-xs btn-circle btn-ghost absolute bottom-0 right-0 flex items-center justify-center py-2"
            title="Change Avatar"
            aria-label="Edit Avatar"
            onClick={() => document.getElementById('sidebar-avatar-input')?.click()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z" /></svg>
          </button>
          <input
            type="file"
            accept="image/*"
            id="sidebar-avatar-input"
            className="hidden"
          />
        </div>
        <span className="font-bold text-lg mb-1">{userData?.firstName} {userData?.lastName}</span>
        <span className="text-base-content/70 text-sm">{userData?.email}</span>
      </div>
      <nav className="flex flex-col gap-2 w-full">
        <button
          className={`btn btn-ghost justify-start text-left w-full ${activeSection === "profile" ? "btn-active bg-base-300" : ""}`}
          onClick={() => { setActiveSection("profile"); setOpen(false); }}
          aria-label="Profile"
        >
          Profile
        </button>
        <button
          className={`btn btn-ghost justify-start text-left w-full ${activeSection === "password" ? "btn-active bg-base-300" : ""}`}
          onClick={() => { setActiveSection("password"); setOpen(false); }}
          aria-label="Change Password"
        >
          Change Password
        </button>
        <button
          className={`btn btn-ghost justify-start text-left w-full ${activeSection === "saved" ? "btn-active bg-base-300" : ""}`}
          onClick={() => { setActiveSection("saved"); setOpen(false); }}
          aria-label="Saved Jobs"
        >
          Saved Jobs
        </button>
        <button
          className={`btn btn-ghost justify-start text-left w-full ${activeSection === "settings" ? "btn-active bg-base-300" : ""}`}
          onClick={() => { setActiveSection("settings"); setOpen(false); }}
          aria-label="Settings"
        >
          Settings
        </button>
      </nav>
    </aside>
  );
}
