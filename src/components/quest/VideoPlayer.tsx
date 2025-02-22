// components/gamification/VideoPlayer.tsx
"use client";
import { useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiPause, HiX, HiCheck } from 'react-icons/hi';

interface VideoPlayerProps {
  videoUrl: string;
  onComplete: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayer({ videoUrl, onComplete, isOpen, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    const handleEnded = () => {
      setShowCompletion(true);
      setTimeout(() => {
        onComplete();
        onClose();
      }, 2000);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onComplete, onClose]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    video.currentTime = (video.duration / 100) * percentage;
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-3xl rounded-2xl bg-black overflow-hidden">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors"
                >
                  <HiX className="w-6 h-6" />
                </button>

                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full"
                    onClick={togglePlay}
                  />

                  <AnimatePresence>
                    {!isPlaying && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/20"
                      >
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                          <HiPlay className="w-8 h-8 text-white" />
                        </div>
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showCompletion && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: 1 }}
                          className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500"
                        >
                          <HiCheck className="w-10 h-10 text-white" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div 
                      className="h-1 bg-white/20 rounded-full cursor-pointer mb-4"
                      onClick={handleProgressClick}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-blue to-primary-purple rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-primary-blue transition-colors"
                      >
                        {isPlaying ? (
                          <HiPause className="w-6 h-6" />
                        ) : (
                          <HiPlay className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}