import React from "react";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";

export default function UserProfileSummary() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <div className="card bg-base-200 shadow mb-6 flex items-center justify-center p-4 gap-4">
      <div className="avatar placeholder">
        <div className="bg-primary text-base-100 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
          {user.displayName ? user.displayName[0] : user.email[0]}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
  <div className="font-bold text-lg text-accent">Welcome, {user.displayName ? user.displayName : user.email}!</div>
        <div className="text-base-content/70 text-sm">Glad to see you back. Explore new jobs below!</div>
      </div>
    </div>
  );
}
