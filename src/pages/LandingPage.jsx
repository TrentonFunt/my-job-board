
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();
  // Example static trending tags/companies for landing page
  const trendingTags = ["Remote", "React", "Design", "Marketing", "Full-time"];
  const trendingCompanies = ["Acme Corp", "Globex", "Initech", "Umbrella", "Wayne"];
  return (
    <section className="min-h-screen flex flex-col items-center bg-base-100 px-4 pt-8">
      {/* Hero/Banner Section */}
      <div className="w-full mb-8 flex flex-col items-center">
        <div className="card bg-gradient-to-r from-primary/10 to-accent/10 shadow-xl border border-base-300 p-6 sm:p-12 flex flex-col items-center text-center w-full max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">Welcome to Role Rocket</h1>
          <p className="mb-6 text-lg md:text-xl text-base-content/80 max-w-2xl">
            The modern job board for ambitious professionals and top companies. Discover your next opportunity or find the perfect candidate—fast, easy, and beautiful.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {trendingTags.map((tag) => (
              <span key={tag} className="badge badge-accent badge-lg cursor-pointer">{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {trendingCompanies.map((company) => (
              <span key={company} className="badge badge-primary badge-lg cursor-pointer">{company}</span>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            <button className="btn btn-primary btn-lg" onClick={() => navigate("/signup")}>Sign Up</button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate("/jobs")}>Browse Jobs</button>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="w-full mb-12 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-primary">How Role Rocket Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="card bg-base-100 shadow border border-base-300 p-6 flex flex-col items-center text-center">
            <div className="mb-3 text-primary">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 19V6m0 0-4 4m4-4 4 4"/></svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Sign Up & Create Profile</h3>
            <p className="text-base-content/70">Register in seconds and set up your professional profile to get personalized job matches.</p>
          </div>
          <div className="card bg-base-100 shadow border border-base-300 p-6 flex flex-col items-center text-center">
            <div className="mb-3 text-primary">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m-4-4v8"/></svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Search & Filter Jobs</h3>
            <p className="text-base-content/70">Use smart filters and search to find jobs that match your skills, interests, and location.</p>
          </div>
          <div className="card bg-base-100 shadow border border-base-300 p-6 flex flex-col items-center text-center">
            <div className="mb-3 text-primary">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Apply & Track Progress</h3>
            <p className="text-base-content/70">Apply to jobs with one click and track your application status right from your dashboard.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
