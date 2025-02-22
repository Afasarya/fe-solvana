// components/common/Sidebar.tsx
"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Award,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Badges', href: '/badges', icon: <Award size={20} /> },
  { name: 'Diary', href: '/diary', icon: <BookOpen size={20} /> },
  { name: 'Analyze', href: '/analyze', icon: <BarChart2 size={20} /> },
  { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
];

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 240 : 68 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen fixed left-0 top-0 z-40 bg-white border-r border-gray-200"
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-4 top-8 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isExpanded ? (
          <ChevronLeft size={20} className="text-gray-600" />
        ) : (
          <ChevronRight size={20} className="text-gray-600" />
        )}
      </button>

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
            <Image
              src="/avatars/default.png"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-medium text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500">Premium Member</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="mt-4 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-blue to-primary-purple text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="ml-3"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 w-full px-2">
        <button
          onClick={() => console.log('Logout')}
          className="flex items-center w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="ml-3"
            >
              Logout
            </motion.span>
          )}
        </button>
      </div>
    </motion.div>
  );
}