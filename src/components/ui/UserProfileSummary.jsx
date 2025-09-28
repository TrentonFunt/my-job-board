import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function UserProfileSummary() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <div className="card-modern mb-8 flex items-center justify-center p-6 gap-4">
      <div className="avatar placeholder">
        <div className="bg-gradient-to-br from-emerald-500 to-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold text-center">
          <span className="w-full text-center block">{user.displayName ? user.displayName[0] : user.email[0]}</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="font-bold text-xl text-emerald-400">Welcome, {user.displayName ? user.displayName : user.email}!</div>
        <div className="text-slate-300 text-sm">Glad to see you back. Explore new jobs below!</div>
      </div>
    </div>
  );
}
