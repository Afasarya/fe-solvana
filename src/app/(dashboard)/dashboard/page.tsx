// app/dashboard/page.tsx
"use client";
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { Activity, Award, Calendar, Target,} from 'lucide-react';

// Sample data
const activityData = [
  { day: 'Mon', mood: 8, activities: 4 },
  { day: 'Tue', mood: 6, activities: 3 },
  { day: 'Wed', mood: 7, activities: 5 },
  { day: 'Thu', mood: 9, activities: 6 },
  { day: 'Fri', mood: 8, activities: 4 },
  { day: 'Sat', mood: 9, activities: 3 },
  { day: 'Sun', mood: 8, activities: 5 },
];

const recentActivities = [
  {
    id: 1,
    type: 'quest',
    title: 'Morning Meditation',
    time: '2 hours ago',
    status: 'completed',
  },
  {
    id: 2,
    type: 'streak',
    title: 'Achievement Unlocked',
    time: '4 hours ago',
    status: 'achieved',
  },
  // Add more activities
];

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s your progress</p>
        </div>
        <button className="bg-gradient-to-r from-primary-blue to-primary-purple text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
          Start New Activity
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-blue/10 rounded-lg">
              <Activity className="w-6 h-6 text-primary-blue" />
            </div>
            <div>
              <p className="text-gray-600">Current Streak</p>
              <h3 className="text-2xl font-bold text-gray-900">7 Days</h3>
            </div>
          </div>
        </motion.div>

        {/* Add more stat cards */}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">Weekly Mood Tracker</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#2563eb" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">Activity Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="activities" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'quest' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'quest' ? (
                    <Target className="w-5 h-5 text-green-600" />
                  ) : (
                    <Award className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                activity.status === 'completed' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {activity.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
        >
          <Calendar className="w-6 h-6 text-primary-blue mb-2" />
          <span className="text-sm font-medium text-gray-700">Schedule Session</span>
        </motion.button>
        {/* Add more quick action buttons */}
      </div>
    </motion.div>
  );
}