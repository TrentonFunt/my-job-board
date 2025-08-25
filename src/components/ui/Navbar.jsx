import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { useAuth } from "../../context/useAuth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router";

export default function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="navbar w-full bg-base-100 shadow-lg sticky top-0 z-50 border-b border-base-200">
      <div className="container mx-auto flex items-center justify-between py-3 px-2 sm:px-4 md:px-8">
        {/* Logo / Name */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-accent tracking-tight">JobBoard</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="btn btn-ghost rounded-btn text-base font-medium">Home</Link>
          <Link to="#about" className="btn btn-ghost rounded-btn text-base font-medium">About</Link>
          <Link to="/account" className="btn btn-ghost rounded-btn text-base font-medium">Account</Link>
          {!user && (
            <Link to="/signup" className="btn btn-primary rounded-btn text-base font-semibold ml-2">Sign Up</Link>
          )}
          {!loading && user && (
            <button className="btn btn-outline btn-error rounded-btn text-base font-semibold ml-2" onClick={handleSignOut}>Sign Out</button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="btn btn-ghost btn-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-base-100 border border-base-200 rounded-box shadow-lg focus:outline-none z-50 p-2">
              <div className="py-2 flex flex-col gap-1">
                <MenuItem>
                  {({ focus }) => (
                    <Link to="/" className={`btn btn-ghost w-full justify-start ${focus ? 'bg-base-200' : ''}`}>Home</Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <Link to="#about" className={`btn btn-ghost w-full justify-start ${focus ? 'bg-base-200' : ''}`}>About</Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <Link to="/account" className={`btn btn-ghost w-full justify-start ${focus ? 'bg-base-200' : ''}`}>Account</Link>
                  )}
                </MenuItem>
                {!user && (
                  <MenuItem>
                    {({ focus }) => (
                      <Link to="/signup" className={`btn btn-primary w-full justify-start ${focus ? 'bg-primary/80' : ''}`}>Sign Up</Link>
                    )}
                  </MenuItem>
                )}
                {!loading && user && (
                  <MenuItem>
                    {({ focus }) => (
                      <button className={`btn btn-outline btn-error w-full justify-start px-3 py-2 ${focus ? 'bg-error/10' : ''}`} onClick={handleSignOut}>Sign Out</button>
                    )}
                  </MenuItem>
                )}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
