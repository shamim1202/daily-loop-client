import { motion } from "framer-motion";
import { useContext } from "react";
import { FaBell, FaChartLine, FaRegClipboard, FaUsers } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../Loading/Loading";

const steps = [
  {
    title: "Create Your Habit",
    description:
      "Add a new habit with a title, category, and optional description. Set your daily goal and start tracking!",
    icon: <FaRegClipboard className="w-5 h-5 md:w-8 md:h-8 text-white" />,
    bgColor: "bg-blue-500",
  },
  {
    title: "Set Reminders",
    description:
      "Daily Loop sends notifications to keep you on track with your habits.",
    icon: <FaBell className="w-5 h-5 md:w-8 md:h-8 text-white" />,
    bgColor: "bg-green-500",
  },
  {
    title: "Track Your Progress",
    description:
      "Check off completed tasks and visualize your streaks to see long-term progress.",
    icon: <FaChartLine className="w-5 h-5 md:w-8 md:h-8 text-white" />,
    bgColor: "bg-purple-500",
  },
  {
    title: "Join the Community",
    description:
      "Explore public habits, get inspired by others, and share your progress.",
    icon: <FaUsers className="w-5 h-5 md:w-8 md:h-8 text-white" />,
    bgColor: "bg-yellow-500",
  },
];

const HowItWorks = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div className="md:max-w-5xl mx-auto px-6 md:px-12">
      {loading ? (
        <Loading></Loading>
      ) : (
        <section>
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-secondary">
              Daily Loop Workflow
            </h2>
            <p className="text-gray-600 mt-4 md:text-xl">
              Follow these 4 simple steps to start building your daily habit
              loop.
            </p>
          </div>

          {/* Vertical Step Flow */}
          <div className="relative border-l-2 border-gray-300 ml-4 md:ml-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="mb-8 ml-6 md:ml-12 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Step Number / Icon */}
                <div
                  className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full ${step.bgColor} text-white md:font-bold`}
                >
                  {step.icon}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="text-primary md:text-xl font-semibold mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HowItWorks;
