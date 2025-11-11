import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

const PublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("http://localhost:3000/public_habits");
        const data = await res.json();
        setHabits(data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, []);

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesCategory =
        selectedCategory === "All" || habit.category === selectedCategory;

      const matchesSearch =
        habit.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        habit.description?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [habits, selectedCategory, searchTerm]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  const categories = ["All", "Morning", "Work", "Fitness", "Evening", "Study"];

  return (
    <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 md:p-8"
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          🌿 Public Habits
        </h1>

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
              {filteredHabits.map((habit, i) => (
                <tr
                  key={habit._id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {habit.userName || "Anonymous"}
                  </td>
                  <td className="py-3 px-4 font-medium text-blue-600">
                    {habit.title}
                  </td>
                  <td className="py-3 px-4">{habit.category}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {habit.currentStreak || 0}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => navigate(`/habit_details/${habit._id}`)}
                      className="btn btn-xs md:btn-sm btn-outline btn-primary text-primary hover:text-white rounded-lg transition"
                    >
                      See Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PublicHabits;
