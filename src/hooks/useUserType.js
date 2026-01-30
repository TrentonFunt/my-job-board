import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

/**
 * Custom hook to get the current user's type and profile data.
 * Listens to auth state changes and fetches user document from Firestore.
 * 
 * @returns {{ userType: 'candidate' | 'employer' | null, userData: Object | null, loading: boolean }}
 * 
 * @example
 * const { userType, userData, loading } = useUserType();
 * if (loading) return <Spinner />;
 * if (userType === 'employer') return <EmployerDashboard data={userData} />;
 */
export default function useUserType() {
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserType(data.userType || "candidate");
            setUserData(data);
          } else {
            setUserType("candidate");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserType("candidate");
          setUserData(null);
        }
      } else {
        setUserType(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { userType, userData, loading };
}
