import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 0); // small delay for animation
    return () => clearTimeout(timer);
  }, []);

  const buttons = [
    { label: "👤 Profile Info", path: "/profile", bg: "bg-indigo-100" },
    { label: "📜 Quiz History", path: "/quiz-history", bg: "bg-indigo-100" },
    { label: "🏆 Achievements", path: "/achievements", bg: "bg-indigo-100" },
    { label: "🔔 Notifications", path: "/notifications", bg: "bg-indigo-100" },
    { label: "⚙️ Settings", path: "/settings", bg: "bg-indigo-100" },
    { label: "🚪 Logout", path: "/logout", bg: "bg-red-100", logout: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-yellow-200 to-yellow-400 shadow-lg rounded-2xl p-8 transition-all duration-500 ease-out transform">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          🎯 Dashboard
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => {
                if (btn.logout) {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                }
                navigate(btn.path);
              }}
              className={`p-6 ${btn.bg} rounded-xl shadow-md font-semibold
                transform transition duration-300 ease-out
                ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
                hover:scale-105 hover:shadow-xl hover:bg-pink-600`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
