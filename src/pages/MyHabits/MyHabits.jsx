import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthProvider";

const MyHabits = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  // Handle Update button click and show modal --------------->
  const handleUpdateClick = (habit) => {
    setSelectedHabit(habit);
    setIsModalOpen(true);
  };

  // Handle form submission (update) ------------------------->
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
        `http://localhost:3000/update_habit/${selectedHabit._id}`,
        updatedHabit
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Habit updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        // Update habit list instantly -------------------------->
        setHabits((prev) =>
          prev.map((item) =>
            item._id === selectedHabit._id ? { ...item, ...updatedHabit } : item
          )
        );
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error updating habit:", err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Something went wrong while updating the habit.",
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This habit will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/delete_habit/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setHabits((prev) => prev.filter((habit) => habit._id !== id));
              Swal.fire("Deleted!", "Your habit has been deleted.", "success");
            }
          })
          .catch((err) => {
            console.error("Error deleting habit:", err);
            Swal.fire({
              icon: "error",
              title: "Failed to delete!",
              text: "Please try again later.",
            });
          });
      }
    });
  };

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axios
      .get(`http://localhost:3000/my_habits?email=${user.email}`)
      .then((res) => setHabits(res.data))
      .catch((err) => {
        console.error("Error fetching habits:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to load habits!",
          text: "Please try again later.",
        });
      })
      .finally(() => setLoading(false));
  }, [user, setLoading]);

  return (
    <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100 md:px-10 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-8">
        📋 My Habits
      </h2>

      {loading ? (
        <Loading />
      ) : habits.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
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
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Streak</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit, i) => (
                <tr
                  key={habit._id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-3 px-4 font-medium text-primary">
                    {habit.title}
                  </td>
                  <td className="py-3 px-4">{habit.category}</td>
                  <td className="py-3 px-4 text-secondary font-semibold">
                    {habit.currentStreak || 0}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    {/* 🆕 Update Button */}
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

                    <button
                      className={`btn btn-xs md:btn-sm hover:text-white ${
                        habit.completed
                          ? "btn-success cursor-not-allowed opacity-60"
                          : "btn-outline btn-success"
                      }`}
                      disabled={habit.completed}
                    >
                      {habit.completed ? "Completed" : "Mark Complete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* 🆕 Update Habit Modal */}
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

              {/* 🧑 User info (read-only) */}
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
