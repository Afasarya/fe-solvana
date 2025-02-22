"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiCheck } from 'react-icons/hi';
import VideoPlayer from './VideoPlayer';
import { Quest } from '@/types/gamification';

interface QuestCardProps {
  quest: Quest;
  onComplete: (questNumber: number) => void;
}

export default function QuestCard({ quest, onComplete }: QuestCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  // Extract video ID from YouTube URL
  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative">
        {/* Thumbnail */}
        <div className="relative h-48 w-full">
          <img
            src={getYouTubeThumbnail(quest.url)}
            alt={quest.title}
            className="w-full h-full object-cover"
          />
          {quest.status === 'PENDING' && (
            <button
              onClick={() => setShowVideo(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <HiPlay className="w-6 h-6 text-white" />
              </div>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">{quest.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{quest.description}</p>

          {/* Status */}
          {quest.status === 'COMPLETED' ? (
            <div className="flex items-center text-green-500 font-medium">
              <HiCheck className="w-5 h-5 mr-2" />
              Completed
              {quest.completedAt && (
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(quest.completedAt).toLocaleTimeString()}
                </span>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowVideo(true)}
              className="w-full py-2 px-4 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Start Meditation
            </button>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <VideoPlayer
        videoUrl={quest.url}
        onComplete={() => onComplete(quest.questNumber)}
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
      />
    </motion.div>
  );
}