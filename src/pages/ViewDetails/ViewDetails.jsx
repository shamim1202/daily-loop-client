import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const ViewDetails = () => {
  const { id } = useParams();
  const { user, setLoading } = useContext(AuthContext);
  const [habit, setHabit] = useState(null);
  const [loadingHabit, setLoadingHabit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabit = async () => {
      setLoadingHabit(true);
      try {
        const res = await axios.get(`http://localhost:3000/habits/${id}`);
        setHabit(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire({ icon: "error", title: "Failed to load habit" });
      } finally {
        setLoadingHabit(false);
      }
    };
    fetchHabit();
  }, [id]);

  if (loadingHabit) return <p className="text-center mt-10">Loading Habit Details...</p>;
  if (!habit) return null;

  // ------------------------------
  // Filter completions for current user
  const userCompletions = habit.completionHistory?.filter(
    (entry) => entry.userEmail === user?.email
  ) || [];

  // Check if completed today
  const todayStr = new Date().toISOString().split("T")[0];
  const completedToday = userCompletions.some((entry) => entry.date === todayStr);

  // Calculate streak for current user
  const sortedDates = userCompletions
    .map((e) => new Date(e.date))
    .sort((a, b) => b - a);

  let streak = 0;
  let datePointer = new Date();
  for (let i = 0; i < sortedDates.length; i++) {
    const diffDays = Math.floor((datePointer - sortedDates[i]) / (1000 * 60 * 60 * 24));
    if (diffDays === i) streak++;
    else break;
  }

  // Progress last 30 days
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  });
  const completedDays = userCompletions.filter((d) => last30Days.includes(d.date)).length;
  const progress = Math.round((completedDays / 30) * 100) || 0;
  // ------------------------------

  const handleMarkComplete = async () => {
    if (!user?.email) {
      Swal.fire({
        icon: "info",
        title: "Please log in first!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const res = await axios.patch(`http://localhost:3000/habits/complete/${habit._id}`, {
        email: user.email,
      });

      if (res.data.message === "Already marked complete today") {
        Swal.fire({ icon: "info", title: "Already completed today!", timer: 1500, showConfirmButton: false });
        return;
      }

      // Update UI instantly for current user
      const newCompletion = { userEmail: user.email, date: todayStr };
      setHabit((prev) => ({
        ...prev,
        completionHistory: [...(prev.completionHistory || []), newCompletion],
      }));

      // Show confetti and success
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);

      Swal.fire({
        icon: "success",
        title: "Great job! 🎉",
        text: "You’ve successfully completed your habit today.",
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error("Error marking complete:", error);
      Swal.fire({ icon: "error", title: "Oops!", text: "Something went wrong. Please try again later." });
    }
  };

  // Confetti Component
  const ConfettiEmoji = () => {
    const [emojis] = useState(Array.from({ length: 30 }));
    return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
        {emojis.map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 200 + Math.random() * 100, opacity: 0, rotate: Math.random() * 360 }}
            transition={{ duration: 1 + Math.random(), delay: Math.random() * 0.5 }}
            className="text-2xl absolute"
            style={{ left: `${Math.random() * 90}%` }}
          >
            🎉
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 bg-linear-to-r from-blue-100 via-purple-100 to-green-100">
      <button onClick={() => navigate(-1)} className="btn btn-outline btn-primary btn-xs md:btn-sm mb-6">
        ← Back
      </button>

      {showConfetti && <ConfettiEmoji />}

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row gap-6">
        
        {/* Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img src={habit.imageUrl || "https://via.placeholder.com/600x400"} alt={habit.title} className="w-full h-full object-cover rounded-l-2xl" />
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-primary mb-2">{habit.title}</h1>
            <p className="text-gray-700 mb-4">{habit.description}</p>
            <p className="mb-2"><span className="font-semibold">Category:</span> {habit.category}</p>
            <p className="mb-2"><span className="font-semibold">Created by:</span> {habit.userName}</p>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="h-3 bg-secondary rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{progress}% completed (last 30 days)</p>
            </div>

            {/* Streak */}
            <span className="bg-orange-500 text-white md:px-3 md:py-2 rounded-full text-sm font-medium">🔥 {streak} Day Streak</span>
          </div>

          {/* Mark Complete Button */}
          <button
            onClick={handleMarkComplete}
            disabled={completedToday}
            className={`mt-2 md:mt-4 btn btn-xs md:btn-md hover:text-white ${
              completedToday ? "bg-secondary text-white cursor-not-allowed" : "btn-outline btn-primary"
            }`}
          >
            {completedToday ? "Completed" : "Mark Complete"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewDetails;
