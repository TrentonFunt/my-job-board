import { useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminSettings() {
  const [branding, setBranding] = useState("");
  const [featuredTags, setFeaturedTags] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSave = async () => {
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await setDoc(doc(db, "settings", "site"), {
        branding,
        featuredTags: featuredTags.split(",").map(t => t.trim()).filter(Boolean),
      });
      setSuccess("Settings saved!");
    } catch {
      setError("Error saving settings.");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Site Settings</h2>
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Branding (site name, logo URL, etc.)"
          value={branding}
          onChange={e => setBranding(e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered"
          placeholder="Featured Tags (comma separated)"
          value={featuredTags}
          onChange={e => setFeaturedTags(e.target.value)}
        />
        <button className="btn btn-primary w-full rounded" type="submit" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-xs"></span> : "Save"}
        </button>
        {success && <div className="alert alert-success mt-2">{success}</div>}
        {error && <div className="alert alert-error mt-2">{error}</div>}
      </form>
      {/* Headless UI Dialog for save confirmation */}
      <Transition show={showConfirm} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowConfirm(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="card bg-base-100 shadow-xl max-w-md w-full p-6">
                <Dialog.Title className="text-lg font-bold mb-2">Confirm Save</Dialog.Title>
                <p className="mb-4">Are you sure you want to save these settings?</p>
                <div className="flex gap-2 justify-end">
                  <button className="btn btn-ghost rounded" type="button" onClick={() => setShowConfirm(false)} disabled={loading}>Cancel</button>
                  <button className="btn btn-primary rounded" type="button" onClick={confirmSave} disabled={loading}>
                    {loading ? <span className="loading loading-spinner loading-xs"></span> : "Save"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
