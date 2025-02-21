// app/questioner/page.tsx
"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  type: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "How old are you?",
    subtitle: "This helps us personalize your experience",
    type: "number",
  },
  {
    id: 2,
    title: "What's your daily routine?",
    subtitle: "Tell us about your sleep schedule",
    type: "time",
  },
  {
    id: 3,
    title: "What are your hobbies?",
    subtitle: "Share activities that bring you joy",
    type: "text",
  },
  {
    id: 4,
    title: "What improves your mood?",
    subtitle: "Tell us what makes you feel better",
    type: "textarea",
  },
];

export default function Questioner() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: '',
    wakeTime: '',
    sleepTime: '',
    hobbies: '',
    moodBooster: '',
  });

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateAnswer = (field: string, value: string) => {
    setAnswers({ ...answers, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <main className="flex-1 container mx-auto px-4 pt-20 pb-8">
      {/* Progress Container */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Step Indicators */}
          <div className="relative flex justify-center items-center mb-6">
            {questions.map((q, index) => (
              <div key={q.id} className="flex items-center">
                <motion.div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    currentStep === q.id
                      ? 'bg-gradient-to-r from-primary-blue to-primary-purple'
                      : currentStep > q.id
                      ? 'bg-primary-blue'
                      : 'bg-gray-200'
                  }`}
                  animate={{
                    scale: currentStep === q.id ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep > q.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </motion.div>
                {index < questions.length - 1 && (
                  <div 
                    className={`w-16 h-0.5 mx-1 ${
                      currentStep > q.id + 1
                        ? 'bg-primary-blue'
                        : currentStep === q.id + 1
                        ? 'bg-gradient-to-r from-primary-blue to-gray-200'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-blue to-primary-purple"
              initial={{ width: '0%' }}
              animate={{ 
                width: `${((currentStep - 1) / (questions.length - 1)) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 md:p-8">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Question Header */}
                <div className="space-y-3 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
                    {questions[currentStep - 1].title}
                  </h2>
                  <p className="text-gray-600">
                    {questions[currentStep - 1].subtitle}
                  </p>
                </div>

                {/* Input Fields */}
                <div className="mt-8">
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <input
                        type="number"
                        placeholder="Enter your age"
                        value={answers.age}
                        onChange={(e) => updateAnswer('age', e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                        min="0"
                        max="120"
                      />
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Wake up time
                          </label>
                          <input
                            type="time"
                            value={answers.wakeTime}
                            onChange={(e) => updateAnswer('wakeTime', e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-gray-900"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Bedtime
                          </label>
                          <input
                            type="time"
                            value={answers.sleepTime}
                            onChange={(e) => updateAnswer('sleepTime', e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="What do you love to do?"
                        value={answers.hobbies}
                        onChange={(e) => updateAnswer('hobbies', e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <textarea
                        rows={4}
                        placeholder="Share what makes you feel better..."
                        value={answers.moodBooster}
                        onChange={(e) => updateAnswer('moodBooster', e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 resize-none text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrevious}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl ${
                  currentStep === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'text-gray-600 hover:text-primary-blue'
                }`}
                disabled={currentStep === 1}
              >
                <HiArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={currentStep === questions.length ? () => console.log(answers) : handleNext}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple text-white"
              >
                <span>{currentStep === questions.length ? 'Submit' : 'Next'}</span>
                {currentStep !== questions.length && <HiArrowRight className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}