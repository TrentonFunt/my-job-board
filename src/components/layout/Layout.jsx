
import Navbar from "./NavBar";
import { Outlet, useLocation, Navigate } from "react-router";
import Footer from "./Footer";
import { useAuth } from "../../context/useAuth";
import BackToTopButton from "../ui/BackToTopButton";

// List of public routes
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

export default function Layout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // If not loading and not authenticated
  if (!loading && !user) {
    // Allow public pages
    if (PUBLIC_PATHS.includes(location.pathname)) {
      return (
        <div className="flex flex-col min-h-screen bg-slate-900">
          <Navbar />
          <main className="flex-1">
            <div className="w-full">
              <Outlet />
            </div>
          </main>
          <Footer />
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
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Navbar />
      <main className="flex-1">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
