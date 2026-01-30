import Navbar from "./NavBar";
import { Outlet, useLocation, Navigate } from "react-router";
import Footer from "./Footer";
import { useAuth } from "../../context/useAuth";
import BackToTopButton from "../ui/BackToTopButton";

// List of public routes (accessible without login)
const PUBLIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/auth",
  "/signup",
  "/jobs",
  "/blog",
  "/404"
];

// Pages where footer should be hidden (focused flows & dashboards)
const HIDE_FOOTER_PATHS = [
  "/auth",
  "/signup",
  "/email-verification",
  "/admin",
  "/employer-dashboard",
  "/account"
];

/**
 * Determines if footer should be shown based on current path
 * @param {string} pathname - Current route path
 * @returns {boolean}
 */
function shouldShowFooter(pathname) {
  return !HIDE_FOOTER_PATHS.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
}

export default function Layout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const showFooter = shouldShowFooter(location.pathname);

  // If not loading and not authenticated
  if (!loading && !user) {
    // Allow public pages
    if (PUBLIC_PATHS.includes(location.pathname) || location.pathname.startsWith("/blog/")) {
      return (
        <div className="flex flex-col min-h-screen bg-base-100">
          <Navbar />
          <main className="flex-1">
            <div className="w-full">
              <Outlet />
            </div>
          </main>
          {showFooter && <Footer />}
          <BackToTopButton />
        </div>
      );
    }
    // If trying to access a job detail page, redirect to signup
    if (location.pathname.startsWith("/job/")) {
      return <Navigate to="/signup" replace state={{ from: location }} />;
    }
    // Otherwise, redirect to auth for protected pages
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  // Authenticated or loading
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <main className="flex-1">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
      {showFooter && <Footer />}
      <BackToTopButton />
    </div>
  );
}
