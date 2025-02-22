"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { profileService } from '@/services/profile';

export default function CompleteProfile() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    bio: user?.profile?.bio || '',
    age: user?.profile?.age?.toString() || '',
    gender: user?.profile?.gender || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Update profile data
      const profileData = await profileService.updateProfile({
        bio: formData.bio,
        age: parseInt(formData.age),
        gender: formData.gender
      });

      // Update user context with new profile data
      if (user) {
        const updatedUser = {
          ...user,
          profile: {
            ...user.profile,
            ...profileData
          }
        };
        await login(localStorage.getItem('token') || '', updatedUser);
      }

      // Redirect to questionnaire if not completed
      router.push('/questioner');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight">
            Complete Your Profile
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Help us personalize your experience by sharing a bit about yourself
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white backdrop-blur-lg bg-opacity-90 py-8 px-4 shadow-xl shadow-indigo-100/20 sm:rounded-xl sm:px-10 transition-all duration-300 hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                required
                className="mt-1 text-gray-700 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-semibold text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="mt-1 block w-full border text-gray-700 border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}