import React, { useState } from "react";
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import Button from "../ui/Button";

export default function ChangePasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Password validation rules
  const passwordValidation = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword)
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!newPassword || !isPasswordValid) {
      setError("New password does not meet security requirements.");
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
    <div className="bg-base-100 rounded-lg p-6 border border-base-300 shadow-xl max-w-md">
      <h3 className="text-lg font-bold text-base-content mb-4">Change Password</h3>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <input
          type="password"
          id="current-password"
          name="currentPassword"
          placeholder="Current Password"
          className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          id="new-password"
          name="newPassword"
          placeholder="Create a strong password"
          className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />

        {/* Password Strength Indicator */}
        {newPassword && (
          <div className="space-y-2">
            <div className="text-sm text-base-content/70">Password requirements:</div>
            <div className="space-y-1 text-sm">
              <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-success' : 'text-base-content/60'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordValidation.minLength ? 'bg-success' : 'bg-base-content/30'}`}></div>
                At least 8 characters
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.hasUppercase ? 'text-success' : 'text-base-content/60'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordValidation.hasUppercase ? 'bg-success' : 'bg-base-content/30'}`}></div>
                One uppercase letter
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.hasLowercase ? 'text-success' : 'text-base-content/60'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordValidation.hasLowercase ? 'bg-success' : 'bg-base-content/30'}`}></div>
                One lowercase letter
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.hasNumber ? 'text-success' : 'text-base-content/60'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordValidation.hasNumber ? 'bg-success' : 'bg-base-content/30'}`}></div>
                One number
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.hasSpecialChar ? 'text-success' : 'text-base-content/60'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordValidation.hasSpecialChar ? 'bg-success' : 'bg-base-content/30'}`}></div>
                One special character
              </div>
            </div>
          </div>
        )}

        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <Button className="btn-primary w-full" type="submit" disabled={loading || !isPasswordValid || newPassword !== confirmPassword}>
          {loading ? "Changing..." : "Change Password"}
        </Button>
        {error && <p className="text-error text-sm mt-2">{error}</p>}
        {success && <p className="text-success text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
}
