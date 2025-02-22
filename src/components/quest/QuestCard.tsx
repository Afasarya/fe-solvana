// components/gamification/QuestCard.tsx
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiCheck, HiStar, HiX } from 'react-icons/hi';
import Image from 'next/image';
import VideoPlayer from '@/components/quest/VideoPlayer'; // Adjust the import path as necessary

interface QuestCardProps {
  quest: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    expReward: number;
    progress: number;
    completed: boolean;
  };
  onComplete: (questId: string) => void;
}

export default function QuestCard({ quest, onComplete }: QuestCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-blue to-primary-purple rounded-2xl blur opacity-25 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6">
          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <HiStar className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-600">
              +{quest.expReward} Streak
            </span>
          </div>

          <div className="relative h-48 -mx-6 -mt-6 mb-6">
            <Image
              src={quest.thumbnailUrl}
              alt={quest.title}
              fill
              className="object-cover"
            />
            {!quest.completed && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <HiPlay className="w-6 h-6 text-white" />
                </div>
              </motion.button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-blue transition-colors duration-300">
                {quest.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {quest.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-primary-blue">
                  {quest.progress}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${quest.progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary-blue to-primary-purple"
                />
              </div>
            </div>

            {quest.completed ? (
              <div className="flex items-center space-x-2 text-green-500">
                <HiCheck className="w-5 h-5" />
                <span className="font-medium">Completed</span>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowVideo(true)}
                className="w-full py-2 px-4 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
              >
                Start Quest
              </motion.button>
            )}
          </div>
        </div>

        {showVideo && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <HiX className="w-6 h-6" />
            </button>
            <VideoPlayer
              videoUrl={quest.videoUrl}
              isOpen={showVideo}
              onClose={() => setShowVideo(false)}
              onComplete={() => {
                onComplete(quest.id);
                setShowVideo(false);
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}