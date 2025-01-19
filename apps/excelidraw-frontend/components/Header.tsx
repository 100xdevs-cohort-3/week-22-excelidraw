"use client";
import { Button } from "@repo/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Replace with your actual authentication logic
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-sm bg-white/10 text-white"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-custom-green-text">
          100xDraws
        </Link>
        
        {isLoggedIn ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-custom-green-text text-white px-6 py-2 rounded-lg"
          >
            Start Drawing
          </motion.button>
        ) : (
          <div className="flex gap-4">
            <Link href="/signup" className="bg-custom-green-text text-black px-6 py-2 rounded-lg">
              Sign Up
            </Link>
            <Link href="/signin" className="bg-custom-green-text text-black px-6 py-2 rounded-lg">
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;