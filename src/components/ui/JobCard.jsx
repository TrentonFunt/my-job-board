import { Link } from "react-router";
import Button from "./Button";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { MapPinIcon, CurrencyDollarIcon, TagIcon } from "@heroicons/react/24/outline";

function stripHTML(html) {
  return html.replace(/<[^>]+>/g, "");
}

export default function JobCard({ title, company, description, slug, location, salary, tags = [] }) {
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
    <div className="card bg-base-100 shadow-md p-4 border w-full max-w-lg mx-auto lg:max-w-xl xl:max-w-2xl">
      <h2 className="card-title text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-500 mb-2">{company}</p>
      <div className="flex flex-wrap gap-3 items-center mb-2">
        {location && (
          <span className="flex items-center gap-1 text-xs text-base-content/70">
            <MapPinIcon className="w-4 h-4 text-accent" />
            {location}
          </span>
        )}
        {typeof salary !== 'undefined' && salary !== null && salary !== '' && (
          <span className="flex items-center gap-1 text-xs text-base-content/70">
            <CurrencyDollarIcon className="w-4 h-4 text-accent" />
            {salary}
          </span>
        )}
        {tags && tags.length > 0 && (
          <span className="flex items-center gap-1 text-xs text-base-content/70">
            <TagIcon className="w-4 h-4 text-accent" />
            {tags.slice(0, 2).join(', ')}
            {tags.length > 2 && <span className="ml-1">+{tags.length - 2}</span>}
          </span>
        )}
      </div>
      <p className="text-sm mb-2">
        {stripHTML(description).slice(0, 100)}...
      </p>
      <div className="flex gap-2 mt-2">
        <Link to={`/job/${slug}`} className="flex-1">
          <Button className="btn-sm w-full min-w-[8rem] whitespace-nowrap">View Details</Button>
        </Link>
        <Button
          className={`btn-sm w-full flex-1 min-w-[7rem] whitespace-nowrap ${saved ? "btn-success" : "btn-outline"}`}
          onClick={handleSave}
        >
          {saved ? "Saved" : "Save"}
        </Button>
      </div>
    </div>
  );
}
