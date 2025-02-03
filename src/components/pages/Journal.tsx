import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Smile,
  Meh,
  Frown,
  Coffee,
  Brain,
  Home,
  ChartColumnStacked,
  Book,
} from "lucide-react";
import { JournalEditor } from "../JournalEditor";
import { MoodTracker } from "../MoodTracker";
import { QuoteDisplay } from "../QuoteDisplay";
import { ModeToggle } from "../../components/mode-toggle";
import type { JournalEntry, Mood } from "../../types";
import { demoJournalEntries } from "../../DemoData";

const moodIcons: Record<Mood, React.ReactNode> = {
  happy: <Smile className="w-5 h-5 text-yellow-500" />,
  calm: <Coffee className="w-5 h-5 text-blue-500" />,
  neutral: <Meh className="w-5 h-5 text-green-500" />,
  sad: <Frown className="w-5 h-5 text-gray-500" />,
  stressed: <Brain className="w-5 h-5 text-red-500" />,
};

const moodLabels: Record<Mood, string> = {
  happy: "Happy",
  calm: "Calm",
  neutral: "Neutral",
  sad: "Sad",
  stressed: "Stressed",
};

export function Journal() {
  // Load entries from localStorage
  // const [entries, setEntries] = useState<JournalEntry[]>(() => {
  //   const saved = localStorage.getItem("journal-entries");
  //   return saved ? JSON.parse(saved) : [];
  // });
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem("journal-entries");
    return saved ? JSON.parse(saved) : demoJournalEntries;
  });
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);

  // Persist entries to localStorage on change
  useEffect(() => {
    localStorage.setItem("journal-entries", JSON.stringify(entries));
  }, [entries]);

  // Save entry only if content is non-empty and a mood is selected
  const handleSaveEntry = (content: string, tags: string[], date?: Date) => {
    if (!content.trim() || !currentMood) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: date ? date.toISOString() : new Date().toISOString(),
      content,
      mood: currentMood,
      tags,
    };

    setEntries([newEntry, ...entries]);
    setCurrentMood(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#09090b] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Book className="h-6 w-6 sm:h-[1.7rem] sm:w-[1.7rem]" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Journal
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 w-10 sm:h-12 sm:w-12 justify-center items-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <Home className="h-5 w-5 sm:h-[1.5rem] sm:w-[1.5rem] text-gray-700 dark:text-white" />
            </Link>
            <ModeToggle />
            <Link
              to="/chart"
              className="flex border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 w-10 sm:h-12 sm:w-12 justify-center items-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <ChartColumnStacked className="h-5 w-5 sm:h-[1.5rem] sm:w-[1.5rem]" />
            </Link>
          </div>
        </header>

        {/* Main Section */}
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

        {/* Previous Entries */}
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Previous Entries
          </h2>
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="bg-white dark:bg-[#18181b] rounded-lg p-4 sm:p-6 shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {moodIcons[entry.mood]}
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Feeling {moodLabels[entry.mood]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
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
