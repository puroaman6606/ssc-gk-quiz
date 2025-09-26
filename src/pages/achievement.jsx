import { useEffect, useState } from "react";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/achievements", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setAchievements(Array.isArray(data.achievements) ? data.achievements : []);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen">
    <div className="p-6 max-w-8xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">
        🏆 Your Achievements
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {achievements.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No achievements yet. Start attempting quizzes! 🚀
          </p>
        ) : (
          achievements.map((ach, index) => (
            <div
              key={index}
              className={`relative p-5 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 ${
                ach.unlocked
                  ? "bg-gradient-to-br from-green-100 to-green-200 border-l-4 border-green-500"
                  : "bg-gray-100 opacity-70 border-l-4 border-gray-400"
              }`}
            >
              {/* Badge Icon */}
              <div className="absolute top-3 right-3 text-2xl">
                {ach.unlocked ? "🏅" : "🔒"}
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{ach.title}</h2>

              {/* Description */}
              <p className="text-gray-700 mb-3">{ach.description}</p>

              {/* Unlocked / Locked */}
              <span
                className={`font-medium ${
                  ach.unlocked ? "text-green-600" : "text-gray-500"
                }`}
              >
                {ach.unlocked ? "Unlocked ✅" : "Locked 🔒"}
              </span>

              {/* Optional Progress Bar for partially complete achievements */}
              {ach.progress && (
                <div className="mt-3 w-full bg-gray-300 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-green-500 transition-all duration-500"
                    style={{ width: `${ach.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default Achievements;
