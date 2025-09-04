import React from "react";

const companies = [
  {
    name: "TechNova",
    logo: "/vite.svg",
    description: "Innovating the future of remote work.",
    website: "https://technova.com"
  },
  {
    name: "HealthSync",
    logo: "/vite.svg",
    description: "Connecting healthcare professionals worldwide.",
    website: "https://healthsync.com"
  }
];

export default function CompanySpotlight() {
  return (
    <section className="mt-2 mb-10">
      <h2 className="text-xl font-bold text-accent mb-4">Company Spotlight</h2>
      <div className="flex flex-col gap-6">
        {companies.map(company => (
          <a key={company.name} href={company.website} target="_blank" rel="noopener noreferrer" className="card bg-base-100 shadow border border-base-300 p-4 flex flex-col items-center hover:shadow-lg transition">
            <img src={company.logo} alt={company.name} className="w-16 h-16 mb-2" />
            <div className="font-bold text-lg mb-1">{company.name}</div>
            <div className="text-base-content/70 text-center">{company.description}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
