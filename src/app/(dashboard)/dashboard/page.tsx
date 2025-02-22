"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BookOpen, HeartPulse, Brain } from 'lucide-react';
import { getDashboardStats } from '@/services/api';
import { DashboardStats } from '@/types';
import StatCard from '@/components/dashboard/StatCard';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's your progress</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Current Streak"
          value={`${stats?.currentStreak || 0} Days`}
          icon={Activity}
        />
        <StatCard
          title="My Diary"
          value={`${stats?.diaryCount || 0} Entries`}
          icon={BookOpen}
        />
        <StatCard
          title="Current Mood"
          value={stats?.currentMood || 'NEUTRAL'}
          icon={HeartPulse}
        />
        <StatCard
          title="Questionnaire Score"
          value={stats?.questionnaire || 0}
          icon={Brain}
        />
      </div>

      {/* Placeholder for charts and other sections */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">More features coming soon...</h2>
      </div>
    </motion.div>
  );
}