import { useState } from "react";
import { auth, db } from "../firebase";
import Spinner from "../components/ui/Spinner";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordsMatch = password === confirmPassword;

  const validate = () => {
    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
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
        createdAt: new Date().toISOString(),
      });
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/account"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      <div className="card bg-base-100 shadow-xl border border-base-300 p-4 sm:p-8 mb-4 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-bold text-accent mb-4 sm:mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full mb-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full mb-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 8 chars)"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 top-2 btn btn-xs btn-ghost"
              onClick={() => setShowPassword((show) => !show)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className={`input input-bordered w-full mb-2 ${!passwordsMatch && confirmPassword ? 'input-error' : ''}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          {!passwordsMatch && confirmPassword && (
            <p className="text-error text-sm mb-2">Passwords do not match.</p>
          )}
          <input
            type="text"
            placeholder="Profession (e.g. Software Engineer, Recruiter)"
            className="input input-bordered w-full mb-2 sm:mb-4"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            autoComplete="organization-title"
          />
          <button className="btn btn-accent w-full" type="submit" disabled={loading || !passwordsMatch}>
            {loading ? <Spinner className="w-6 h-6" /> : "Sign Up"}
          </button>
          {error && <p className="text-error text-sm mt-2">{error}</p>}
          {success && <p className="text-success text-sm mt-2">{success}</p>}
        </form>
        <button
          className="btn btn-outline btn-accent w-full mt-2 sm:mt-4"
          type="button"
          onClick={() => navigate('/auth')}
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
}
