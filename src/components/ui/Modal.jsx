import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box bg-base-100 rounded-xl p-6 max-w-md w-full shadow-xl border border-base-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-accent">{title}</h2>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost text-base-content hover:bg-base-200"
              aria-label="Close"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
