import { useEffect, useState } from "react";
import { auth } from "../firebase";
import AuthContext from "./AuthContextInstance";

/**
 * Authentication Provider Component.
 * Wraps the app to provide auth state via context.
 * Listens to Firebase auth state changes and provides user object.
 * 
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 * 
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }) {
  /** @type {[import('firebase/auth').User | null, Function]} */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
