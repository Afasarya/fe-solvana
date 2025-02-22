// app/dashboard/badges/page.tsx
"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lock } from 'lucide-react';

// Badge types and data
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  isLocked: boolean;
  category: string;
  requirement: string;
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'Early Bird',
    description: 'Complete 5 morning meditation sessions',
    icon: '🌅',
    rarity: 'common',
    progress: 80,
    isLocked: false,
    category: 'Wellness',
    requirement: '5/5 sessions completed'
  },
  // Add more badges...
];

export default function BadgesPage() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const rarityColors = {
    common: 'from-blue-400 to-blue-600',
    rare: 'from-purple-400 to-purple-600',
    epic: 'from-pink-400 to-pink-600',
    legendary: 'from-yellow-400 to-orange-600'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Achievement Badges</h1>
          <p className="text-gray-600">Track your progress and unlock new badges</p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search badges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900 placeholder-gray-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
          >
            <option value="all">All Badges</option>
            <option value="unlocked">Unlocked</option>
            <option value="locked">Locked</option>
          </select>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedBadge(badge)}
            className="cursor-pointer"
          >
            <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden">
              {/* Badge Icon */}
              <div className={`absolute top-0 right-0 w-24 h-24 opacity-5 bg-gradient-to-br ${rarityColors[badge.rarity]}`} />
              <div className="relative z-10">
                <div className="text-4xl mb-4">{badge.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{badge.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                
                {/* Progress Bar */}
                {!badge.isLocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-primary-blue">{badge.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${badge.progress}%` }}
                        className={`h-full bg-gradient-to-r ${rarityColors[badge.rarity]}`}
                      />
                    </div>
                  </div>
                )}

                {/* Locked Overlay */}
                {badge.isLocked && (
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Badge Details Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
            >
              <div className="text-6xl mb-6">{selectedBadge.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedBadge.name}</h2>
              <p className="text-gray-600 mb-6">{selectedBadge.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rarity</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    `bg-gradient-to-r ${rarityColors[selectedBadge.rarity]} text-white`
                  }`}>
                    {selectedBadge.rarity.charAt(0).toUpperCase() + selectedBadge.rarity.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="text-gray-900">{selectedBadge.category}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Requirement</span>
                  <span className="text-gray-900">{selectedBadge.requirement}</span>
                </div>

                {!selectedBadge.isLocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-primary-blue">{selectedBadge.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedBadge.progress}%` }}
                        className={`h-full bg-gradient-to-r ${rarityColors[selectedBadge.rarity]}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}