import { useState } from "react";
import { auth, db } from "../firebase";
import Spinner from "../components/ui/Spinner";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { motion as Motion } from "framer-motion";
import { 
  EyeIcon, 
  EyeSlashIcon, 
  RocketLaunchIcon,
  UserIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [userType, setUserType] = useState("candidate"); // "candidate" or "employer"
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordsMatch = password === confirmPassword;

  // Password validation rules
  const passwordValidation = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const validate = () => {
    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return "Invalid email format.";
    if (!isPasswordValid) return "Password does not meet security requirements.";
    if (password !== confirmPassword) return "Passwords do not match.";
    if (userType === "employer" && !companyName.trim()) return "Company name is required for employers.";
    return "";
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });
      await setDoc(doc(db, "users", user.uid), {
        email,
        firstName,
        lastName,
        profession,
        userType,
        companyName: userType === "employer" ? companyName : null,
        createdAt: new Date().toISOString(),
      });
      
      // Send email verification
      await sendEmailVerification(user);
      
      setSuccess("Registration successful! Please verify your email.");
      setTimeout(() => {
        navigate("/email-verification");
      }, 1500);
    } catch (err) {
      setError(err.message);
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
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <RocketLaunchIcon className="w-8 h-8 text-emerald-500" />
              <span className="text-2xl font-bold role-rocket-gradient">Role Rocket</span>
            </div>
          </div>

          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-base-content mb-6 text-center">Create Account</h2>
            
            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-base-content/70 mb-3">I am a:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("candidate")}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                    userType === "candidate"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-base-300 bg-base-200 text-base-content/70 hover:border-base-400"
                  }`}
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="font-medium">Job Seeker</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("employer")}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                    userType === "employer"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-base-300 bg-base-200 text-base-content/70 hover:border-base-400"
                  }`}
                >
                  <BuildingOfficeIcon className="w-5 h-5" />
                  <span className="font-medium">Employer</span>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  id="signup-first-name"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                />
                <input
                  type="text"
                  id="signup-last-name"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                />
              </div>
              
              <input
                type="email"
                id="signup-email"
                name="email"
                placeholder="Email"
                className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  name="password"
                  placeholder="Create a strong password"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 pr-12 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors duration-200"
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="text-sm text-base-content/70">Password requirements:</div>
                  <div className="space-y-1 text-sm">
                    <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-success' : 'text-base-content/60'}`}>
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.minLength ? 'bg-success' : 'bg-base-content/30'}`}></div>
                      At least 8 characters
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.hasUppercase ? 'text-success' : 'text-base-content/60'}`}>
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.hasUppercase ? 'bg-success' : 'bg-base-content/30'}`}></div>
                      One uppercase letter
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.hasLowercase ? 'text-success' : 'text-base-content/60'}`}>
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.hasLowercase ? 'bg-success' : 'bg-base-content/30'}`}></div>
                      One lowercase letter
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.hasNumber ? 'text-success' : 'text-base-content/60'}`}>
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.hasNumber ? 'bg-success' : 'bg-base-content/30'}`}></div>
                      One number
                    </div>
                    <div className={`flex items-center gap-2 ${passwordValidation.hasSpecialChar ? 'text-success' : 'text-base-content/60'}`}>
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.hasSpecialChar ? 'bg-success' : 'bg-base-content/30'}`}></div>
                      One special character
                    </div>
                  </div>
                </div>
              )}
              
              <input
                type={showPassword ? "text" : "password"}
                id="signup-confirm-password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`w-full bg-base-200 border rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                  !passwordsMatch && confirmPassword ? 'border-error' : 'border-base-300'
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              
              {!passwordsMatch && confirmPassword && (
                <p className="text-red-400 text-sm">Passwords do not match.</p>
              )}
              
              {userType === "employer" ? (
                <input
                  type="text"
                  id="signup-company-name"
                  name="companyName"
                  placeholder="Company Name"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  autoComplete="organization"
                />
              ) : (
                <input
                  type="text"
                  id="signup-profession"
                  name="profession"
                  placeholder="Profession (e.g. Software Engineer, Designer)"
                  className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  autoComplete="organization-title"
                />
              )}

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-focus text-primary-content py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
                disabled={loading || !passwordsMatch || !isPasswordValid}
              >
                {loading ? <Spinner className="w-5 h-5" /> : "Sign Up"}
              </button>
            </form>

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
                Already have an account?{" "}
                <button
                  onClick={() => navigate('/auth')}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200"
                >
                  Sign In
                </button>
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

            {success && (
              <Motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
              >
                <p className="text-emerald-400 font-medium mb-2">Registration Successful!</p>
                <p className="text-base-content/70 text-sm">{success}</p>
                <p className="text-base-content/60 text-xs mt-2">Check your email inbox and spam folder for the verification link.</p>
              </Motion.div>
            )}
          </Motion.div>
        </div>
      </Motion.div>
    </div>
  );
}
