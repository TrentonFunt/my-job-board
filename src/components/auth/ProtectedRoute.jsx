import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import Spinner from "../ui/Spinner";

export default function ProtectedRoute({ children, requireEmailVerification = true }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        // User is not authenticated, redirect to auth page
        navigate("/auth");
        return;
      }

      if (requireEmailVerification && !currentUser.emailVerified) {
        // User is authenticated but email is not verified
        navigate("/email-verification");
        return;
      }
    });

    return () => unsubscribe();
  }, [navigate, requireEmailVerification]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Spinner className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth page
  }

  if (requireEmailVerification && !user.emailVerified) {
    return null; // Will redirect to email verification page
  }

  return children;
}
