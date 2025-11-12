import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/leaderboard")
      .then((res) => setLeaders(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add photo from context if matches email
  const enhancedLeaders = leaders.map((leader) => {
    if (leader.userEmail === user?.email && user?.photoURL) {
      return { ...leader, userPhoto: user.photoURL };
    }
    return {
      ...leader,
      userPhoto: leader.userPhoto || "https://i.ibb.co/VwzypWv/user.png",
    };
  });

  return (
    <div className="px-6 md:px-12 mb-8 md:mb-14 pb-10 md:pb-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-secondary mb-5 md:mb-8">
        Top 3 Habit Champions
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 px-6">
        {enhancedLeaders.map((leader, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`relative flex flex-col items-center bg-white shadow-lg rounded-2xl p-4 md:p-6 border border-gray-200 w-48 md:w-60 ${
              index === 0 ? "w-52 md:w-72 scale-110 z-10" : "opacity-90"
            }`}
          >
            <div className="relative">
              <img
                src={leader.userPhoto}
                alt={leader.userName}
                className="w-16 h-16 md:w-22 md:h-22 rounded-full object-cover border-2 md:border-4 border-secondary"
              />
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-secondary text-white text-xs md:text-sm px-1 py-0.5 md:px-2 md:py-1 rounded-full">
                #{index + 1}
              </span>
            </div>

            <h3 className="mt-3 text-sm md:text-lg font-semibold text-primary">
              {leader.userName}
            </h3>

            <p className="text-gray-600 text-xs md:base">🔥 {leader.totalStreak} streaks</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
