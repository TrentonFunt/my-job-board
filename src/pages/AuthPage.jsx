
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
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
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
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
    <div className="max-w-3xl mx-auto p-8">
      <div className="card bg-base-100 shadow-xl border border-base-300 p-8 mb-8">
        <h2 className="text-4xl font-bold text-accent mb-6">Account</h2>
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
              <button className="btn btn-accent w-1/2" onClick={handleSignIn}>
                {loading ? <Spinner className="w-6 h-6" /> : "Sign In"}
              </button>
              <a href="/signup" className="btn btn-outline btn-accent w-1/2 text-center">Sign Up</a>
            </div>
            {error && <p className="text-error text-sm mt-2">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
