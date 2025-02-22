// app/admin/users/create/page.tsx
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CreateUserForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  status: 'active' | 'inactive';
  avatar: File | null;
}

export default function CreateUserPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateUserForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    status: 'active',
    avatar: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          href="/admin/users"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create User</h1>
          <p className="text-gray-600">Add a new user account</p>
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
            {formData.avatar ? (
              <Image
                src={URL.createObjectURL(formData.avatar)}
                alt="User avatar"
                width={80}
                height={80}
                className="rounded-full object-cover"
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
                className="hidden"
                accept="image/*"
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

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
            />
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

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            <span>{isLoading ? 'Creating...' : 'Create User'}</span>
          </button>
        </div>
      </motion.form>
    </div>
  );
}