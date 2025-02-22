// components/home/Testimonial.tsx
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Student",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
    text: "Solvana has been a game-changer for my mental health journey. The daily activities and supportive AI companion have helped me develop better coping mechanisms.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Professional",
    avatar: "/avatars/michael.jpg",
    rating: 5,
    text: "What I love most about Solvana is how it gamifies mental wellness. The quest system makes it fun to maintain good habits and take care of myself.",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Teacher",
    avatar: "/avatars/emma.jpg",
    rating: 5,
    text: "The community aspect of Solvana is incredible. It's comforting to know you're not alone on your journey to better mental health.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      navigate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Join thousands of people improving their mental well-being
          </p>
        </motion.div>

        <div className="relative">
          <div className="relative h-[400px] w-full max-w-3xl mx-auto">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-primary-blue to-primary-purple rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">&quot;</span>
                  </div>

                  <div className="space-y-6">
                    <p className="text-gray-600 text-lg italic">
                      {testimonials[activeIndex].text}
                    </p>

                    <div className="flex items-center space-x-1">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                      ))}
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonials[activeIndex].avatar}
                          alt={testimonials[activeIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className="text-gray-600">
                          {testimonials[activeIndex].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-blue transition-colors"
            >
              <HiChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(1)}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-blue transition-colors"
            >
              <HiChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}