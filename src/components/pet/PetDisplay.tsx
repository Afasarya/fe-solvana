// components/gamification/PetDisplay.tsx
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSparkles, HiStar, HiHeart } from 'react-icons/hi';
import Image from 'next/image';

interface PetDisplayProps {
  pet: {
    name: string;
    stage: 1 | 2 | 3;
    level: number;
    exp: number;
    maxExp: number;
    avatar: string;
    mood: 'happy' | 'neutral' | 'sad';
  };
  onLevelUp?: () => void;
}

const stageConfig = {
  1: {
    color: 'from-blue-400 to-blue-600',
    badge: '🌱 Seedling',
    scale: 0.8
  },
  2: {
    color: 'from-purple-400 to-purple-600',
    badge: '🌸 Growing',
    scale: 1
  },
  3: {
    color: 'from-pink-400 to-pink-600',
    badge: '🌟 Blooming',
    scale: 1.2
  }
};

const EvolutionParticles = () => (
  <div className="absolute inset-0">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          x: 0, 
          y: 0, 
          scale: 0,
          opacity: 1 
        }}
        animate={{
          x: Math.cos(i * 30) * 100,
          y: Math.sin(i * 30) * 100,
          scale: 1.5,
          opacity: 0
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-yellow-400"
      />
    ))}
  </div>
);

export default function PetDisplay({ pet, onLevelUp }: PetDisplayProps) {
  const [isEvolving, setIsEvolving] = useState(false);
  const config = stageConfig[pet.stage];

  useEffect(() => {
    if (pet.exp >= pet.maxExp) {
      setIsEvolving(true);
      setTimeout(() => {
        setIsEvolving(false);
        onLevelUp?.();
      }, 2000);
    }
  }, [pet.exp, pet.maxExp, onLevelUp]);

  return (
    <div className="relative w-full max-w-sm mx-auto p-6">
      {/* Pet Container */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r ${config.color}`} />

        {/* Pet Avatar */}
        <div className="relative w-48 h-48 mx-auto">
          <motion.div
            animate={{ scale: config.scale }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={pet.avatar}
              alt={pet.name}
              width={192}
              height={192}
              className="object-contain"
            />
          </motion.div>

          {/* Mood Indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg"
          >
            {pet.mood === 'happy' && <HiHeart className="w-6 h-6 text-pink-500" />}
            {pet.mood === 'neutral' && <span className="text-2xl">😊</span>}
            {pet.mood === 'sad' && <span className="text-2xl">😢</span>}
          </motion.div>
        </div>

        {/* Evolution Effect */}
        <AnimatePresence>
          {isEvolving && <EvolutionParticles />}
        </AnimatePresence>
      </motion.div>

      {/* Pet Info */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
          {pet.name}
        </h3>

        {/* Stage Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-2 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-sm border border-white/20 shadow-lg"
        >
          <HiSparkles className="w-5 h-5 text-yellow-400 mr-2" />
          <span className="text-sm font-medium text-gray-800">
            {config.badge}
          </span>
        </motion.div>

        {/* Level Display */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          <HiStar className="w-5 h-5 text-yellow-400" />
          <span className="text-lg font-bold text-gray-800">
            Level {pet.level}
          </span>
        </div>

        {/* Exp Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">EXP</span>
            <span className="font-medium text-primary-blue">
              {pet.exp}/{pet.maxExp}
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${(pet.exp / pet.maxExp) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
              className={`h-full bg-gradient-to-r ${config.color}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}