import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const AddHabit = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  // Add a habit submit button function --------------------->
  const handleAddHabit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newHabit = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      reminderTime: form.reminderTime.value,
      imageUrl: form.imageUrl.value,
      userEmail: user?.email,
      userName: user?.displayName,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("https://your-backend-server.com/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHabit),
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Habit Added Successfully!",
          text: `${newHabit.title} has been added to your loop.`,
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add Habit",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to server. Please try later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:max-w-7xl mx-auto min-h-screen bg-linear-to-r from-blue-100 via-purple-100 to-green-100 flex justify-center items-center py-6 md:py-14">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl md:text-5xl font-bold text-center text-secondary mb-8">
          Add A New Habit
        </h1>

        <form onSubmit={handleAddHabit} className="space-y-5">
          {/* ------------ Habit Title ------------ */}
          <div>
            <label className="block font-semibold text-gray-700">
              Habit Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Morning Meditation"
              required
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Describe your habit..."
              required
              className="textarea textarea-bordered w-full mt-1"
            ></textarea>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              className="select select-bordered w-full mt-1"
              required
            >
              <option value="">Select Category</option>
              <option value="Morning">Morning</option>
              <option value="Work">Work</option>
              <option value="Fitness">Fitness</option>
              <option value="Evening">Evening</option>
              <option value="Study">Study</option>
            </select>
          </div>

          {/* Reminder Time */}
          <div>
            <label className="block font-semibold text-gray-700">
              Reminder Time
            </label>
            <input
              type="time"
              name="reminderTime"
              required
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              placeholder="https://example.com/habit.jpg"
              required
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700">
                User Name
              </label>
              <input
                type="text"
                value={user?.displayName || "Anonymous"}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700">
                User Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-secondary w-full md:w-1/2"
            >
              {loading ? "Adding..." : "Add Habit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;
