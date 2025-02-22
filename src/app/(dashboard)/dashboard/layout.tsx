// components/layout/DashboardLayout.tsx
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/user-profile/Sidebar';
import Footer from '@/components/user-profile/Footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isExpanded={isSidebarExpanded} 
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} 
      />

      {/* Main Content */}
      <motion.div
        initial={false}
        animate={{ 
          marginLeft: isSidebarExpanded ? '240px' : '68px',
          width: isSidebarExpanded ? 'calc(100% - 240px)' : 'calc(100% - 68px)'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col min-h-screen"
      >
        <main className="flex-grow px-6 py-8">
          {children}
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}