"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPaperAirplane, HiChat, HiTranslate } from 'react-icons/hi';
import { aiService } from '@/services/ai';
import { ChatMessage } from '@/types/ai';

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'id'>('en');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const history = await aiService.getChatHistory();
        setMessages(history);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };
    fetchChatHistory();
  }, []);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      content: inputText,
      role: 'user',
      language,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await aiService.sendMessage(inputText, language);
      
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        content: response.message,
        role: 'assistant',
        language,
        createdAt: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'id' : 'en');
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <HiChat className="w-12 h-12" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {language === 'en' ? 'Got a problem?' : 'Ada masalah?'}
                </h1>
                <p className="text-lg opacity-90">
                  {language === 'en' 
                    ? 'Just tell me here, AI is ready to accompany you'
                    : 'Ceritakan saja, AI siap menemani kamu'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <HiTranslate className="w-5 h-5" />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <div className="max-w-4xl text-gray-700 mx-auto px-4 py-8">
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
                  className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'assistant'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gradient-to-r from-primary-blue to-primary-purple text-white'
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-50 mt-2 block">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
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
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'en' ? "Type your message here..." : "Ketik pesanmu di sini..."}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent outline-none"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className={`bg-gradient-to-r from-primary-blue to-primary-purple text-white p-2 rounded-lg transition-opacity ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
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