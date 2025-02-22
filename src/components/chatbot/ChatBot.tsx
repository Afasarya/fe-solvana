// components/chatbot/ChatBot.tsx
"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPaperClip, HiPaperAirplane, HiVolumeUp, HiChat } from 'react-icons/hi';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  hasAudio?: boolean;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to help you. Feel free to share what's on your mind.",
        isBot: true,
        timestamp: new Date(),
        hasAudio: true
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleTextToSpeech = (messageId: string, text: string) => {
    if (activeSpeech === messageId) {
      // Stop speaking if already active
      window.speechSynthesis.cancel();
      setActiveSpeech(null);
    } else {
      // Start new speech
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const speech = new SpeechSynthesisUtterance(text);
      speech.onend = () => setActiveSpeech(null);
      window.speechSynthesis.speak(speech);
      setActiveSpeech(messageId);
    }
  };

  const handleFileAttachment = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-blue to-primary-purple text-white py-8"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <HiChat className="w-12 h-12" />
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold">Got a problem?
              </h1>
              <p className="text-lg opacity-90">Just tell me here, AI is ready to accompany you</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg"
        >
          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto p-6 space-y-4"
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gradient-to-r from-primary-blue to-primary-purple text-white'
                    }`}
                  >
                    <p>{message.text}</p>
                    {message.hasAudio && (
                      <button
                        onClick={() => handleTextToSpeech(message.id, message.text)}
                        className="mt-2 text-sm opacity-80 hover:opacity-100 flex items-center space-x-1"
                      >
                        <HiVolumeUp 
                          className={`w-5 h-5 ${
                            activeSpeech === message.id ? 'text-primary-blue' : ''
                          }`} 
                        />
                        <span>{activeSpeech === message.id ? 'Stop' : 'Play'}</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-4 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFileAttachment}
                className="text-gray-500 hover:text-primary-blue transition-colors"
              >
                <HiPaperClip className="w-6 h-6" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => console.log(e.target.files)}
              />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-primary-blue to-primary-purple text-white p-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <HiPaperAirplane className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}