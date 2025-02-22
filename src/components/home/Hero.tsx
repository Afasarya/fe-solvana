// components/home/Hero.tsx
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
<div className="relative min-h-screen bg-white flex items-center overflow-hidden">
{/* Main Content */}
<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
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
              <span className="text-gray-800">
                Mental Health Starts Here
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Join Solvana and discover a supportive path to emotional well-being through interactive experiences and personalized care.
            </p>
            {/* CTA Buttons */}
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

          {/* Single Large Floating Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center"
          >
            <motion.div
              animate={{ 
                y: [-20, 20, -20],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
              className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px]"
              >
              <Image
                src="/images/image-hero.png"
                alt="Mental Health Illustration"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}