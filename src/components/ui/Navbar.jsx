import React from "react";
import Button from "./Button";
import { useAuth } from "../../context/useAuth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  console.log('Navbar user:', user, 'loading:', loading);

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-base-100 shadow-lg sticky top-0 z-50 border-b border-base-200">
      <div className="container mx-auto flex items-center py-3 px-4 md:px-8">
        {/* Logo / Name */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-accent tracking-tight">JobBoard</span>
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-base-content font-medium">
          <a href="/" className="hover:text-accent transition-colors duration-150">Home</a>
          <a href="#jobs" className="hover:text-accent transition-colors duration-150">Jobs</a>
          <a href="#about" className="hover:text-accent transition-colors duration-150">About</a>
          <a href="/account" className="hover:text-accent transition-colors duration-150">Account</a>
          {!loading && !user && (
            <a href="/signup" className="hover:text-accent transition-colors duration-150">Sign Up</a>
          )}
          {!loading && user && (
            <button className="btn btn-outline btn-sm" onClick={handleSignOut}>Sign Out</button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <label className="btn btn-ghost btn-circle">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </label>
        </div>
      </div>
      {/* Mobile menu (hidden by default, can be toggled with state if needed) */}
      {/* ...existing code... */}
    </nav>
  );
}
