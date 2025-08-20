import Button from "../ui/Button";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-base-100 shadow-lg sticky top-0 z-50 border-b border-base-200">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-8">
        {/* Logo / Name */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-accent tracking-tight">JobBoard</span>
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-base-content font-medium">
          <a href="/" className="hover:text-accent transition-colors duration-150">Home</a>
          <a href="#about" className="hover:text-accent transition-colors duration-150">About</a>
        </div>

        {/* Account Link */}
        <div className="flex gap-2">
          <Link to="/account" className="btn btn-accent btn-sm">Account</Link>
          <Link to="/signup" className="btn btn-outline btn-sm">Sign Up</Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <label htmlFor="navbar-menu" className="btn btn-ghost btn-circle">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </label>
        </div>
      </div>
      {/* Mobile menu (hidden by default, can be toggled with state if needed) */}
      {/* <div className="md:hidden px-4 pb-4">
        <div className="flex flex-col gap-4">
          <a href="/" className="hover:text-accent">Home</a>
          <a href="#jobs" className="hover:text-accent">Jobs</a>
          <a href="#about" className="hover:text-accent">About</a>
          <Button className="btn-outline btn-sm w-full">Login</Button>
          <Button className="btn-accent btn-sm w-full">Sign Up</Button>
        </div>
      </div> */}
    </nav>
  );
}
