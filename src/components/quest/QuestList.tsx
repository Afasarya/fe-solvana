// components/gamification/PetDisplay.tsx
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HiSparkles } from 'react-icons/hi';

interface PetDisplayProps {
  pet: {
    id: string;
    name: string;
    imageUrl: string;
    level: number;
    exp: number;
    maxExp: number;
    stage: number;
    totalStages: number;
  };
  onLevelUp?: () => void;
}

const stageColors = {
  1: 'from-blue-400 to-blue-600',
  2: 'from-purple-400 to-purple-600',
  3: 'from-pink-400 to-pink-600',
  4: 'from-yellow-400 to-yellow-600',
};

const Particle = ({ index }: { index: number }) => (
  <motion.div
    initial={{ 
      x: 0, 
      y: 0, 
      scale: 0,
      opacity: 1 
    }}
    animate={{ 
      x: Math.random() * 100 - 50,
      y: Math.random() * -100 - 50,
      scale: Math.random() * 0.5 + 0.5,
      opacity: 0 
    }}
    transition={{ duration: 1 }}
    className="absolute w-2 h-2 rounded-full bg-yellow-400"
    style={{
      left: `${50 + Math.cos(index * (Math.PI * 2 / 12)) * 20}%`,
      top: `${50 + Math.sin(index * (Math.PI * 2 / 12)) * 20}%`,
    }}
  />
);

export default function PetDisplay({ pet, onLevelUp }: PetDisplayProps) {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (pet.exp >= pet.maxExp) {
      setShowParticles(true);
      onLevelUp?.();
      setTimeout(() => setShowParticles(false), 2000);
    }
  }, [pet.exp, pet.maxExp, onLevelUp]);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
        className="relative"
      >
        <div className={`absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r ${stageColors[pet.stage as keyof typeof stageColors]}`} />
        
        <div className="relative w-48 h-48 mx-auto">
          <Image
            src={pet.imageUrl}
            alt={pet.name}
            fill
            className="object-contain"
          />
        </div>

        <AnimatePresence>
          {showParticles && (
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <Particle key={i} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
          {pet.name}
        </h3>
        
        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm">
          <HiSparkles className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-sm font-medium text-yellow-500">
            Level {pet.level}
          </span>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {[...Array(pet.totalStages)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`w-3 h-3 rounded-full ${
                index < pet.stage 
                  ? `bg-gradient-to-r ${stageColors[index + 1 as keyof typeof stageColors]}` 
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="mt-4 px-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">EXP</span>
            <span className="font-medium text-primary-blue">
              {pet.exp}/{pet.maxExp}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(pet.exp / pet.maxExp) * 100}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full bg-gradient-to-r ${stageColors[pet.stage as keyof typeof stageColors]}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}