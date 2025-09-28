import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Button from "../ui/Button";
import { motion as Motion } from "framer-motion";

export default function AddSampleJobs() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const sampleJobs = [
    {
      title: "Senior Frontend Developer",
      company_name: "TechCorp Solutions",
      description: "Join our innovative team as a Senior Frontend Developer. You'll work with React, TypeScript, and modern web technologies to build amazing user experiences. We offer competitive salary, flexible hours, and a great work environment.",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      tags: ["React", "TypeScript", "Frontend", "Remote"],
      featured: true,
      slug: "senior-frontend-developer-techcorp",
      application_link: "https://techcorp.com/careers/frontend-dev",
      source: "admin"
    },
    {
      title: "Product Manager",
      company_name: "InnovateTech",
      description: "Lead product strategy and development for our flagship platform. Work with cross-functional teams to deliver exceptional user experiences. Perfect for someone with 3+ years of product management experience.",
      location: "New York, NY",
      salary: "$130,000 - $160,000",
      tags: ["Product Management", "Strategy", "Leadership"],
      featured: true,
      slug: "product-manager-innovatetech",
      application_link: "https://innovatetech.com/careers/product-manager",
      source: "admin"
    },
    {
      title: "DevOps Engineer",
      company_name: "CloudScale Inc",
      description: "Design and implement scalable cloud infrastructure solutions. Work with AWS, Kubernetes, and modern DevOps practices. Join a team that values innovation and continuous improvement.",
      location: "Austin, TX",
      salary: "$110,000 - $140,000",
      tags: ["AWS", "Kubernetes", "DevOps", "Cloud"],
      featured: true,
      slug: "devops-engineer-cloudscale",
      application_link: "https://cloudscale.com/careers/devops",
      source: "admin"
    },
    {
      title: "UX Designer",
      company_name: "DesignStudio Pro",
      description: "Create beautiful and intuitive user experiences for our digital products. Work with a talented team of designers and developers to bring ideas to life. Portfolio required.",
      location: "Los Angeles, CA",
      salary: "$90,000 - $120,000",
      tags: ["UX Design", "UI Design", "Figma", "Research"],
      featured: true,
      slug: "ux-designer-designstudio",
      application_link: "https://designstudiopro.com/careers/ux-designer",
      source: "admin"
    }
  ];

  const addSampleJobs = async () => {
    setLoading(true);
    setSuccess("");
    
    try {
      for (const job of sampleJobs) {
        await addDoc(collection(db, "jobs"), {
          ...job,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setSuccess("Sample featured jobs added successfully!");
    } catch (error) {
      console.error("Error adding sample jobs:", error);
      setSuccess("Error adding sample jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-2xl"
    >
      <h3 className="text-xl font-bold text-white mb-4">Add Sample Featured Jobs</h3>
      <p className="text-slate-300 mb-4">
        Add sample featured jobs to demonstrate the featured jobs section on the homepage.
      </p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-white mb-2">Sample Jobs:</h4>
        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
          {sampleJobs.map((job, index) => (
            <li key={index}>
              <strong>{job.title}</strong> at {job.company_name}
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={addSampleJobs}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? "Adding Jobs..." : "Add Sample Featured Jobs"}
      </Button>

      {success && (
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-4 p-3 rounded-lg ${
            success.includes("successfully") 
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {success}
        </Motion.div>
      )}
    </Motion.div>
  );
}
