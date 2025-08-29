import React from "react";
import dayjs from "dayjs";

export default function ProfileSection({
  avatarPreview,
  avatarInputRef,
  onAvatarChange,
  userData,
  status,
  handleEdit,
  handleSignOut
}) {
  return (
    <div className="card bg-base-100 shadow-xl p-0 overflow-hidden">
      <div className="flex flex-col items-center py-8 px-6">
        {/* Avatar */}
        <div className="avatar mb-4 relative">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary text-base-100 flex items-center justify-center text-3xl font-bold">
              {userData?.firstName?.[0] || "U"}
              {userData?.lastName?.[0] || "N"}
            </div>
          )}
          <button
            className="btn btn-xs btn-ghost absolute bottom-0 right-0"
            onClick={() => avatarInputRef.current?.click()}
            title="Change Avatar"
          >
            <span className="material-icons">edit</span>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={avatarInputRef}
            className="hidden"
            onChange={onAvatarChange}
          />
        </div>
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
          {userData?.firstName} {userData?.lastName}
          <span className={`badge badge-sm ${status === "active" ? "badge-success" : "badge-warning"}`}>{status}</span>
        </h2>
        <span className="badge badge-outline badge-lg mb-2">
          {userData?.profession || "Profession not set"}
        </span>
        <span className="text-base-content/70 mb-4">{userData?.email}</span>
        <div className="divider my-2" />
        <div className="w-full grid grid-cols-2 gap-4 text-left mb-2">
          <div>
            <span className="font-semibold text-base-content/80">First Name</span>
            <div className="text-base-content">{userData?.firstName}</div>
          </div>
          <div>
            <span className="font-semibold text-base-content/80">Last Name</span>
            <div className="text-base-content">{userData?.lastName}</div>
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-base-content/80">Email</span>
            <div className="text-base-content">{userData?.email}</div>
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-base-content/80">Phone</span>
            <div className="text-base-content">{userData?.phone || "-"}</div>
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-base-content/80">Address</span>
            <div className="text-base-content">{userData?.address || "-"}</div>
          </div>
          <div className="col-span-2">
            <span className="font-semibold text-base-content/80">Bio</span>
            <div className="text-base-content">{userData?.bio || "-"}</div>
          </div>
          <div className="col-span-2 flex gap-2 items-center">
            {userData?.twitter && (
              <a
                href={userData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-xs btn-info"
              >
                Twitter
              </a>
            )}
            {userData?.linkedin && (
              <a
                href={userData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-xs btn-primary"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
        <div className="w-full text-xs text-base-content/50 mt-2 mb-2">
          Account created: {userData?.createdAt
            ? dayjs(userData.createdAt).format("MMMM D, YYYY")
            : "-"}
        </div>
        <div className="flex gap-2 w-full mt-4">
          <button
            className="btn btn-outline btn-primary w-1/2"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        </div>
        <button
          className="btn btn-outline btn-error mt-4 w-full"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
