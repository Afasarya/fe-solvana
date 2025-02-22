// app/community/page.tsx
"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Share2, MessageCircle, Plus, 
  Image as ImageIcon, X, Smile 
} from 'lucide-react';
import Image from 'next/image';

interface Post {
  id: string;
  content: string;
  image?: string;
  likes: number;
  shares: number;
  comments: number;
  createdAt: Date;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  isLiked: boolean;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: "Remember, every small step counts towards your mental well-being! 🌟",
      image: "/images/imagecover.jpeg",
      likes: 42,
      shares: 12,
      comments: 5,
      createdAt: new Date(),
      author: {
        name: "Sarah Johnson",
        avatar: "/images/imagecover.jpeg",
        role: "Mental Health Advocate"
      },
      isLiked: false
    },
    // Add more sample posts
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', image: null as File | null });

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Community</h1>
            <p className="text-gray-600">Share and connect with others</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Post</span>
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Post Image */}
              {post.image && (
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt="Post"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                    <p className="text-sm text-gray-500">{post.author.role}</p>
                  </div>
                </div>

                {/* Post Text */}
                <p className="text-gray-600 mb-4">{post.content}</p>

                {/* Interaction Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500'
                    } hover:text-red-500 transition-colors`}
                  >
                    <Heart className="w-5 h-5" fill={post.isLiked ? "currentColor" : "none"} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setIsCreateModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-6 w-full max-w-lg mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Post</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Share something motivational..."
                className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900"
              />

              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewPost({ ...newPost, image: file });
                        }
                      }}
                    />
                  </label>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Smile className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}