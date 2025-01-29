import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Smile, Meh, Frown, Coffee, Brain, Home } from 'lucide-react';
import { JournalEditor } from '../components/JournalEditor';
import { MoodTracker } from '../components/MoodTracker';
import { QuoteDisplay } from '../components/QuoteDisplay';
import type { JournalEntry, Mood } from '../types';

const moodIcons: Record<Mood, React.ReactNode> = {
  happy: <Smile className="w-5 h-5 text-yellow-500" />,
  calm: <Coffee className="w-5 h-5 text-blue-500" />,
  neutral: <Meh className="w-5 h-5 text-green-500" />,
  sad: <Frown className="w-5 h-5 text-gray-500" />,
  stressed: <Brain className="w-5 h-5 text-red-500" />,
};

const moodLabels: Record<Mood, string> = {
  happy: 'Happy',
  calm: 'Calm',
  neutral: 'Neutral',
  sad: 'Sad',
  stressed: 'Stressed',
};

export function Journal() {
  const [darkMode, setDarkMode] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journal-entries');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);

  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSaveEntry = (content: string, tags: string[]) => {
    if (!content.trim() || !currentMood) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content,
      mood: currentMood,
      tags,
    };

    setEntries([newEntry, ...entries]);
    setCurrentMood(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 
                       hover:bg-gray-300 dark:hover:bg-gray-600 
                       transition-colors duration-200"
            >
              <Home className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Journal
            </h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 
                     hover:bg-gray-300 dark:hover:bg-gray-600 
                     transition-colors duration-200"
          >
            {darkMode ? <Sun className="text-white" /> : <Moon className="text-gray-700" />}
          </button>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <QuoteDisplay />
            <MoodTracker
              selectedMood={currentMood}
              onMoodSelect={setCurrentMood}
            />
          </div>
          
          <div>
            <JournalEditor onSave={handleSaveEntry} />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Previous Entries
          </h2>
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg
                         transform hover:scale-[1.02] transition-all duration-300
                         animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {moodIcons[entry.mood]}
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Feeling {moodLabels[entry.mood]}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 
                                   text-blue-800 dark:text-blue-100 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(entry.date).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}