import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../Loading/Loading";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("https://daily-loop-server.vercel.app/leaderboard")
      .then((res) => setLeaders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-6 md:px-12 mb-8 md:mb-14 pb-8 md:pb-14">
      {loading ? (
        <Loading></Loading>
      ) : (
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-5 md:mb-8">
            🏆 Top 3 Champions
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.userEmail}
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center bg-white shadow-lg rounded-2xl p-4 md:p-6 border border-gray-200 w-42 md:w-56 md:h-48 transition-all duration-300
              ${index === 0 ? "md:scale-110 z-10" : "opacity-90"}`}
              >
                {/* Rank */}
                <div className="text-xl md:text-2xl font-bold text-secondary mb-2">
                  #{index + 1}
                </div>

                {/* User Name */}
                <h3 className="text-primary font-semibold md:text-xl mb-1 text-center">
                  {leader.userName || "Anonymous"}
                </h3>

                {/* Total Streak */}
                <p className="text-gray-600 text-sm md:text-base text-center">
                  🔥 {leader.totalStreak} streaks
                </p>

                {/* Decorative Bar */}
                <div className="w-12 md:w-16 h-1 bg-secondary rounded-full mt-3"></div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Leaderboard;
