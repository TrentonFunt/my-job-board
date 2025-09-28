
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router";
import { motion as Motion } from "framer-motion";
import { EyeIcon, EyeSlashIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import Spinner from "../components/ui/Spinner";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if email is verified
      if (!user.emailVerified) {
        navigate("/email-verification");
        return;
      }

      // Get user data to determine user type
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.userType === "employer") {
          navigate("/employer-dashboard");
        } else {
          navigate("/jobs");
        }
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
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
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <RocketLaunchIcon className="w-8 h-8 text-emerald-500" />
              <span className="text-2xl font-bold role-rocket-gradient">Role Rocket</span>
            </div>
          </div>

          {user ? (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-base-content mb-6 text-center">Welcome Back!</h2>
              <div className="text-center mb-6">
                <p className="text-base-content/70 mb-2">Signed in as</p>
                <p className="font-semibold text-emerald-400">{user.email}</p>
              </div>
              <button 
                className="w-full bg-error hover:bg-error-focus text-error-content py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </Motion.div>
          ) : (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-base-content mb-6 text-center">Sign In</h2>
              
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <input
                    type="email"
                    id="auth-email"
                    name="email"
                    placeholder="Email"
                    className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="auth-password"
                    name="password"
                    placeholder="Password"
                    className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 pr-12 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors duration-200"
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-base-content/70">
                    <input type="checkbox" className="mr-2 rounded" />
                    Remember me
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-focus text-primary-content py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? <Spinner className="w-5 h-5" /> : "Sign In"}
                </button>
              </form>

              {/* Forgot Password Link */}
              <div className="mt-4 text-center">
                <button 
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 text-sm"
                >
                  Forgot password?
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-base-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-base-100 text-base-content/60">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button className="w-full bg-base-200 hover:bg-base-300 text-base-content py-3 px-4 rounded-lg font-medium transition-all duration-200 border border-base-300">
                    Google
                  </button>
                  <button className="w-full bg-base-200 hover:bg-base-300 text-base-content py-3 px-4 rounded-lg font-medium transition-all duration-200 border border-base-300">
                    Facebook
                  </button>
                  <button className="w-full bg-base-200 hover:bg-base-300 text-base-content py-3 px-4 rounded-lg font-medium transition-all duration-200 border border-base-300">
                    Apple
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-base-content/70">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200">
                    Sign Up
                  </a>
                </p>
              </div>

              {error && (
                <Motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </Motion.div>
              )}
            </Motion.div>
          )}
        </div>
      </Motion.div>
    </div>
  );
}
