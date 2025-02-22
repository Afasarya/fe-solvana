// components/home/Features.tsx
"use client";
import { motion } from 'framer-motion';
import { HiHeart, HiLightningBolt, HiChat, HiUsers, HiPuzzle, HiSparkles } from 'react-icons/hi';

const features = [
  {
    icon: <HiHeart className="w-8 h-8" />,
    title: "Mental Health Tracking",
    description: "Monitor your emotional well-being with daily check-ins and mood tracking"
  },
  {
    icon: <HiChat className="w-8 h-8" />,
    title: "24/7 AI Support",
    description: "Get instant support from our AI companion whenever you need someone to talk to"
  },
  {
    icon: <HiPuzzle className="w-8 h-8" />,
    title: "Interactive Activities",
    description: "Engage in therapeutic activities designed to improve your mental wellness"
  },
  {
    icon: <HiUsers className="w-8 h-8" />,
    title: "Supportive Community",
    description: "Connect with others on similar journeys in a safe, moderated environment"
  },
  {
    icon: <HiLightningBolt className="w-8 h-8" />,
    title: "Daily Quests",
    description: "Complete engaging challenges that promote positive mental health habits"
  },
  {
    icon: <HiSparkles className="w-8 h-8" />,
    title: "Rewards System",
    description: "Earn rewards and track your progress as you develop healthy habits"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
              Features Designed for Your Well-being
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Discover tools and features that support your mental health journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 flex items-center justify-center text-primary-blue"
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      
      </div>
    </section>
  );
}