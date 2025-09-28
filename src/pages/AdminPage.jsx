import { useAuth } from "../context/useAuth";
import { motion as Motion } from "framer-motion";
import Button from "../components/ui/Button";
import useUserRole from "../components/admin/useUserRole";
import AdminPanelLayout from "../components/admin/AdminPanelLayout";
import { Navigate } from "react-router";

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();

  if (authLoading || roleLoading) return (
    <div className="flex justify-center items-center h-screen bg-base-100">
      <Motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-base-200 rounded-lg p-8 border border-base-300 shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-base-content/70">Loading admin panel...</p>
        </div>
      </Motion.div>
    </div>
  );
  
  if (!user || role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-base-100">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-base-200 rounded-lg p-8 border border-error/30 shadow-xl max-w-md w-full mx-4"
        >
          <h2 className="text-2xl font-bold text-error mb-4">Access Denied</h2>
          <p className="mb-2 text-base-content/70">You must be signed in as an admin to view this page.</p>
          <p className="mb-2 text-base-content/60">Current user: <span className="font-semibold text-base-content">{user ? user.email : "None"}</span></p>
          <p className="mb-2 text-base-content/60">Detected role: <span className="font-semibold text-base-content">{role || "None"}</span></p>
          <Button as="a" href="/auth" className="bg-emerald-500 hover:bg-emerald-600 text-white mt-4 w-full">Sign In</Button>
        </Motion.div>
      </div>
    );
  }

  return <AdminPanelLayout />;
}
