import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { db, auth } from "../../firebase";
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon, 
  EyeIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export default function RecentApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchRecentApplications(user.uid);
      } else {
        setApplications([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchRecentApplications = async (userId) => {
    try {
      const applicationsRef = collection(db, "users", userId, "applications");
      const q = query(
        applicationsRef,
        orderBy("appliedAt", "desc"),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      const apps = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(apps);
    } catch (error) {
      console.error("Failed to fetch recent applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPLIED':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'INTERVIEW':
        return <EyeIcon className="w-5 h-5 text-blue-500" />;
      case 'OFFER':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'REJECTED':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPLIED':
        return 'text-yellow-500';
      case 'INTERVIEW':
        return 'text-blue-500';
      case 'OFFER':
        return 'text-green-500';
      case 'REJECTED':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-base-100 rounded-lg p-6 shadow-lg"
      >
        <div className="animate-pulse">
          <div className="h-6 bg-base-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-base-200 rounded"></div>
            ))}
          </div>
        </div>
      </Motion.div>
    );
  }

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-base-100 rounded-lg p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BriefcaseIcon className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold text-base-content">Recent Applications</h3>
        </div>
        {applications.length > 0 && (
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/account')}
            className="text-sm text-primary hover:text-primary-focus transition-colors duration-200"
          >
            View All
          </Motion.button>
        )}
      </div>

      {applications.length === 0 ? (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <BriefcaseIcon className="w-12 h-12 text-base-300 mx-auto mb-4" />
          <p className="text-base-content/70 mb-4">No applications yet</p>
          <p className="text-sm text-base-content/50">Start applying to jobs to track your progress here!</p>
        </Motion.div>
      ) : (
        <div className="space-y-4">
          {applications.map((app, index) => (
            <Motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors duration-200"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(app.status)}
                  <h4 className="font-semibold text-base-content">{app.position}</h4>
                </div>
                <p className="text-sm text-base-content/70">{app.company}</p>
                <p className="text-xs text-base-content/50">
                  Applied {app.appliedAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
                {app.jobUrl && (
                  <Motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={app.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-focus transition-colors duration-200"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Motion.a>
                )}
              </div>
            </Motion.div>
          ))}
        </div>
      )}
    </Motion.div>
  );
}
