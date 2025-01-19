"use client";
import { motion } from "framer-motion";
import GridPattern from "./GridPattern";

const Hero = () => {
  return (
    <>
      <GridPattern />
      <div className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 pt-32 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-custom-green-text to-custom-green-bg bg-clip-text text-transparent">
              Create, Collaborate, and Share Beautiful Diagrams
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              The most intuitive drawing tool for teams. Create professional
              diagrams, wireframes, and illustrations with our powerful yet
              simple interface.
            </p>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-custom-green-text text-white px-8 py-3 rounded-lg text-lg font-semibold"
              >
                Try Now - It's Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-custom-green-text text-custom-green-text px-8 py-3 rounded-lg text-lg font-semibold"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
