"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questionnaireService } from '@/services/questionnaire';
import { Question } from '@/types/questionnaire';
import { useAuth } from '@/context/AuthContext';

export default function Questioner() {
  const router = useRouter();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Record<string, Question>>({});
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await questionnaireService.getQuestions();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    if (currentQuestion < Object.keys(questions).length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== Object.keys(questions).length) {
      setError('Please answer all questions');
      return;
    }

    setSubmitting(true);
    try {
      await questionnaireService.submitQuestionnaire(answers);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to submit questionnaire');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  const currentQuestionId = Object.keys(questions)[currentQuestion];
  const currentQuestionData = questions[currentQuestionId];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-primary-blue rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestion / Object.keys(questions).length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Question {currentQuestion + 1} of {Object.keys(questions).length}
            </p>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {currentQuestionData?.question}
            </h2>
            
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(currentQuestionId, value)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                    answers[currentQuestionId] === value
                      ? 'border-primary-blue bg-blue-50'
                      : 'border-gray-200 hover:border-primary-blue hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center">
                      {value}
                    </span>
                    <span className="flex-grow">
                      {currentQuestionData?.scale[value as 1|2|3|4|5]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-gray-600 disabled:opacity-50"
            >
              Previous
            </button>

            {currentQuestion === Object.keys(questions).length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(Object.keys(questions).length - 1, prev + 1))}
                disabled={!answers[currentQuestionId]}
                className="px-4 py-2 text-primary-blue disabled:opacity-50"
              >
                Next
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}