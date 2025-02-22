// components/dashboard/Footer.tsx
"use client";
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function DashboardFooter() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-white border-t border-gray-100 py-4 px-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <div className="flex items-center text-gray-500 text-sm">
          <span>© {new Date().getFullYear()} Solvana.</span>
          <span className="mx-2">Made with</span>
          <Heart size={14} className="text-primary-blue" />
        </div>
        
        {/* Links */}
        <div className="flex items-center space-x-4 text-sm">
          <a 
            href="/privacy" 
            className="text-gray-500 hover:text-primary-blue transition-colors"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms" 
            className="text-gray-500 hover:text-primary-blue transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </motion.footer>
  );
}