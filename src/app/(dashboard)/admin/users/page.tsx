// app/admin/users/page.tsx
"use client";
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive';
  joinedDate: Date;
  lastActive: Date;
}

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [users,] = useState<User[]>([]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-gray-600">View and manage user accounts</p>
        </div>

        <Link 
          href="/admin/users/create"
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">User</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Email</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Joined</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Last Active</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={user.avatar || "/avatars/default.png"}
                        alt={`${user.name}'s avatar`}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-full text-xs`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.joinedDate.toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-gray-600">{user.lastActive.toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="p-2 text-gray-400 hover:text-primary-blue transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

