import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import RecentSearchesSidebar from "./RecentSearchesSidebar";

export default function RecentSearchesSidebarContainer() {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setSearches([]);
        setLoading(false);
        return;
      }
      try {
        const searchesRef = collection(db, "users", user.uid, "recentSearches");
        const q = query(searchesRef, orderBy("timestamp", "desc"), limit(10));
        const snapshot = await getDocs(q);
        setSearches(snapshot.docs.map(doc => doc.data().term));
      } catch {
        setSearches([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return <RecentSearchesSidebar searches={searches} loading={loading} />;
}
