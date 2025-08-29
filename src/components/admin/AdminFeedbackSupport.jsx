import { DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminFeedbackSupport() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchFeedback() {
      setLoading(true);
      // For demo: feedback collection
      const feedbackCol = collection(db, "feedback");
      const feedbackSnap = await getDocs(feedbackCol);
      setFeedback(feedbackSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchFeedback();
  }, [success]);

  const handleRespond = async () => {
    if (!selectedFeedback) return;
    // For demo: just show success
    await updateDoc(doc(db, "feedback", selectedFeedback.id), { response });
    setSuccess("Response sent!");
    setSelectedFeedback(null);
    setResponse("");
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Feedback & Support</h2>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-spinner loading-lg text-accent"></span>
          <span className="ml-4 text-base-content/70">Loading feedback...</span>
        </div>
      ) : feedback.length === 0 ? (
        <div className="alert alert-info mt-4">No feedback found.</div>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map(fb => (
              <tr key={fb.id}>
                <td>{fb.userEmail || "Unknown"}</td>
                <td>{fb.message}</td>
                <td>{fb.response ? "Responded" : "Pending"}</td>
                <td>
                  {!fb.response && (
                    <button className="btn btn-xs btn-info" onClick={() => setSelectedFeedback(fb)}>
                      Respond
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Transition show={!!selectedFeedback} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelectedFeedback(null)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
          </TransitionChild>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="modal-box max-w-md w-full bg-base-100 shadow-xl border border-base-300">
                <form onSubmit={e => {e.preventDefault(); handleRespond();}}>
                  <h3 className="font-bold text-lg mb-2">Respond to Feedback</h3>
                  <textarea
                    id="feedback-response"
                    name="feedback-response"
                    className="textarea textarea-bordered w-full mb-2"
                    placeholder="Type your response here..."
                    value={response}
                    onChange={e => setResponse(e.target.value)}
                    required
                  />
                  <div className="modal-action mt-4 flex gap-2">
                    <button type="submit" className="btn btn-primary">Send</button>
                    <button type="button" className="btn" onClick={() => setSelectedFeedback(null)}>Cancel</button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
  </Transition>
      {success && <div className="alert alert-success mt-4">{success}</div>}
    </div>
  );
}
