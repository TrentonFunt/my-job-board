// Basic role management for admin panel
// Usage: import useUserRole from './useUserRole';
// Returns: { role, loading }
// Example roles: 'admin', 'editor', 'viewer'
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/useAuth";
export default function useUserRole() {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userRole = docSnap.data().role || "user";
          setRole(userRole);
        } else {
          setRole("user");
        }
      } catch {
  setRole("user");
      }
      setLoading(false);
    }
    fetchRole();
  }, [user]);

  return { role, loading: authLoading || loading };
}
