"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X, Pencil } from "lucide-react";
import { Button } from "@repo/ui/button";
import { useTheme } from "@/components/theme-provider";
import Link from "next/link";
import { removeTokenCookie } from "@/lib/cookie";

export function Navbar({isLoggedIn} : {isLoggedIn : boolean}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300  ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Pencil className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">Draw-Meetings</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link
              href="#features"
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="dark:border-white/30 border-black/30  dark:bg-black bg-white/30 relative size-8"
            >
              <Sun className="absolute size-5 rotate-0 scale-100  transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-5 rotate-90  scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            {!isLoggedIn ? (
              <>
                <Link href="/signin">
                  <Button className="dark:border-white/30 border-black/30 hover:bg-white dark:hover:bg-gray-900  dark:bg-black bg-white/30 relative text-black dark:text-white hover:text-blue-600  px-3 py-2">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-300 dark:text-white text-blue-100 ">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
                <>
               
              <Button
                className="dark:border-white/30 border-black/30 hover:bg-white dark:hover:bg-gray-900  dark:bg-black bg-white/30 relative text-black dark:text-white hover:text-blue-600  px-3 py-2"
                onClick={removeTokenCookie}
              >
                Logout
              </Button>
              <Link href="/join-room">
              <Button
                className="bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-300 dark:text-white text-blue-100"
              >
                Join Room
              </Button>
              </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="dark:border-white/30 border-black/30  dark:bg-black bg-white/30 relative"
            >
              <Sun className=" absolute size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-5  rotate-90  scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="dark:border-white/30 border-black/30  dark:bg-black bg-white/30 relative"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 absolute" />
              ) : (
                <Menu className="h-6 w-6 absolute" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white dark:bg-black border-t dark:border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 flex justify-center items-center flex-col ">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Home
            </Link>
            <Link
              href="#features"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              About
            </Link>
            {!isLoggedIn ? (
              <>
                <Link
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Get Started
                </Link>
              </>
            ) : (
                <>
              <div
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen) ; removeTokenCookie()}}
              >
                Logout
              </div>
              <Link
                  href="/join-room"
                  className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  Join room 
                </Link>
                </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
