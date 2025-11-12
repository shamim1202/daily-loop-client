import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const FeaturedHabits = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  //   View details button
  const handleViewDetails = (id) => {
    if (user) {
      navigate(`/habit_details/${id}`);
    } else {
      Swal.fire({
        icon: "info",
        title: "Please log in first",
        text: "You need to log in to view habit details.",
        showConfirmButton: false,
        timer: 3000,
      });

      navigate("/auth/login", { state: { from: `/habit_details/${id}` } });
    }
  };

  useEffect(() => {
    setHabits([]);
    setLoading(true);
    axios
      .get("http://localhost:3000/featured_habits")
      .then((data) => {
        const featuredItem = data.data;
        console.log(featuredItem);
        setHabits(featuredItem);
      })
      .catch((err) => {
        console.log("error from fetching data", err);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-secondary mb-8">
        Featured Habits
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading habits...</p>
      ) : habits.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No habits added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit, i) => (
            <motion.div
              key={habit._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {/* --------- Photo -------- */}
              <div>
                <img
                  src={habit.imageUrl || "No Image Found"}
                  alt={habit.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {habit.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 md:h-10">
                  {habit.description}
                </p>

                <div className="flex justify-between items-center text-xs md:text-sm text-gray-500 mb-2">
                  <p>
                    <span className="text-gray-700 font-semibold">By :</span> {habit.userName}
                  </p>
                </div>
                <button
                  onClick={() => handleViewDetails(habit._id)}
                  className="btn btn-outline btn-primary btn-sm md:btn-md w-full"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedHabits;
