import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../Loading/Loading";

const slides = [
  {
    id: 1,
    title: "Build Better Habits, One Day at a Time",
    desc: "Daily Loop helps you stay consistent by focusing on small, daily actions that shape who you become. Each loop you complete builds confidence and momentum toward lasting change.",
    img: "https://i.ibb.co.com/wfc8wSm/Build-Better-Habits-One-Day-at-a-Time.jpg",
  },
  {
    id: 2,
    title: "Stay Consistent, Stay Motivated",
    desc: "Track your progress and celebrate every streak — because every day counts. Stay inspired with reminders and reflections that keep your motivation loop alive and strong.",
    img: "https://i.ibb.co.com/Znfyq5C/habit-streak-calendar-check-marks.jpg",
  },
  {
    id: 3,
    title: "Visualize Your Growth",
    desc: "See your progress unfold with visual charts and habit insights that make success tangible. Daily Loop turns your goals into clear, measurable milestones you can be proud of.",
    img: "https://i.ibb.co.com/R44QJ0hD/Visualize-Your-Growth.jpg",
  },
  {
    id: 4,
    title: "Small Steps, Big Results",
    desc: "Start with one small change, and watch it ripple through your life. Daily Loop empowers you to build momentum with micro-habits that lead to massive transformation over time.",
    img: "https://i.ibb.co.com/39PVbmbx/Small-Steps-Big-Results.jpg",
  },
  {
    id: 5,
    title: "Your Journey to Productivity Starts Here",
    desc: "Take control of your time and focus with tools designed to simplify your day. With Daily Loop, productivity becomes effortless — one meaningful loop at a time.",
    img: "https://i.ibb.co.com/TM3Kmf3M/Your-Journey-to-Productivity-Starts-Here.jpg",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const { loading } = useContext(AuthContext);

  // Auto-slide every 8 seconds ------------------------>
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded shadow-xl my-8 md:my-14">
      {loading ? (
        <Loading></Loading>
      ) : (
        <section>
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image */}
              <img
                src={slides[current].img}
                alt={slides[current].title}
                className="w-full h-full object-cover brightness-70"
              />

              {/* Overlay Text */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 bg-black/40">
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-2xl md:text-4xl font-bold mb-4"
                >
                  <Typewriter
                    words={[slides[current].title]}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={50}
                  />
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-sm md:text-base max-w-2xl"
                >
                  {slides[current].desc}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-1.5 h-1.5 md:w-3 md:h-3 rounded-full transition-all ${
                  current === index ? "bg-white scale-125" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HeroSlider;
