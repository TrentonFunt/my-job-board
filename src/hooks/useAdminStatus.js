import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

/**
 * Custom hook to check if the current user has admin privileges.
 * Listens to auth state changes and fetches user role from Firestore.
 * 
 * @returns {{ isAdmin: boolean, loading: boolean }}
 * 
 * @example
 * const { isAdmin, loading } = useAdminStatus();
 * if (loading) return <Spinner />;
 * if (!isAdmin) return <Navigate to="/" />;
 */
export default function useAdminStatus() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setIsAdmin(userDoc.exists() && userDoc.data().isAdmin === true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { isAdmin, loading };
}
