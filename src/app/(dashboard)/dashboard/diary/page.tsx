// app/dashboard/diary/page.tsx
"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { format } from 'date-fns';

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad';
  date: Date;
  tags: string[];
}

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  const [currentEntry, setCurrentEntry] = useState<Partial<DiaryEntry>>({
    title: '',
    content: '',
    mood: 'neutral',
    tags: [],
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Diary</h1>
          <p className="text-gray-600">Record your thoughts and feelings</p>
        </div>
        
        <button
          onClick={() => setIsEditing(true)}
          className="bg-gradient-to-r from-primary-blue to-primary-purple text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search entries..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Entries List */}
      <div className="grid gap-6">
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{entry.title}</h3>
                  <p className="text-sm text-gray-500">{format(entry.date, 'MMMM d, yyyy')}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentEntry(entry);
                      setIsEditing(true);
                    }}
                    className="p-2 text-gray-400 hover:text-primary-blue transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      // Add delete confirmation
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 prose prose-sm max-w-none" 
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
              
              <div className="mt-4 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentEntry.id ? 'Edit Entry' : 'New Entry'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentEntry.id) {
                    setEntries((prevEntries) =>
                      prevEntries.map((entry) =>
                        entry.id === currentEntry.id ? { ...entry, ...currentEntry } : entry
                      )
                    );
                  } else {
                    setEntries((prevEntries) => [
                      ...prevEntries,
                      {
                        id: Date.now().toString(),
                        date: new Date(),
                        title: currentEntry.title || '',
                        content: currentEntry.content || '',
                        mood: currentEntry.mood || 'neutral',
                        tags: currentEntry.tags || []
                      } as DiaryEntry,
                    ]);
                  }
                  setIsEditing(false);
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={currentEntry.title}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                    placeholder="Enter title..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <EditorContent editor={editor} className="prose max-w-none min-h-[200px] border border-gray-200 rounded-lg p-4 text-gray-900" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mood
                  </label>
                  <select
                    value={currentEntry.mood}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, mood: e.target.value as DiaryEntry['mood'] })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="happy">Happy</option>
                    <option value="neutral">Neutral</option>
                    <option value="sad">Sad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Add tags separated by commas"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-gray-900 placeholder-gray-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const newTag = e.currentTarget.value.trim();
                        if (newTag) {
                          setCurrentEntry({
                            ...currentEntry,
                            tags: [...(currentEntry.tags || []), newTag]
                          });
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {currentEntry.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm flex items-center"
                      >
                        {tag}
                        <button
                          onClick={() => {
                            setCurrentEntry({
                              ...currentEntry,
                              tags: currentEntry.tags?.filter((t) => t !== tag)
                            });
                          }}
                          className="ml-1 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-purple text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}