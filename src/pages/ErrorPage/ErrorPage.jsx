import { motion } from "framer-motion";
import { Link } from "react-router";
import { usePageTitle } from "../../hooks/usePageTitle";

const ErrorPage = () => {
  usePageTitle("Error- Page not found");

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-r from-sky-100 via-pink-100 to-violet-100 p-6">
      <section className="max-w-6xl w-full bg-linear-to-r from-sky-50 via-pink-50 to-violet-50 rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Illustration */}
        <div className="flex items-center justify-center p-4 md:p-12">
          <motion.div
            initial={{ y: -8 }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="max-w-md w-full"
          >
            <img
              src="https://i.ibb.co.com/xb2YCN9/monster-404-page.png"
              alt="Error illustration"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Text & actions */}
        <div className="p-4 md:p-12 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-xl md:text-4xl font-semibold md:font-extrabold text-gray-900 dark:text-gray-100">
            Oops! Page not found
          </h1>
          <p className="mt-3 md:mt-5 text-xs md:text-base text-gray-600 dark:text-gray-300">
            Sorry, we couldn’t find the page you were looking for.
          </p>
          <div className="mt-3 md:mt-8">
            <Link
              to="/"
              className="text-xs md:text-base inline-flex items-center justify-center px-3 py-1.5 md:px-6 md:py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
