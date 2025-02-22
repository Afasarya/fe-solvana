"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCamera, HiUpload, HiX, HiRefresh } from 'react-icons/hi';
import { imageAiService } from '@/services/scanai';
import { ImageAnalysisResponse } from '@/types/ai';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function ScanningAI() {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ImageAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysis(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !user) return;
    setLoading(true);
    setError(null);

    try {
      const result = await imageAiService.analyzeImage(selectedImage, user.id);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  const resetImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setAnalysis(null);
    setError(null);
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      HAPPY: 'bg-green-500',
      SAD: 'bg-blue-500',
      NEUTRAL: 'bg-gray-500',
      ANGRY: 'bg-red-500'
    };
    return colors[mood as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">AI Mood Scanner</h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload a photo to analyze your emotional state
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="space-y-8">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />

              {!previewUrl ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full max-w-md h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary-blue transition-colors"
                >
                  <HiUpload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Click to upload an image</p>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 10MB</p>
                </button>
              ) : (
                <div className="relative w-full max-w-md">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-64"
                  />
                  <button
                    onClick={resetImage}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Analysis Button */}
            {selectedImage && !analysis && (
              <div className="flex justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className={`px-8 py-3 bg-primary-blue text-white rounded-lg flex items-center space-x-2 
                    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                  {loading ? (
                    <>
                      <HiRefresh className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <HiCamera className="w-5 h-5" />
                      <span>Analyze Image</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
                {error}
              </div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex text-gray-700 items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="text-lg font-medium">Detected Mood</h3>
                    <p className="text-sm text-gray-500">
                      Confidence: {analysis.analysis.confidence}%
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-white ${getMoodColor(analysis.analysis.mood)}`}>
                    {analysis.analysis.mood}
                  </span>
                </div>

                <div className="grid gap-6 text-gray-800 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-medium">Facial Features</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Eyes:</span> {analysis.analysis.facial_features.eyes}</p>
                      <p><span className="text-gray-500">Mouth:</span> {analysis.analysis.facial_features.mouth}</p>
                      <p><span className="text-gray-500">Expression:</span> {analysis.analysis.facial_features.overall_expression}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Context & Body Language</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Body Language:</span> {analysis.analysis.body_language}</p>
                      <p><span className="text-gray-500">Context:</span> {analysis.analysis.context}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 text-gray-800 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Emotional State Analysis</h3>
                  <p className="text-sm">{analysis.analysis.suggested_emotional_state}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-gray-500">
                    <p>Remaining analyses this week: {analysis.usageInfo.remaining}</p>
                    <p>Next reset: {new Date(analysis.usageInfo.nextReset).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={resetImage}
                    className="px-6 py-2 text-primary-blue hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Analyze Another Image
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}