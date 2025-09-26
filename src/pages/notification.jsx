import { useEffect, useState } from "react";
import moment from "moment";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notifications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setNotifications(Array.isArray(data.notifications) ? data.notifications : []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  // Mark notification as read
  const markRead = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
      }
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  // Get icon based on type
  const getIcon = (type) => {
    switch (type) {
      case "quiz":
        return "🎯";
      case "achievement":
        return "🏆";
      case "system":
        return "⚡";
      default:
        return "🔔";
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen">
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">
        🔔 Notifications
      </h1>

      {notifications.length === 0 ? (
        <p className="text-center text-pink-500 text-lg">
          No notifications yet. Start interacting with quizzes! 🚀
        </p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`p-5 rounded-xl shadow-lg flex items-start space-x-4 transition transform duration-300 hover:scale-105 cursor-pointer ${
                notif.read
                  ? "bg-gray-100 border-l-4 border-gray-400 opacity-70"
                  : "bg-gradient-to-r from-green-100 to-green-200 border-l-4 border-green-500"
              }`}
              onClick={() => markRead(notif._id)}
            >
              {/* Icon */}
              <div className="text-3xl">{getIcon(notif.type)}</div>

              {/* Message and timestamp */}
              <div className="flex-1">
                <p className={`text-gray-800 font-medium ${!notif.read ? "font-semibold" : ""}`}>
                  {notif.message}
                </p>
                <span className="text-gray-500 text-sm">
                  {moment(notif.createdAt).fromNow()}
                </span>
              </div>

              {/* Status badge */}
              {!notif.read && (
                <span className="text-green-700 font-bold text-sm ml-2">New</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Notifications;
