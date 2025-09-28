import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { 
  CogIcon, 
  BellIcon, 
  EyeIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  UserIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

export default function SettingsSection({ userData: _userData, onUpdateUserData: _onUpdateUserData }) {
  const [settings, setSettings] = useState({
    // Notification preferences
    emailNotifications: true,
    pushNotifications: true,
    jobMatches: true,
    applicationUpdates: true,
    weeklyDigest: true,
    marketingEmails: false,
    
    // Privacy settings
    profileVisibility: "public", // public, connections, private
    showEmail: false,
    showPhone: false,
    showLocation: true,
    
    // Account settings
    twoFactorAuth: false,
    dataExport: false,
    accountDeletion: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Load user settings from localStorage or API
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      // Save to localStorage (in real app, save to backend)
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess("Settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetSettings = () => {
    setSettings({
      emailNotifications: true,
      pushNotifications: true,
      jobMatches: true,
      applicationUpdates: true,
      weeklyDigest: true,
      marketingEmails: false,
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      showLocation: true,
      twoFactorAuth: false,
      dataExport: false,
      accountDeletion: false
    });
  };

  const SettingToggle = ({ label, description, value, onChange, icon: Icon }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-700 last:border-b-0">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-slate-400" />}
        <div>
          <h3 className="text-base-content font-medium">{label}</h3>
          {description && <p className="text-base-content/60 text-sm">{description}</p>}
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
      </label>
    </div>
  );

  const SettingSelect = ({ label, description, value, onChange, options, icon: Icon }) => (
    <div className="py-4 border-b border-slate-700 last:border-b-0">
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className="w-5 h-5 text-slate-400" />}
        <div>
          <h3 className="text-base-content font-medium">{label}</h3>
          {description && <p className="text-base-content/60 text-sm">{description}</p>}
        </div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-2 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-base-100 rounded-lg p-6 border border-base-300 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <CogIcon className="w-6 h-6 text-emerald-500" />
        <h2 className="text-2xl font-bold text-base-content">Settings</h2>
      </div>

      {success && (
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg mb-6"
        >
          {success}
        </Motion.div>
      )}

      <div className="space-y-8">
        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
            <BellIcon className="w-5 h-5 text-emerald-500" />
            Notifications
          </h3>
          <div className="bg-slate-700/50 rounded-lg p-4 space-y-0">
            <SettingToggle
              label="Email Notifications"
              description="Receive notifications via email"
              value={settings.emailNotifications}
              onChange={(value) => handleSettingChange('emailNotifications', value)}
              icon={EnvelopeIcon}
            />
            <SettingToggle
              label="Push Notifications"
              description="Receive push notifications in browser"
              value={settings.pushNotifications}
              onChange={(value) => handleSettingChange('pushNotifications', value)}
              icon={BellIcon}
            />
            <SettingToggle
              label="Job Matches"
              description="Get notified when jobs match your profile"
              value={settings.jobMatches}
              onChange={(value) => handleSettingChange('jobMatches', value)}
            />
            <SettingToggle
              label="Application Updates"
              description="Updates on your job applications"
              value={settings.applicationUpdates}
              onChange={(value) => handleSettingChange('applicationUpdates', value)}
            />
            <SettingToggle
              label="Weekly Digest"
              description="Weekly summary of new jobs and opportunities"
              value={settings.weeklyDigest}
              onChange={(value) => handleSettingChange('weeklyDigest', value)}
            />
            <SettingToggle
              label="Marketing Emails"
              description="Receive promotional emails and updates"
              value={settings.marketingEmails}
              onChange={(value) => handleSettingChange('marketingEmails', value)}
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
            Privacy
          </h3>
          <div className="bg-slate-700/50 rounded-lg p-4 space-y-0">
            <SettingSelect
              label="Profile Visibility"
              description="Who can see your profile"
              value={settings.profileVisibility}
              onChange={(value) => handleSettingChange('profileVisibility', value)}
              options={[
                { value: "public", label: "Public - Everyone can see your profile" },
                { value: "connections", label: "Connections - Only your connections" },
                { value: "private", label: "Private - Only you can see your profile" }
              ]}
              icon={GlobeAltIcon}
            />
            <SettingToggle
              label="Show Email"
              description="Display your email on your profile"
              value={settings.showEmail}
              onChange={(value) => handleSettingChange('showEmail', value)}
              icon={EnvelopeIcon}
            />
            <SettingToggle
              label="Show Phone"
              description="Display your phone number on your profile"
              value={settings.showPhone}
              onChange={(value) => handleSettingChange('showPhone', value)}
            />
            <SettingToggle
              label="Show Location"
              description="Display your location on your profile"
              value={settings.showLocation}
              onChange={(value) => handleSettingChange('showLocation', value)}
            />
          </div>
        </div>

        {/* Security Settings */}
        <div>
          <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
            Security
          </h3>
          <div className="bg-slate-700/50 rounded-lg p-4 space-y-0">
            <SettingToggle
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              value={settings.twoFactorAuth}
              onChange={(value) => handleSettingChange('twoFactorAuth', value)}
              icon={ShieldCheckIcon}
            />
          </div>
        </div>

        {/* Account Actions */}
        <div>
          <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-emerald-500" />
            Account
          </h3>
          <div className="bg-slate-700/50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-base-content font-medium">Export Data</h3>
                <p className="text-base-content/60 text-sm">Download a copy of your data</p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Export
              </button>
            </div>
            <div className="flex items-center justify-between py-4 border-t border-slate-600">
              <div>
                <h3 className="text-base-content font-medium">Delete Account</h3>
                <p className="text-base-content/60 text-sm">Permanently delete your account and all data</p>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-8 pt-6 border-t border-slate-700">
        <button
          onClick={saveSettings}
          disabled={loading}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </button>
        <button
          onClick={resetSettings}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
        >
          Reset
        </button>
      </div>
    </Motion.div>
  );
}
