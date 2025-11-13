import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthProvider";
import { usePageTitle } from "../../hooks/usePageTitle";

const MyHabits = () => {
  const { user, loading } = useContext(AuthContext);
  const [pageLoading, setPageLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Open update modal
  const handleUpdateClick = (habit) => {
    setSelectedHabit(habit);
    setIsModalOpen(true);
  };

  // Submit habit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedHabit = {
        title: selectedHabit.title,
        description: selectedHabit.description,
        category: selectedHabit.category,
        reminderTime: selectedHabit.reminderTime,
        imageUrl: selectedHabit.imageUrl,
      };

      const res = await axios.patch(
        `https://daily-loop-server.vercel.app/update_habit/${selectedHabit._id}`,
        updatedHabit
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Habit updated!",
          timer: 2000,
          showConfirmButton: false,
        });
        setHabits((prev) =>
          prev.map((item) =>
            item._id === selectedHabit._id ? { ...item, ...updatedHabit } : item
          )
        );
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Something went wrong.",
      });
    }
  };

  // Delete habit
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This habit will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `https://daily-loop-server.vercel.app/delete_habit/${id}`
        );
        if (res.data.deletedCount > 0) {
          setHabits((prev) => prev.filter((habit) => habit._id !== id));
          Swal.fire("Deleted!", "Your habit has been deleted.", "success");
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: "Try again later.",
        });
      }
    }
  };

  // Mark habit complete (Persistent & Streak Update)
  const handleMarkComplete = async (habitId) => {
    if (!user?.email) return;

    try {
      const res = await axios.patch(
        `https://daily-loop-server.vercel.app/habits/complete/${habitId}`,
        { email: user.email }
      );

      if (res.data.message === "Already marked complete today") {
        Swal.fire({
          icon: "info",
          title: "Already completed today!",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      // Update frontend state using backend response
      setHabits((prev) =>
        prev.map((habit) => {
          if (habit._id === habitId) {
            const updatedHistory = habit.completionHistory
              ? [...habit.completionHistory]
              : [];
            updatedHistory.push({
              userEmail: user.email,
              date: res.data.today,
            });

            return {
              ...habit,
              completionHistory: updatedHistory,
              currentStreak: res.data.currentStreak, // backend computed streak
            };
          }
          return habit;
        })
      );

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);

      Swal.fire({
        icon: "success",
        title: "Habit marked complete! 🔥",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to mark complete",
        text: "Please try again later.",
      });
    }
  };

  // Fetch user habits
  useEffect(() => {
    if (!user?.email) {
      setPageLoading(false);
      return;
    }

    const fetchHabits = async () => {
      try {
        setPageLoading(true);
        const res = await axios.get(
          `https://daily-loop-server.vercel.app/my_habits?email=${user.email}`
        );
        setHabits(res.data); // Ensure currentStreak & completionHistory included
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to load habits!",
          text: "Please try again later.",
        });
      } finally {
        setPageLoading(false);
      }
    };

    fetchHabits();
  }, [user?.email]);

  // Emoji Confetti
  const ConfettiEmoji = () => {
    const emojis = Array.from({ length: 30 });
    return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
        {emojis.map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 1 }}
            animate={{
              y: 200 + Math.random() * 100,
              opacity: 0,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 1 + Math.random(),
              delay: Math.random() * 0.5,
            }}
            className="text-2xl absolute"
            style={{ left: `${Math.random() * 90}%` }}
          >
            🎉
          </motion.div>
        ))}
      </div>
    );
  };

  usePageTitle("My Habits")

  return (
    <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100 px-6 md:px-12 py-10 relative">
      {showConfetti && <ConfettiEmoji />}

      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-5 md:mb-8">
        My Habits
      </h2>

      {pageLoading || loading ? (
        <Loading />
      ) : habits.length === 0 ? (
        <p className="text-center text-gray-500 md:text-lg">
          No habits found. Add one to get started!
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto bg-white rounded-xl shadow-md"
        >
          <table className="table w-full text-center border-collapse">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="text-sm md:text-base font-semibold py-1.5 px-2 md:py-3 md:px-4">Title</th>
                <th className="text-sm md:text-base font-semibold py-1.5 px-2 md:py-3 md:px-4">Category</th>
                <th className="text-sm md:text-base font-semibold py-1.5 px-2 md:py-3 md:px-4">Current Streak</th>
                <th className="text-sm md:text-base font-semibold py-1.5 px-2 md:py-3 md:px-4">Created Date</th>
                <th className="text-sm md:text-base font-semibold py-1.5 px-2 md:py-3 md:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit, i) => {
                const today = new Date().toISOString().split("T")[0];
                const completedToday = habit.completionHistory?.some(
                  (entry) =>
                    entry.userEmail === user?.email && entry.date === today
                );

                return (
                  <tr
                    key={habit._id}
                    className={`${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="md:text-base text-xs md:py-3 md:px-4 font-medium text-primary">
                      {habit.title}
                    </td>
                    <td className="md:text-base text-xs py-1.5 px-2 md:py-3 md:px-4 text-gray-600">{habit.category}</td>
                    <td className="md:text-base text-xs py-1.5 px-2 md:py-3 md:px-4 text-secondary font-semibold">
                      {habit.currentStreak || 0}
                    </td>
                    <td className="md:text-base text-xs py-1.5 px-2 md:py-3 md:px-4 text-gray-600">
                      {new Date(habit.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-1.5 px-2 md:py-3 md:px-4 space-y-1 md:space-y-0 md:space-x-2">
                      <button
                        onClick={() => handleMarkComplete(habit._id)}
                        disabled={completedToday}
                        className={`btn btn-xs md:btn-sm hover:text-white transition-all duration-300 ${
                          completedToday
                            ? "bg-secondary text-white cursor-not-allowed"
                            : "btn-outline btn-primary"
                        }`}
                      >
                        {completedToday ? "Completed" : "Mark Complete"}
                      </button>

                      <button
                        onClick={() => handleUpdateClick(habit)}
                        className="btn btn-xs md:btn-sm btn-outline btn-primary"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(habit._id)}
                        className="btn btn-xs md:btn-sm btn-outline btn-error hover:text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Update Habit Modal */}
      {isModalOpen && selectedHabit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h3 className="text-2xl font-semibold text-center mb-4 text-secondary">
              Update Habit
            </h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                value={selectedHabit.title}
                onChange={(e) =>
                  setSelectedHabit({ ...selectedHabit, title: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Habit Title"
                required
              />
              <textarea
                value={selectedHabit.description}
                onChange={(e) =>
                  setSelectedHabit({
                    ...selectedHabit,
                    description: e.target.value,
                  })
                }
                className="textarea textarea-bordered w-full"
                placeholder="Description"
              ></textarea>
              <select
                value={selectedHabit.category}
                onChange={(e) =>
                  setSelectedHabit({
                    ...selectedHabit,
                    category: e.target.value,
                  })
                }
                className="select select-bordered w-full"
              >
                <option>Morning</option>
                <option>Work</option>
                <option>Fitness</option>
                <option>Evening</option>
                <option>Study</option>
              </select>
              <input
                type="time"
                value={selectedHabit.reminderTime}
                onChange={(e) =>
                  setSelectedHabit({
                    ...selectedHabit,
                    reminderTime: e.target.value,
                  })
                }
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={selectedHabit.imageUrl}
                onChange={(e) =>
                  setSelectedHabit({
                    ...selectedHabit,
                    imageUrl: e.target.value,
                  })
                }
                className="input input-bordered w-full"
                placeholder="Image URL"
              />
              <input
                type="text"
                value={selectedHabit.userName}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
              <input
                type="email"
                value={selectedHabit.userEmail}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="btn btn-secondary btn-sm md:btn-md px-6"
                >
                  Update Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyHabits;
