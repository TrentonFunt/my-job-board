import { Link } from "react-router";
import Button from "./Button";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function stripHTML(html) {
  return html.replace(/<[^>]+>/g, "");
}

export default function JobCard({ title, company, description, slug }) {
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function checkSaved() {
      if (!user) {
        setSaved(false);
        return;
      }
      const docRef = doc(db, "users", user.uid, "savedJobs", slug);
      const docSnap = await getDoc(docRef);
      setSaved(docSnap.exists());
    }
    checkSaved();
  }, [slug, user]);

  const handleSave = async () => {
    if (!user) {
      alert("Please sign in to save jobs.");
      return;
    }
    const docRef = doc(db, "users", user.uid, "savedJobs", slug);
    if (!saved) {
      await setDoc(docRef, { title, company, description, slug });
      setSaved(true);
    } else {
      await deleteDoc(docRef);
      setSaved(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md p-4 border">
      <h2 className="card-title text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-500 mb-2">{company}</p>
      <p className="text-sm mb-2">
        {stripHTML(description).slice(0, 100)}...
      </p>
      <div className="flex gap-2 mt-2">
        <Link to={`/job/${slug}`}>
          <Button className="btn-sm w-full">View Details</Button>
        </Link>
        <Button
          className={`btn-sm ${saved ? "btn-success" : "btn-outline"}`}
          onClick={handleSave}
        >
          {saved ? "Saved" : "Save"}
        </Button>
      </div>
    </div>
  );
}
