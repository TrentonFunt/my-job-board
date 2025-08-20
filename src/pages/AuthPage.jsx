
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="max-w-md mx-auto mt-10 card bg-base-100 p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Account</h2>
      {user ? (
        <div>
          <p className="mb-4">Signed in as <span className="font-bold">{user.email}</span></p>
          <button className="btn btn-error w-full" onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <form>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
          <div className="flex gap-2 mb-2">
            <button className="btn btn-primary w-1/2" onClick={handleSignIn}>Sign In</button>
            <a href="/signup" className="btn btn-outline w-1/2 text-center">Sign Up</a>
          </div>
          {error && <p className="text-error text-sm mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
}
