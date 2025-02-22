"use client";
import { useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import PetDisplay from '@/components/pet/PetDisplay';
import QuestCard from '@/components/quest/QuestCard';
import { motion } from 'framer-motion';
import { gamificationService } from '@/services/gamification';
import { Pet, Quest } from '@/types/gamification';
import { useAuth } from '@/context/AuthContext';

export default function GamificationPage() {
  const { user } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petData, questsData] = await Promise.all([
          gamificationService.getPetStatus(),
          gamificationService.getDailyQuests()
        ]);

        setPet(petData.pet);
        setQuests(questsData.quests);
      } catch (err) {
        setError('Failed to load gamification data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuestComplete = async (questNumber: number) => {
    try {
      const result = await gamificationService.completeQuest(questNumber);
      
      // Update quests
      setQuests(prev => prev.map(quest => 
        quest.questNumber === questNumber 
          ? { ...quest, status: 'COMPLETED', completedAt: new Date().toISOString() }
          : quest
      ));

      // If all quests completed, update pet status
      if (result.completed) {
        const petStatus = await gamificationService.getPetStatus();
        setPet(petStatus.pet);
      }
    } catch (err) {
      console.error('Failed to complete quest:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

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
          {pet && (
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-4 md:p-6"
              >
                <PetDisplay pet={pet} />
              </motion.div>
            </div>
          )}

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
                  <span className="font-bold text-primary-blue">
                    {pet?.currentStreak || 0} days
                  </span>
                </div>
              </div>
              
              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                {quests.map(quest => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={() => handleQuestComplete(quest.questNumber)}
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