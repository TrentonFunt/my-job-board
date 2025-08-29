import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";

export default function AdminNotifications() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setNotifications(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchNotifications();
  }, [success]);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await addDoc(collection(db, "notifications"), {
        message,
        createdAt: new Date().toISOString(),
      });
      setSuccess("Notification sent to all users!");
      setMessage("");
    } catch {
      setError("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 mb-8 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Send Notification</h2>
      <form onSubmit={handleSend} className="flex flex-col gap-4">
        <textarea
          className="textarea textarea-bordered"
          placeholder="Type your announcement or update here..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        />
        <button className="btn btn-primary w-full rounded" type="submit" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-xs"></span> : "Send"}
        </button>
        {success && <div className="alert alert-success mt-2">{success}</div>}
        {error && <div className="alert alert-error mt-2">{error}</div>}
      </form>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Sent Notifications</h3>
        {notifications.length === 0 ? (
          <div className="alert alert-info">No notifications sent yet.</div>
        ) : (
          <ul className="divide-y divide-base-300">
            {notifications.map(n => (
              <li key={n.id} className="py-3">
                <div className="flex justify-between items-center">
                  <span>{n.message}</span>
                  <span className="text-xs text-base-content/60">{n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
