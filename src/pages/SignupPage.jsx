import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
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
      await setDoc(doc(db, "users", user.uid), {
        email,
        firstName,
        lastName,
        role,
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
    <div className="max-w-md mx-auto mt-10 card bg-base-100 p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="First Name"
          className="input input-bordered w-full mb-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input input-bordered w-full mb-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (min 8 chars)"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
        />
        {!passwordsMatch && confirmPassword && (
          <p className="text-error text-sm mb-2">Passwords do not match.</p>
        )}
        <input
          type="text"
          placeholder="Role (e.g. Job Seeker, Recruiter)"
          className="input input-bordered w-full mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button className="btn btn-accent w-full" type="submit" disabled={loading || !passwordsMatch}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        {error && <p className="text-error text-sm mt-2">{error}</p>}
        {success && <p className="text-success text-sm mt-2">{success}</p>}
      </form>
      <button
        className="btn btn-outline w-full mt-4"
        type="button"
        onClick={() => navigate('/auth')}
      >
        Already have an account? Sign In
      </button>
    </div>
  );
}
