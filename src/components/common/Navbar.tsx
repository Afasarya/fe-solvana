// app/components/Navbar.tsx
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

const NavItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isLoggedIn] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed w-full z-50 bg-[#F5F5F5] shadow-sm ${quicksand.variable}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
              Solvana
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-2 text-gray-600 hover:text-primary-blue transition-colors duration-200 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-blue to-primary-purple transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button className="px-4 py-2 text-gray-600 hover:text-primary-blue transition-colors duration-200">
                  Login
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg hover:opacity-90 transition-colors duration-200">
                  Register
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-primary-blue transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z" />
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-primary-blue transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-primary-blue transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}