// app/admin/admins/[id]/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface AdminFormData {
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  avatar: string | File | null;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function EditAdminPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AdminFormData>({
    name: '',
    email: '',
    role: 'admin',
    status: 'active',
    avatar: null,
  });

  useEffect(() => {
    // Fetch admin data
    const fetchAdmin = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFormData({
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
          status: 'active',
          avatar: '/avatars/default.png',
        });
      } catch (error) {
        console.error('Error fetching admin:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmin();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Handle success
    } catch (error) {
      console.error('Error updating admin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          href="/admin/admins"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Admin</h1>
          <p className="text-gray-600">Update admin account details</p>
        </div>
      </div>

      {/* Form */}
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Avatar Upload */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            {typeof formData.avatar === 'string' ? (
              <Image
                src={formData.avatar}
                alt="Admin avatar"
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 p-1 bg-primary-blue rounded-full text-white cursor-pointer">
              <Upload className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, avatar: file });
                  }
                }}
              />
            </label>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Profile Picture</h3>
            <p className="text-sm text-gray-500">JPG or PNG. Max size of 1MB</p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Change Password */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={formData.currentPassword || ''}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={formData.newPassword || ''}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </motion.form>
    </div>
  );
} 