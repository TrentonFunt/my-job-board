import { motion as Motion } from "framer-motion";
import { 
  PlusIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

/**
 * Overview tab content with stats, quick actions, and recent applications
 * @param {{ jobs: Array, applications: Array, onPostJob: Function, setActiveTab: Function }} props
 */
export default function EmployerOverview({ jobs, applications, onPostJob, setActiveTab }) {
  const stats = [
    {
      title: "Total Jobs",
      value: jobs.length,
      icon: BriefcaseIcon,
      color: "text-blue-500",
      change: "+2 this week"
    },
    {
      title: "Total Applications",
      value: applications.length,
      icon: UserGroupIcon,
      color: "text-green-500",
      change: "+12 this week"
    },
    {
      title: "Pending Reviews",
      value: applications.filter(app => app.status === "pending").length,
      icon: ClockIcon,
      color: "text-yellow-500",
      change: "Needs attention"
    },
    {
      title: "Active Jobs",
      value: jobs.filter(job => job.status === "active").length,
      icon: CheckCircleIcon,
      color: "text-emerald-500",
      change: "All systems go"
    }
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <Motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-base-200 rounded-xl p-4 sm:p-6 border border-base-300 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-base-content/60 text-sm">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-bold text-base-content mt-1 sm:mt-2">{stat.value}</p>
                <p className="text-xs text-base-content/50 mt-1">{stat.change}</p>
              </div>
              <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-base-200 rounded-xl p-4 sm:p-6 border border-base-300 mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <button
            onClick={onPostJob}
            className="btn btn-primary flex items-center justify-center gap-2 touch-manipulation"
          >
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Post New Job</span>
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className="btn btn-secondary flex items-center justify-center gap-2 touch-manipulation"
          >
            <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Review Applications</span>
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className="btn btn-accent flex items-center justify-center gap-2 touch-manipulation sm:col-span-2 lg:col-span-1"
          >
            <BriefcaseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Manage Jobs</span>
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-base-200 rounded-xl p-6 border border-base-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-base-content">Recent Applications</h3>
          <button
            onClick={() => setActiveTab("applications")}
            className="text-primary hover:text-primary-focus text-sm transition-colors duration-200"
          >
            View all
          </button>
        </div>
        {applications.slice(0, 5).map((application) => (
          <div key={application.id} className="flex items-center justify-between py-3 border-b border-base-300 last:border-b-0">
            <div>
              <p className="text-base-content font-medium">{application.jobTitle}</p>
              <p className="text-base-content/60 text-sm">{application.candidateName}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              application.status === "pending" ? "bg-warning/20 text-warning" :
              application.status === "accepted" ? "bg-success/20 text-success" :
              "bg-error/20 text-error"
            }`}>
              {application.status}
            </span>
          </div>
        ))}
        {applications.length === 0 && (
          <p className="text-base-content/60 text-center py-8">No applications yet</p>
        )}
      </div>
    </Motion.div>
  );
}
