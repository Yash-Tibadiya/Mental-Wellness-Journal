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
    if (saved) return JSON.parse(saved);
    else return demoJournalEntries;
  });
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);

  // Persist entries to localStorage on change
  useEffect(() => {
    localStorage.setItem("journal-entries", JSON.stringify(entries));
  }, [entries]);

  // Updated to accept a date parameter
  const handleSaveEntry = (content: string, tags: string[], date?: Date) => {
    // Only save if content is non-empty and a mood is selected
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
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Book className="h-[1.7rem] w-[1.7rem]" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Journal
            </h1>
          </div>
          {/* ModeToggle + Chat Icon */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-12 w-12 justify-center items-center gap-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <Home className="h-[1.5rem] w-[1.5rem] text-gray-700 dark:text-white" />
            </Link>
            <ModeToggle />
            <Link
              to="/chart"
              className="flex border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-12 w-12 justify-center items-center gap-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <ChartColumnStacked className="h-[1.5rem] w-[1.5rem]" />
            </Link>
          </div>
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
            {/* JournalEditor passes content, tags, and the selected date */}
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
                className="bg-white dark:bg-[#18181b] rounded-lg p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300 animate-fade-in"
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
                          className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm"
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
