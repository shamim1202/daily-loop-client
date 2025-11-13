import { motion } from "framer-motion";
import FeaturedHabits from "../../components/FeaturedHabits/FeaturedHabits";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import MiniLeaderboard from "../../components/MiniLeaderboard/MiniLeaderboard";
import TestimonialCarousel from "../../components/TestimonialCarousel/TestimonialCarousel";
import WhyBuildHabits from "../../components/WhyBuildHabits/WhyBuildHabits";
import { usePageTitle } from "../../hooks/usePageTitle";

const Home = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
  };

  usePageTitle("Home")

  return (
    <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100 space-y-12 md:space-y-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSlider />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <FeaturedHabits />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <WhyBuildHabits />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <TestimonialCarousel />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <HowItWorks />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <MiniLeaderboard />
      </motion.div>
    </div>
  );
};

export default Home;
