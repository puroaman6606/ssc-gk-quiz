import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // hamburger icon

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // toggle collapse
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSidebar(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!user) return null;

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile Info", path: "/profile" },
    { label: "Quiz History", path: "/quiz-history" },
    { label: "Achievements", path: "/achievements" },
    { label: "Notifications", path: "/notifications" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="fixed top-4 left-4 z-50  p-2 rounded bg-gray-700 dark:bg-gray-700 shadow hover:bg-gray-600 dark:hover:bg-gray-600 transition"
      >
        <FaBars className="text-gray-800 dark:text-gray-200 text-xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 dark:bg-gray-800 shadow-lg transform transition-transform duration-500 ${
          showSidebar
            ? sidebarCollapsed
              ? "-translate-x-full"
              : "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Profile Photo */}
        <div className="flex justify-center mt-6">
          <div className="w-24 h-24 rounded-full bg-gray-700 dark:bg-gray-700 flex items-center justify-center text-gray-300 dark:text-gray-300 text-2xl shadow-inner">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Welcome Message */}
        <h2 className="text-center text-xl font-bold mt-4 text-gray-200 dark:text-gray-200">
          Welcome, {user.name}!
        </h2>

        {/* Menu Items */}
        <div className="mt-8 flex flex-col gap-3 px-6">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="p-3 rounded-lg bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-200 shadow hover:shadow-lg hover:bg-pink-600 dark:hover:bg-pink-600 transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay for small screens */}
      {sidebarCollapsed && showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={() => setSidebarCollapsed(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
