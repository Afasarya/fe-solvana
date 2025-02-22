"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Wind,
  Play,
  Pause,
  SkipForward,
  SkipBack,
} from "lucide-react";

type TabType = "music" | "breathing";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  url: string;
}

const relaxingTracks: Track[] = [
  {
    id: "1",
    title: "Ocean Waves",
    artist: "Nature Sounds",
    duration: "5:30",
    cover: "/music/ocean-cover.jpg",
    url: "https://cdn.pixabay.com/download/audio/2025/02/20/audio_4e2471d997.mp3?filename=lofi-hiphop-background-music-303607.mp3",
  },
  // Add more tracks
];

export default function RestHub() {
  const [activeTab, setActiveTab] = useState<TabType>("music");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    const breathingCycle = setInterval(() => {
      setBreathingPhase((current) => (current === "inhale" ? "hold" : current === "hold" ? "exhale" : "inhale"));
    }, 4000);
    return () => clearInterval(breathingCycle);
  }, []);

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
      audioRef.current.play().catch((err) => console.error("Playback error:", err));
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const handlePlay = async (track: Track) => {
    try {
      setCurrentTrack(track);
      audioRef.current.src = track.url;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = async (track: Track) => {
    if (isPlaying) {
      handlePause();
    } else {
      await handlePlay(track);
    }
  };

  const tabs = [
    { id: 'music', icon: Music, label: 'Relaxing Music' },
    { id: 'breathing', icon: Wind, label: 'Breathing Exercise' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rest Hub</h1>
          <p className="text-gray-600">Take a moment to relax and recharge</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
            {tabs.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as TabType)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-primary-blue to-primary-purple text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "music" && (
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              {/* Music Player */}
              <div className="space-y-6">
                {/* Now Playing */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <img src={currentTrack?.cover || "/music/default-cover.jpg"} alt="Album cover" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{currentTrack?.title || "Select a track"}</h3>
                    <p className="text-gray-500">{currentTrack?.artist}</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center space-x-4">
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <SkipBack className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => togglePlay(currentTrack!)}
                    className="p-4 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-full hover:shadow-lg transition-all"
                    disabled={!currentTrack}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <SkipForward className="w-6 h-6" />
                  </button>
                </div>

                {/* Playlist */}
                <div className="space-y-2">
                  {relaxingTracks.map((track) => (
                    <button
                      key={track.id}
                      onClick={async () => {
                        if (currentTrack?.id === track.id) {
                          await togglePlay(track);
                        } else {
                          await handlePlay(track);
                        }
                      }}
                      className="w-full flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-gray-900">{track.title}</h4>
                        <p className="text-sm text-gray-500">{track.artist}</p>
                      </div>
                      <span className="text-sm text-gray-500">{track.duration}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'breathing' && (
            <motion.div
              key="breathing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center"
            >
              <div className="max-w-md mx-auto space-y-8">
                <motion.div
                  animate={{
                    scale: breathingPhase === 'inhale' ? 1.5 : 
                           breathingPhase === 'hold' ? 1.5 : 1,
                    opacity: breathingPhase === 'hold' ? 0.8 : 1,
                  }}
                  transition={{ duration: 4 }}
                  className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-primary-blue to-primary-purple"
                />
                <div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">
                    {breathingPhase === 'inhale' ? 'Inhale...' :
                     breathingPhase === 'hold' ? 'Hold...' : 'Exhale...'}
                  </h3>
                  <p className="text-gray-600">
                    Follow the circle's movement for guided breathing
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
