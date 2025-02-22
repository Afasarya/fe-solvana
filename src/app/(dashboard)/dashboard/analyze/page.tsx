// app/dashboard/analyze/page.tsx
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Calendar, Download,  
  TrendingUp,  Activity, 
  Smile
} from 'lucide-react';
import { format, subDays } from 'date-fns';

// Types
interface MoodData {
  date: string;
  happy: number;
  neutral: number;
  sad: number;
}

interface ActivityData {
  name: string;
  count: number;
  completion: number;
}

// Sample data
const moodData: MoodData[] = Array.from({ length: 7 }, (_, i) => ({
  date: format(subDays(new Date(), i), 'MMM dd'),
  happy: Math.floor(Math.random() * 10),
  neutral: Math.floor(Math.random() * 8),
  sad: Math.floor(Math.random() * 5),
})).reverse();

const activityData: ActivityData[] = [
  { name: 'Meditation', count: 15, completion: 85 },
  { name: 'Exercise', count: 12, completion: 75 },
  { name: 'Journaling', count: 20, completion: 90 },
  { name: 'Reading', count: 8, completion: 60 },
];

export default function AnalyzePage() {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    subDays(new Date(), 7),
    new Date(),
  ]);
  
  const [activeFilter, setActiveFilter] = useState('all');

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting data...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your wellness journey</p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="flex space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
          <Calendar className="w-5 h-5 text-gray-500" />
          <input
            type="date"
            className="outline-none text-gray-600"
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              setDateRange([newDate, dateRange[1]]);
            }}
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            className="outline-none text-gray-600"
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              setDateRange([dateRange[0], newDate]);
            }}
          />
        </div>

        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-gray5200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-primary-blue"
        >
          <option value="all">All Activities</option>
          <option value="meditation">Meditation</option>
          <option value="exercise">Exercise</option>
          <option value="journaling">Journaling</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Activities', value: '55', icon: Activity, trend: '+12%', isPositive: true },
          { title: 'Avg. Mood Score', value: '7.8', icon: Smile, trend: '+5%', isPositive: true },
          { title: 'Completion Rate', value: '85%', icon: TrendingUp, trend: '+3%', isPositive: true },
          { title: 'Streak Days', value: '14', icon: Activity, trend: '-2', isPositive: false },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
              <stat.icon className="w-6 h-6 text-primary-blue" />
            </div>
            <div className={`mt-2 text-sm ${
              stat.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="happy" stroke="#10B981" />
              <Line type="monotone" dataKey="neutral" stroke="#6B7280" />
              <Line type="monotone" dataKey="sad" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Completion */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completion" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={[
                  { name: 'Happy', value: 60, fill: '#10B981' },
                  { name: 'Neutral', value: 30, fill: '#6B7280' },
                  { name: 'Sad', value: 10, fill: '#EF4444' },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => (
                  <text
                    x={0}
                    y={0}
                    fill="#111827" // text-gray-900 equivalent
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {`${name} ${(percent * 100).toFixed(0)}%`}
                  </text>
                )}
              />
              <Tooltip contentStyle={{ backgroundColor: 'white', color: '#111827' }} />
              <Legend formatter={(value) => <span style={{ color: '#111827' }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="happy" stroke="#2563EB" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}