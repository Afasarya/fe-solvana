// components/home/Faq.tsx
"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

const faqs = [
  {
    question: "What is Solvana and how does it work?",
    answer: "Solvana is a mental health platform that combines AI support, daily activities, and community features to help you maintain and improve your mental well-being. Through interactive quests, chat support, and gamified elements, we make mental health care engaging and accessible."
  },
  {
    question: "Is my data kept private and secure?",
    answer: "Yes, absolutely. We take your privacy seriously. All data is encrypted, stored securely, and never shared with third parties. Our platform complies with all relevant data protection regulations to ensure your information stays confidential."
  },
  {
    question: "Can I use Solvana alongside traditional therapy?",
    answer: "Yes! Solvana is designed to complement traditional therapy. While we're not a replacement for professional mental health care, our platform can provide additional support and tools for your mental health journey."
  },
  {
    question: "What kind of support can I expect?",
    answer: "Solvana offers 24/7 AI chat support, daily wellness activities, community forums, and gamified quests. Our AI companion is always available to listen and provide support, while our community features let you connect with others on similar journeys."
  },
  {
    question: "How do the rewards and streaks work?",
    answer: "As you complete daily activities and maintain consistent engagement, you'll earn rewards and build streaks. These help track your progress and motivate you to maintain healthy habits. Longer streaks unlock special features and achievements."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about Solvana
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors duration-300"
                whileHover={{ scale: 1.002 }}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-6 pt-0">
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-600"
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}