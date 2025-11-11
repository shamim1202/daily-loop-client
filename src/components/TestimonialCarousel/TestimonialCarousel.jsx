import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah J.",
    text: "Daily Loop helped me build a consistent morning routine. I feel more productive every day!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Michael B.",
    text: "Tracking my habits has never been easier. I love seeing my streak grow!",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Emma W.",
    text: "I discovered so many public habits for inspiration. Daily Loop keeps me motivated.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "James K.",
    text: "The reminders are perfect. I rarely forget to complete my habits now.",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Olivia P.",
    text: "Seeing my progress visually has made building habits enjoyable and rewarding!",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const total = testimonials.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  // Auto-slide
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [total]);

  const pause = () => clearInterval(intervalRef.current);
  const resume = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-5xl text-secondary font-bold text-center mb-12">
        What Our Users Say
      </h2>

      <div
        ref={carouselRef}
        className="relative w-full flex justify-center items-center min-h-48 md:min-h-72"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {/* Main Card + Back Cards */}
        {testimonials.map((t, index) => {
          let position = index - current;
          if (position < -Math.floor(total / 2)) position += total;
          if (position > Math.floor(total / 2)) position -= total;

          const isMain = position === 0;
          const isPrev = position === -1;
          const isNext = position === 1;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                zIndex: isMain ? 20 : 10,
                scale: isMain ? 1 : window.innerWidth < 768 ? 0.6 : 0.8,
                x: position * (window.innerWidth < 768 ? 80 : 180),
                opacity: Math.abs(position) > 1 ? 0 : 1,
                rotateY: position * 10,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bg-white rounded-2xl shadow-lg w-36 md:w-80 p-2 md:p-6 text-center cursor-pointer"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-8 h-8 md:w-16 md:h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 text-xs md:text-base italic">
                "{t.text}"
              </p>
              <p className="text-sm md:text-base mt-2 md:mt-4 font-semibold text-gray-900">
                {t.name}
              </p>
            </motion.div>
          );
        })}

        {/* Navigation */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition z-30"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition z-30"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
