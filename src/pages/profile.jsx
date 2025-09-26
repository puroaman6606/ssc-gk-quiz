// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // Must be valid

  // Fetch user profile from backend
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setFormData({ name: res.data.name, email: res.data.email });
    } catch (err) {
      console.error("Fetch profile error:", err);
      setError(err.response?.data?.error || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      return;
    }
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setError("");
      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        { ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update profile error:", err);
      setError(err.response?.data?.error || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center p-6">
      <div className="bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-lg">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.photo || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-200 shadow-md mb-3"
          />
          <h1 className="text-2xl font-bold text-pink-600">{user.name}</h1>
          <p className="text-white">{user.role || "User"}</p>
        </div>

        {/* Editable Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled={!editing}
              onChange={handleChange}
              className={`w-full bg-gray-300 p-3 border rounded-xl focus:outline-none ${
                editing
                  ? "focus:ring-2 focus:ring-indigo-500 border-gray-200"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled={!editing}
              onChange={handleChange}
              className={`w-full  bg-gray-300 p-3 border rounded-xl focus:outline-none ${
                editing
                  ? "focus:ring-2 focus:ring-indigo-500 border-gray-300"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Password change placeholder */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password <span className="text-gray-400">(change via OTP)</span>
            </label>
            <input
              type="password"
              placeholder="********"
              disabled
              className="w-full p-3 border rounded-xl bg-gray-100 cursor-not-allowed focus:outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setFormData({ name: user.name, email: user.email });
                  setEditing(false);
                }}
                className="px-6 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
