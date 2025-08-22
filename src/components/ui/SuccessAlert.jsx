import React from "react";

export default function SuccessAlert({ message, show }) {
  if (!show || !message) return null;
  return (
    <div className="alert alert-success mb-4">
      {message}
    </div>
  );
}
