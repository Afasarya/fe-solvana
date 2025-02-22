"use client";
import Questioner from '@/components/forms/Questioner';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QuestionerPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.questionnaire) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Mental Health Assessment
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Before accessing the dashboard, please complete this assessment to help us understand your needs better.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This is a one-time questionnaire that will help us personalize your experience.
          </p>
        </div>
        <Questioner />
      </div>
    </div>
  );
}