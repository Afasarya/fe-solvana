import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary-blue/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary-blue" />
        </div>
        <div>
          <p className="text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
    </motion.div>
  );
}
