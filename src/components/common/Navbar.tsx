// app/components/Navbar.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Quicksand } from 'next/font/google';
import { HiX } from 'react-icons/hi';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

const NavItems = [
  { name: 'Home', href: '/' },
  { name: 'Gamification', href: '/gamification' },
  { name: 'Rest Hub', href: '/resthub' },
  { name: 'Tale Ai', href: '/taleai' },
  { name: 'Community', href: '/community' },
];

export default function Navbar() {
  const [isLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${quicksand.variable} font-sans sticky top-0 w-full z-50 bg-white border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
            >
              Solvana
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-2 text-gray-600 transition-all duration-300 ease-in-out group"
                >
                  <span className="relative z-10 group-hover:text-primary-blue transition-colors duration-300">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-blue to-primary-purple transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button className="px-4 py-2 text-gray-600 hover:text-primary-blue transition-all duration-300 ease-in-out relative group">
                  <span className="relative z-10">Login</span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95">
                  Register
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-primary-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z" />
                  </svg>
                </button>
                <button className="text-gray-600 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-primary-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-blue"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <HiX className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary-blue hover:bg-gray-50 transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Auth Buttons for Mobile */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full mb-2 px-3 py-2 text-center rounded-md text-gray-600 hover:text-primary-blue hover:bg-gray-50 transition-all duration-200">
                  Login
                </button>
                <button className="w-full px-3 py-2 text-center rounded-md text-white bg-gradient-to-r from-primary-blue to-primary-purple hover:opacity-90 transition-all duration-200">
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}