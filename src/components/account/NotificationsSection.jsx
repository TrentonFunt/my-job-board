import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { BellIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New job matches your profile",
      message: "Senior Frontend Developer at TechCorp matches your skills",
      time: "2 hours ago",
      read: false,
      type: "job_match"
    },
    {
      id: 2,
      title: "Application status update",
      message: "Your application for Product Manager at StartupXYZ has been reviewed",
      time: "1 day ago",
      read: false,
      type: "application"
    },
    {
      id: 3,
      title: "Profile completion reminder",
      message: "Complete your profile to get better job recommendations",
      time: "3 days ago",
      read: true,
      type: "reminder"
    },
    {
      id: 4,
      title: "Weekly job digest",
      message: "Here are this week's top jobs matching your preferences",
      time: "1 week ago",
      read: true,
      type: "digest"
    }
  ]);

  const [filter, setFilter] = useState("all"); // all, unread, read

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.read;
    if (filter === "read") return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "job_match":
        return "🎯";
      case "application":
        return "📋";
      case "reminder":
        return "⏰";
      case "digest":
        return "📧";
      default:
        return "🔔";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "job_match":
        return "border-emerald-500/30 bg-emerald-500/10";
      case "application":
        return "border-blue-500/30 bg-blue-500/10";
      case "reminder":
        return "border-yellow-500/30 bg-yellow-500/10";
      case "digest":
        return "border-purple-500/30 bg-purple-500/10";
      default:
        return "border-slate-600 bg-slate-700/50";
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-base-100 rounded-lg p-6 border border-base-300 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BellIcon className="w-6 h-6 text-emerald-500" />
          <h2 className="text-2xl font-bold text-base-content">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "all", label: "All" },
          { key: "unread", label: "Unread" },
          { key: "read", label: "Read" }
        ].map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption.key
                ? "bg-primary text-primary-content"
                : "bg-base-200 text-base-content/70 hover:bg-base-300"
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <BellIcon className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">
              {filter === "unread" 
                ? "No unread notifications" 
                : filter === "read" 
                ? "No read notifications" 
                : "No notifications yet"}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <Motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getNotificationColor(notification.type)} ${
                !notification.read ? "ring-2 ring-emerald-500/20" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-semibold mb-1 ${
                        !notification.read ? "text-base-content" : "text-base-content/70"
                      }`}>
                        {notification.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-2">
                        {notification.message}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {notification.time}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 rounded-full hover:bg-slate-600 transition-colors"
                          title="Mark as read"
                        >
                          <CheckIcon className="w-4 h-4 text-emerald-400" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 rounded-full hover:bg-slate-600 transition-colors"
                        title="Delete notification"
                      >
                        <XMarkIcon className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Motion.div>
          ))
        )}
      </div>
    </Motion.div>
  );
}
