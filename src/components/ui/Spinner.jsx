import React from "react";

export default function Spinner({ className = "" }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}
