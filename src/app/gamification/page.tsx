// app/gamification/page.tsx
"use client";
import { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import PetDisplay from '@/components/pet/PetDisplay';
import QuestCard from '@/components/quest/QuestCard';
import { motion } from 'framer-motion';

const samplePet = {
  name: "Mochi",
  avatar: "/pets/mochi.png",
  level: 5,
  exp: 3, // Streak count
  maxExp: 7, // Weekly streak target
  stage: 2 as const,
  mood: 'happy' as const,
};

const sampleQuests = [
  {
    id: "1",
    title: "Morning Meditation",
    description: "Start your day with a 5-minute guided meditation",
    videoUrl: "/videos/meditation.mp4",
    thumbnailUrl: "/thumbnails/meditation.jpg",
    expReward: 1, // +1 streak
    progress: 0,
    completed: false,
  },
  {
    id: "2",
    title: "Breathing Exercise",
    description: "Learn deep breathing techniques for stress relief",
    videoUrl: "/videos/breathing.mp4",
    thumbnailUrl: "/thumbnails/breathing.jpg",
    expReward: 1, // +1 streak
    progress: 0,
    completed: false,
  },
  {
    id: "3",
    title: "Evening Reflection",
    description: "End your day with mindful reflection",
    videoUrl: "/videos/reflection.mp4",
    thumbnailUrl: "/thumbnails/reflection.jpg",
    expReward: 1, // +1 streak
    progress: 0,
    completed: false,
  },
];

export default function GamificationPage() {
  const [pet, setPet] = useState(samplePet);
  const [quests, setQuests] = useState(sampleQuests);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-blue to-primary-purple">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Daily Wellness Journey
            </h1>
            <p className="text-base md:text-lg opacity-90">
              Complete activities to maintain your streak and help your companion grow
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Pet Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-4 md:p-6"
            >
              <PetDisplay 
                pet={pet}
                onLevelUp={() => {
                  setPet(prev => ({
                    ...prev,
                    level: prev.level + 1,
                    exp: 0,
                  }));
                }}
              />
            </motion.div>
          </div>

          {/* Quests Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Daily Quests
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Current Streak:</span>
                  <span className="font-bold text-primary-blue">{pet.exp} days</span>
                </div>
              </div>
              
              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                {quests.map(quest => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={(questId) => {
                      setQuests(prev => prev.map(q => 
                        q.id === questId ? { ...q, completed: true, progress: 100 } : q
                      ));
                      setPet(prev => ({
                        ...prev,
                        exp: Math.min(prev.exp + 1, prev.maxExp)
                      }));
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}