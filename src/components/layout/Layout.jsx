import Navbar from "../ui/Navbar";
import { Outlet, useLocation, Navigate } from "react-router";
import Footer from "./Footer";
import { useAuth } from "../../context/useAuth";

export default function Layout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Only allow access to home if authenticated
  if (
    !loading &&
    !user &&
    location.pathname !== "/account" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/auth"
  ) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
