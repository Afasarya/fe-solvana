// components/Footer.tsx
"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const FooterLinks = {
  services: [
    { name: 'Individual Therapy', href: '/services/individual' },
    { name: 'Group Therapy', href: '/services/group' },
    { name: 'Online Counseling', href: '/services/online' },
    { name: 'Mental Health Tips', href: '/services/tips' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'FAQ', href: '/faq' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent"
            >
              Solvana
            </Link>
            <p className="text-gray-600 mt-4">
              Your trusted partner in mental health and wellness. We&apos;re here to support your journey to better mental health.
            </p>
            <div className="flex space-x-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="bg-gradient-to-r from-primary-blue to-primary-purple p-2 rounded-full text-white"
              >
                <FaFacebookF className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="bg-gradient-to-r from-primary-blue to-primary-purple p-2 rounded-full text-white"
              >
                <FaTwitter className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="bg-gradient-to-r from-primary-blue to-primary-purple p-2 rounded-full text-white"
              >
                <FaInstagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="bg-gradient-to-r from-primary-blue to-primary-purple p-2 rounded-full text-white"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {FooterLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-primary-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {FooterLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-primary-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-600">
                <HiLocationMarker className="w-5 h-5 text-primary-blue" />
                <span>123 Mental Health Street, Wellness City</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <HiPhone className="w-5 h-5 text-primary-blue" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <HiMail className="w-5 h-5 text-primary-blue" />
                <span>support@solvana.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Solvana. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {FooterLinks.support.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-primary-blue transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}