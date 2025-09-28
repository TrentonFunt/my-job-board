import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router";
import { 
  ArrowLeftIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      console.log("Sending password reset email to:", email);
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
      setMessage("Password reset email sent! Check your inbox and spam folder. If you don't see it within 5 minutes, please try again.");
      setEmailSent(true);
    } catch (err) {
      console.error("Error sending password reset email:", err);
      
      // Handle specific Firebase errors
      let errorMessage = err.message;
      if (err.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email address. Please check your email or sign up for a new account.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = "Too many requests. Please wait a few minutes before trying again.";
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your internet connection and try again.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card-modern p-8">
          {/* Back Button */}
          <Link 
            to="/auth"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Sign In
          </Link>

          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-base-content mb-2">Forgot Password?</h2>
            <p className="text-base-content/70 mb-6">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/60" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-base-200 border border-base-300 rounded-lg pl-12 pr-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-focus text-primary-content py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
              >
                {loading ? <Spinner className="w-5 h-5" /> : "Send Reset Link"}
              </Button>
            </form>

            {/* Success Message */}
            {message && (
              <Motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-emerald-400 font-medium">Email sent successfully!</p>
                    <p className="text-base-content/70 text-sm mt-1">{message}</p>
                  </div>
                </div>
                
                {emailSent && (
                  <div className="mt-3 pt-3 border-t border-emerald-500/20">
                    <p className="text-base-content/70 text-sm mb-2">Still didn't receive the email?</p>
                    <div className="space-y-2 text-xs text-base-content/60">
                      <p>• Check your spam/junk folder</p>
                      <p>• Make sure you used the correct email address</p>
                      <p>• Wait a few minutes for delivery</p>
                      <p>• Try resending the email</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEmailSent(false);
                        setMessage("");
                        setError("");
                      }}
                      className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors duration-200"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </Motion.div>
            )}

            {/* Error Message */}
            {error && (
              <Motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
              >
                <ExclamationTriangleIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium">Error</p>
                  <p className="text-base-content/70 text-sm mt-1">{error}</p>
                </div>
              </Motion.div>
            )}

            <div className="mt-6 text-center">
              <p className="text-base-content/70">
                Remember your password?{" "}
                <Link 
                  to="/auth" 
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Motion.div>
        </div>
      </Motion.div>
    </div>
  );
}
