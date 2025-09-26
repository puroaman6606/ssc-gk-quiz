import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3); // 3-second countdown

  useEffect(() => {
    // Clear token
    localStorage.removeItem("token");

    // Countdown & redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl text-center space-y-4 transition-colors">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 flex items-center justify-center gap-2">
          <span className="animate-wave inline-block">👋</span> Logged Out
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          You have successfully logged out.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Redirecting to login in {countdown} seconds...
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Go to Login Now
        </button>
      </div>
    </div>
  );
};

export default Logout;
