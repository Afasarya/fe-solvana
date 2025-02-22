// components/layout/AdminLayout.tsx
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/admin-dashboard/Sidebar';
import Footer from '@/components/admin-dashboard/Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
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
        {/* Content Area */}
        <main className="flex-grow px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
}