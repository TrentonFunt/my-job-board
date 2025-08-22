import React, { useState } from "react";
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";

export default function ChangePasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!newPassword || newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user signed in.");
      await updatePassword(user, newPassword);
      setSuccess("Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md p-6 mt-6">
      <h3 className="text-lg font-bold mb-4">Change Password</h3>
      <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
      
        <input
          type="password"
          placeholder="Current Password"
          className="input input-bordered"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="input input-bordered"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="input input-bordered"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Changing..." : "Change Password"}
        </button>
        {error && <p className="text-error text-sm mt-2">{error}</p>}
        {success && <p className="text-success text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
}
