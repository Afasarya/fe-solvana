// app/admin/admins/page.tsx
"use client";
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

interface Admin {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: Date;
}

export default function AdminsPage() {
  const [search, setSearch] = useState('');
  const [admins] = useState<Admin[]>([]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Admins</h1>
          <p className="text-gray-600">Add, edit, and manage admin accounts</p>
        </div>
        
        <Link 
          href="/admin/admins/create"
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin</span>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search admins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
          />
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Admin</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Email</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Role</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Last Login</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="py-4 px-6">{admin.name}</td>
                  <td className="py-4 px-6">{admin.email}</td>
                  <td className="py-4 px-6">{admin.role}</td>
                  <td className="py-4 px-6">{admin.status}</td>
                  <td className="py-4 px-6">{admin.lastLogin.toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <Link href={`/admin/admins/${admin.id}`} className="text-primary-blue hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

