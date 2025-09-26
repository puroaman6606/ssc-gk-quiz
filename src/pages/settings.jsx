import { useState, useEffect } from "react";

const Settings = () => {
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
  const [preferences, setPreferences] = useState({
    notifications: true,
    theme: "light",
    fontSize: "medium",
    isProfilePublic: true,
  });
  const [message, setMessage] = useState("");

  // Fetch current user preferences on load
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/settings/preferences", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data.success) setPreferences(data.user.preferences);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPreferences();
  }, []);

  // Apply theme
  useEffect(() => {
    if (preferences.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [preferences.theme]);

  // Apply font size
  useEffect(() => {
    const sizeMap = { small: "text-sm", medium: "text-base", large: "text-lg" };
    document.documentElement.classList.remove("text-sm", "text-base", "text-lg");
    document.documentElement.classList.add(sizeMap[preferences.fontSize]);
  }, [preferences.fontSize]);

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/settings/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(passwordData),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // Handle preferences update
  const handlePreferencesChange = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(preferences),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone!")) return;
    try {
      const res = await fetch("http://localhost:5000/api/settings/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      alert(data.message);
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen">
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl text-pink-600 text-center  font-bold mb-6">⚙️ Settings</h1>

      {/* Password Update Box */}
      <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 dark:bg-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form className="space-y-4" onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Preferences Box */}
      <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 dark:bg-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Enable Notifications</span>
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <select
              value={preferences.theme}
              onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
              className="border rounded p-1 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span>Font Size</span>
            <select
              value={preferences.fontSize}
              onChange={(e) => setPreferences({ ...preferences, fontSize: e.target.value })}
              className="border rounded p-1 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span>Profile Public</span>
            <input
              type="checkbox"
              checked={preferences.isProfilePublic}
              onChange={(e) => setPreferences({ ...preferences, isProfilePublic: e.target.checked })}
            />
          </div>
          <button
            onClick={handlePreferencesChange}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Danger Zone Box */}
      <div className="p-6 bg-red-50 border border-red-300 shadow-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 dark:bg-red-800 dark:text-white dark:border-red-700">
        <h2 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-300">Danger Zone</h2>
        <p className="mb-4">Deleting your account is permanent and cannot be undone.</p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete Account
        </button>
      </div>

      {message && <p className="text-center mt-4 text-green-600 font-medium dark:text-green-400">{message}</p>}
    </div>
    </div>
  );
};

export default Settings;
