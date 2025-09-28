import React, { useState, useEffect, useCallback } from "react";
import { motion as Motion } from "framer-motion";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { 
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

export default function EmailVerificationPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const redirectToDashboard = useCallback(async (currentUser) => {
    try {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.userType === "employer") {
          navigate("/employer-dashboard");
        } else {
          navigate("/account");
        }
      } else {
        navigate("/account");
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      navigate("/account");
    }
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser && currentUser.emailVerified) {
        // User is already verified, redirect to appropriate dashboard
        redirectToDashboard(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate, redirectToDashboard]);

  const handleResendVerification = async () => {
    if (!user) return;
    
    setError("");
    setMessage("");
    setSending(true);

    try {
      await sendEmailVerification(user);
      setMessage("Verification email sent! Please check your inbox and spam folder.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const handleCheckVerification = () => {
    if (user) {
      user.reload().then(() => {
        if (user.emailVerified) {
          redirectToDashboard(user);
        } else {
          setError("Email not verified yet. Please check your inbox and click the verification link.");
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <Spinner className="w-8 h-8 text-emerald-500" />
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card-modern p-8 text-center">
          <Motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <EnvelopeIcon className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-base-content mb-2">Verify Your Email</h2>
            <p className="text-base-content/70">
              We've sent a verification link to:
            </p>
            <p className="text-emerald-400 font-medium mt-1">{user.email}</p>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="bg-base-200 rounded-lg p-4 border border-base-300">
              <h3 className="text-base-content font-medium mb-2">Next Steps:</h3>
              <ol className="text-base-content/70 text-sm space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-content rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  Check your email inbox
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-content rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  Click the verification link in the email
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-content rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  Return here and click "I've Verified"
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleCheckVerification}
                className="w-full bg-primary hover:bg-primary-focus text-primary-content py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <CheckCircleIcon className="w-5 h-5" />
                I've Verified My Email
              </Button>

              <Button
                onClick={handleResendVerification}
                disabled={sending}
                className="w-full bg-base-200 hover:bg-base-300 text-base-content py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                {sending ? <Spinner className="w-5 h-5" /> : <EnvelopeIcon className="w-5 h-5" />}
                {sending ? "Sending..." : "Resend Verification Email"}
              </Button>
            </div>

            {/* Success Message */}
            {message && (
              <Motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-3"
              >
                <CheckCircleIcon className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-400 font-medium">Email sent!</p>
                  <p className="text-base-content/70 text-sm mt-1">{message}</p>
                </div>
              </Motion.div>
            )}

            {/* Error Message */}
            {error && (
              <Motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
              >
                <ExclamationTriangleIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium">Error</p>
                  <p className="text-base-content/70 text-sm mt-1">{error}</p>
                </div>
              </Motion.div>
            )}

            <div className="pt-4 border-t border-base-300">
              <p className="text-base-content/60 text-sm">
                Didn't receive the email? Check your spam folder or try resending.
              </p>
            </div>
          </Motion.div>
        </div>
      </Motion.div>
    </div>
  );
}
