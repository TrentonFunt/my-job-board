import { useAuth } from "../context/useAuth";
import useUserRole from "../components/admin/useUserRole";
import AdminPanelLayout from "../components/admin/AdminPanelLayout";
import { Navigate } from "react-router";

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();

  if (authLoading || roleLoading) return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card bg-base-100 shadow-xl p-8 border border-accent animate-pulse">
        <span className="loading loading-spinner loading-lg text-accent"></span>
        <p className="mt-4 text-base-content/70">Loading admin panel...</p>
      </div>
    </div>
  );
  if (!user || role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-200">
        <div className="card bg-base-100 shadow-xl p-8 border border-error">
          <h2 className="text-2xl font-bold text-error mb-4">Access Denied</h2>
          <p className="mb-2 text-base-content/80">You must be signed in as an admin to view this page.</p>
          <p className="mb-2 text-base-content/70">Current user: <span className="font-semibold">{user ? user.email : "None"}</span></p>
          <p className="mb-2 text-base-content/70">Detected role: <span className="font-semibold">{role || "None"}</span></p>
          <a href="/auth" className="btn btn-primary mt-4">Sign In</a>
        </div>
      </div>
    );
  }

  return <AdminPanelLayout />;
}
