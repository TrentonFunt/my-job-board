import React from "react";
import { motion } from "framer-motion";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function ProfileSection({
  avatarPreview,
  avatarInputRef,
  onAvatarChange,
  userData,
  status,
  handleEdit,
  handleSignOut
}) {
  const getInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    return "TA"; // Default initials as shown in Figma
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-base-100 rounded-lg p-8 border border-base-300 shadow-xl"
    >
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        {/* Large Avatar */}
        <div className="avatar mb-6 relative flex items-center justify-center">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-3xl font-bold">
              <span className="flex items-center justify-center w-full h-full">{getInitials()}</span>
            </div>
          )}
        </div>
        
        {/* Name and Status */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-base-content mb-2 flex items-center justify-center gap-3">
            {userData?.firstName && userData?.lastName 
              ? `${userData.firstName} ${userData.lastName}` 
              : "Tiwalade Adedeji"}
            <span className="bg-primary text-primary-content text-xs px-2 py-1 rounded-full font-medium">
              {status || "active"}
            </span>
          </h2>
          
          {/* Profession Badge */}
          <div className="bg-base-200 text-base-content border border-base-300 px-4 py-2 rounded-lg inline-block mb-3">
            <span className="font-medium">
              {userData?.profession || "Content Strategist"}
            </span>
          </div>
          
          {/* Email */}
          <p className="text-base-content/70 text-sm">
            {userData?.email || "ddejilade22@gmail.com"}
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <span className="text-base-content/60 text-sm font-medium block mb-1">First Name:</span>
            <span className="text-base-content">
              {userData?.firstName || "Tiwalade"}
            </span>
          </div>
          <div>
            <span className="text-base-content/60 text-sm font-medium block mb-1">Email:</span>
            <span className="text-base-content">
              {userData?.email || "ddejilade22@gmail.com"}
            </span>
          </div>
          <div>
            <span className="text-base-content/60 text-sm font-medium block mb-1">Phone:</span>
            <span className="text-base-content">
              {userData?.phone || "-"}
            </span>
          </div>
          <div>
            <span className="text-base-content/60 text-sm font-medium block mb-1">Address:</span>
            <span className="text-base-content">
              {userData?.address || "-"}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <span className="text-base-content/60 text-sm font-medium block mb-1">Last Name:</span>
            <span className="text-base-content">
              {userData?.lastName || "Adedeji"}
            </span>
          </div>
          <div>
            <span className="text-base-content/60 text-sm font-medium block mb-1">Profession:</span>
            <span className="text-base-content">
              {userData?.profession || "Content Strategist"}
            </span>
          </div>
          <div>
            <span className="text-base-content/60 text-sm font-medium block mb-1">Bio:</span>
            <span className="text-base-content">
              {userData?.bio || "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Social Links */}
      {(userData?.twitter || userData?.linkedin) && (
        <div className="mb-8">
          <h3 className="text-base-content/60 text-sm font-medium mb-3">Social Links</h3>
          <div className="flex gap-3">
            {userData?.twitter && (
              <a
                href={userData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-info hover:bg-info-focus text-info-content px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Twitter
              </a>
            )}
            {userData?.linkedin && (
              <a
                href={userData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-info hover:bg-info-focus text-info-content px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleEdit}
          className="flex-1 bg-primary hover:bg-primary-focus text-primary-content px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
          type="button"
        >
          <PencilIcon className="w-4 h-4" />
          Edit Profile
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignOut}
          className="flex-1 bg-error hover:bg-error-focus text-error-content px-6 py-3 rounded-lg font-medium transition-all duration-200"
          type="button"
        >
          Sign Out
        </motion.button>
      </div>

      {/* Hidden file input for avatar */}
      <input
        type="file"
        accept="image/*"
        ref={avatarInputRef}
        className="hidden"
        onChange={onAvatarChange}
      />
    </motion.div>
  );
}
