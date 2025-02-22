"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSparkles, HiStar } from 'react-icons/hi';
import Image from 'next/image';
import { Pet } from '@/types/gamification';

interface PetDisplayProps {
  pet: Pet;
}

const stageConfig = {
  EGG: {
    image: '/telur-naga.png',
    color: 'from-blue-400 to-blue-600',
    badge: '🥚 Egg Stage',
    description: 'Your companion is still in its egg. Keep up your daily wellness activities!'
  },
  BABY: {
    image: '/telur-menetas.png',
    color: 'from-green-400 to-green-600',
    badge: '🐣 Baby Dragon',
    description: 'Your dragon has hatched! Continue your journey together.'
  },
  TEEN: {
    image: '/naga-sedang.png',
    color: 'from-purple-400 to-purple-600',
    badge: '🐲 Teen Dragon',
    description: 'Growing stronger each day! Keep up the great work!'
  },
  ADULT: {
    image: '/naga-besar.png',
    color: 'from-pink-400 to-pink-600',
    badge: '🐉 Adult Dragon',
    description: 'Your dragon has reached its final form! Magnificent!'
  }
};

export default function PetDisplay({ pet }: PetDisplayProps) {
  const [showEvolutionEffect, setShowEvolutionEffect] = useState(false);
  const config = stageConfig[pet.stage];

  useEffect(() => {
    if (pet.nextEvolution?.progress === 100) {
      setShowEvolutionEffect(true);
      const timer = setTimeout(() => setShowEvolutionEffect(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [pet.nextEvolution?.progress]);

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

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut" 
        }}
        className="relative"
      >
        <div className={`absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r ${config.color}`} />
        
        <div className="relative w-48 h-48 mx-auto">
          <Image
            src={config.image}
            alt={pet.name}
            width={192}
            height={192}
            className="object-contain rounded-lg"
          />
        </div>

        <AnimatePresence>
          {showEvolutionEffect && <EvolutionParticles />}
        </AnimatePresence>
      </motion.div>

      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
          {pet.name}
        </h3>

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

        <p className="mt-2 text-sm text-gray-600">
          {config.description}
        </p>

        <div className="mt-4 flex items-center justify-center space-x-2">
          <HiStar className="w-5 h-5 text-yellow-400" />
          <span className="text-lg font-bold text-gray-800">
            {pet.currentStreak} Day Streak
          </span>
        </div>

        {pet.nextEvolution && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Next Evolution</span>
              <span className="font-medium text-primary-blue">
                {pet.nextEvolution.daysLeft} days left
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pet.nextEvolution.progress}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full bg-gradient-to-r ${config.color}`}
              />
            </div>
          </div>
        )}

        {pet.achievements > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            🏆 {pet.achievements} Achievements Unlocked
          </div>
        )}
      </div>
    </div>
  );
}