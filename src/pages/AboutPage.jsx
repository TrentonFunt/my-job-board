import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      <div className="card bg-base-100 shadow-xl border border-base-300 p-4 sm:p-8 mb-4 sm:mb-8">
        <h1 className="text-3xl font-bold text-accent mb-4">About Role Rocket</h1>
        <p className="mb-4 text-base-content/80">
          Role Rocket is a modern job board platform designed to help you discover your next opportunity with ease. We curate listings from top companies, provide smart filters, and deliver a seamless experience across devices.
        </p>
        <ul className="list-disc pl-6 mb-4 text-base-content/70">
          <li>Browse curated job listings from trusted sources</li>
          <li>Filter by location, company, tags, and more</li>
          <li>Save jobs and track your recent searches</li>
          <li>Mobile-friendly, fast, and secure</li>
        </ul>
        <p className="text-base-content/70">
          Built with React, Vite, DaisyUI, Headless UI, Tailwind CSS, and Firebase.
        </p>
      </div>
    </div>
  );
}
