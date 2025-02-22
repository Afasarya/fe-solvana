// components/home/Hero.tsx
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-white flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary-blue rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-primary-purple rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
                Your Journey to Better
              </span>
              <br />
              <span className="text-gray-800"> {/* Changed from default to explicit dark color */}
                Mental Health Starts Here
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Join Solvana and discover a supportive path to emotional well-being through interactive experiences and personalized care.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-x-4"
            >
              <Link
                href="/register"
                className="inline-block bg-gradient-to-r from-primary-blue to-primary-purple text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="inline-block px-8 py-3 rounded-full font-medium text-primary-blue hover:bg-primary-blue/5 transition-colors duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <motion.div
                animate={{ 
                  y: [-10, 10, -10], 
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/illustrations/hero-illustration.svg"
                  alt="Mental Health Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            <motion.div
              animate={{ 
                y: [-5, 5, -5], 
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
              className="absolute top-0 right-0 w-20 h-20 text-primary-purple opacity-50"
            >
              <Image
                src="/illustrations/shape-1.svg"
                alt="Decorative Shape"
                fill
                className="object-contain"
              />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [5, -5, 5], 
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut"
              }}
              className="absolute bottom-0 left-0 w-16 h-16 text-primary-blue opacity-50"
            >
              <Image
                src="/illustrations/shape-2.svg"
                alt="Decorative Shape"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}