// src/components/Loading.jsx
import { AnimatePresence, motion } from "framer-motion";
import { FadeLoader } from "react-spinners";

const Loading = ({ message = "Loading...", color = "#3B82F6", size = 20 }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
      >
        <FadeLoader
          color={color}
          loading={true}
          height={size}
          width={4}
          radius={2}
          margin={2}
        />
        <p className="mt-4 text-gray-700 text-lg">{message}</p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
