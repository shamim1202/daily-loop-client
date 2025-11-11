import { motion } from "framer-motion";
import { FaBell, FaChartLine, FaRegClipboard, FaUsers } from "react-icons/fa";

const steps = [
  {
    title: "Create Your Habit",
    description:
      "Add a new habit with a title, category, and optional description. Set your daily goal and start tracking!",
    icon: <FaRegClipboard className="w-8 h-8 text-white" />,
    bgColor: "bg-blue-500",
  },
  {
    title: "Set Reminders",
    description:
      "Daily Loop sends notifications to keep you on track with your habits.",
    icon: <FaBell className="w-8 h-8 text-white" />,
    bgColor: "bg-green-500",
  },
  {
    title: "Track Your Progress",
    description:
      "Check off completed tasks and visualize your streaks to see long-term progress.",
    icon: <FaChartLine className="w-8 h-8 text-white" />,
    bgColor: "bg-purple-500",
  },
  {
    title: "Join the Community",
    description:
      "Explore public habits, get inspired by others, and share your progress.",
    icon: <FaUsers className="w-8 h-8 text-white" />,
    bgColor: "bg-yellow-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-secondary">
          How It Works
        </h2>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Follow these 4 simple steps to start building your daily habit loop.
        </p>
      </div>

      {/* Vertical Step Flow */}
      <div className="relative border-l-2 border-gray-300 ml-6 md:ml-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="mb-4 md:mb-8 ml-6 md:ml-12 flex flex-col md:flex-row items-start md:items-center gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Step Number / Icon */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${step.bgColor} text-white font-bold`}
            >
              {step.icon}
            </div>

            {/* Step Content */}
            <div className="flex-1">
              <h3 className="text-primary text-lg md:text-2xl font-semibold mb-1">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
