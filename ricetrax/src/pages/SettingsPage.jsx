import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DateTimeDisplay from "../components/DateTimeDisplay";
import "../styles/settings.css";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    fullname: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555 123 4567",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");

  const [language, setLanguage] = useState("en");

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    alert("Password changed!");
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="settings-page">
      <Sidebar />
      <DateTimeDisplay />
      <main className="settings-container">
        <h2>User Settings</h2>

        <div className="settings-tabs">
          <div className="tab-buttons">
            {["profile", "password", "theme", "language", "notifications"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="tab-dropdown">
            <select value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
              <option value="profile">Profile</option>
              <option value="password">Password</option>
              <option value="theme">Theme</option>
              <option value="language">Language</option>
              <option value="notifications">Notifications</option>
            </select>
          </div>
        </div>

        {activeTab === "profile" && (
          <form className="settings-form" onSubmit={handleProfileSubmit}>
            <label>
              Full Name
              <input
                type="text"
                name="fullname"
                value={profile.fullname}
                onChange={handleProfileChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                required
              />
            </label>
            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                required
              />
            </label>
            <button type="submit" className="btn-primary">
              Save Profile
            </button>
          </form>
        )}

        {activeTab === "password" && (
          <form className="settings-form" onSubmit={handlePasswordSubmit}>
            <label>
              Current Password
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <label>
              New Password
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <label>
              Confirm New Password
              <input
                type="password"
                name="confirmNewPassword"
                value={passwords.confirmNewPassword}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <button type="submit" className="btn-primary">
              Change Password
            </button>
          </form>
        )}

        {activeTab === "theme" && (
          <div className="settings-form">
            <label>
              Theme Mode
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
            <label>
              Font Size
              <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
          </div>
        )}

        {activeTab === "language" && (
          <div className="settings-form">
            <label>
              Preferred Language
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="fil">Filipino</option>
                <option value="es">Spanish</option>
              </select>
            </label>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="settings-form">
            <label>
              <input
                type="checkbox"
                name="email"
                checked={notifications.email}
                onChange={handleNotificationChange}
              />
              Email Notifications
            </label>
            <label>
              <input
                type="checkbox"
                name="sms"
                checked={notifications.sms}
                onChange={handleNotificationChange}
              />
              SMS Notifications
            </label>
            <label>
              <input
                type="checkbox"
                name="push"
                checked={notifications.push}
                onChange={handleNotificationChange}
              />
              Push Notifications
            </label>
          </div>
        )}
      </main>
    </div>
  );
};

export default SettingsPage;
