import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const PublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const { user, loading, setLoading } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const handleViewDetails = (habitId) => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in to view habit details.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3B82F6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
    } else {
      navigate(`/habit_details/${habitId}`);
    }
  };

  // ----------------- Mark Complete -----------------
  // const handleMarkComplete = async (habitId) => {
  //   if (!user?.email) {
  //     Swal.fire({
  //       title: "Login Required",
  //       text: "You need to log in to mark this habit complete.",
  //       icon: "warning",
  //       confirmButtonText: "OK",
  //     });
  //     return;
  //   }

  //   try {
  //     const res = await axios.patch(`http://localhost:3000/habits/complete/${habitId}`, {
  //       email: user.email,
  //     });

  //     if (res.data.message === "Already marked complete today") {
  //       Swal.fire({ icon: "info", title: "Already completed today!", timer: 1500, showConfirmButton: false });
  //       return;
  //     }

  //     const today = res.data.today; // backend থেকে আজকের date
  //     const userEmail = res.data.userEmail;

  //     // Update habits state
  //     setHabits((prev) =>
  //       prev.map((habit) => {
  //         if (habit._id === habitId) {
  //           const updatedHistory = habit.completionHistory ? [...habit.completionHistory] : [];
  //           updatedHistory.push({ userEmail, date: today });
  //           return {
  //             ...habit,
  //             completionHistory: updatedHistory,
  //             currentStreak: updatedHistory.filter((h) => h.userEmail === user.email).length, // শুধুমাত্র এই user এর streak
  //           };
  //         }
  //         return habit;
  //       })
  //     );

  //     Swal.fire({ icon: "success", title: "Marked complete! 🔥", timer: 1500, showConfirmButton: false });
  //   } catch (err) {
  //     console.error(err);
  //     Swal.fire({ icon: "error", title: "Failed to mark complete", text: "Please try again later." });
  //   }
  // };

  // ----------------- Fetch Habits -----------------
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await axios.get("http://localhost:3000/public_habits");
        setHabits(res.data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, [setLoading]);

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesCategory = selectedCategory === "All" || habit.category === selectedCategory;
      const matchesSearch =
        habit.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        habit.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [habits, selectedCategory, searchTerm]);

  const categories = ["All", "Morning", "Work", "Fitness", "Evening", "Study"];

  return (
    <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 md:p-8"
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-gray-800">🌿 Public Habits</h1>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 md:px-4 md:py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs md:text-sm px-4 py-1.5 rounded-xl border transition font-medium ${
                  selectedCategory === cat
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Habits Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto bg-white rounded-xl shadow-md"
        >
          <table className="table w-full text-center border-collapse">
            <thead className="bg-primary text-white">
              <tr>
                <th className="py-3 px-4">Creator</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Streak</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHabits.map((habit, i) => {
                const completedToday = habit.completionHistory?.some(
                  (entry) => entry.userEmail === user?.email && entry.date === new Date().toISOString().split("T")[0]
                );
                const userStreak = habit.completionHistory
                  ? habit.completionHistory.filter((h) => h.userEmail === user?.email).length
                  : 0;

                return (
                  <tr key={habit._id} className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}>
                    <td className="py-3 px-4 font-medium text-gray-700">{habit.userName || "Anonymous"}</td>
                    <td className="py-3 px-4 font-medium text-blue-600">{habit.title}</td>
                    <td className="py-3 px-4">{habit.category}</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{userStreak}</td>
                    <td className="py-3 px-4 text-gray-600">{new Date(habit.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewDetails(habit._id)}
                        className="btn btn-xs md:btn-sm btn-outline btn-primary text-primary hover:text-white rounded-lg transition"
                      >
                        See Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PublicHabits;
