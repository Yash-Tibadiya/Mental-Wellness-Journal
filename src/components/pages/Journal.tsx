// import React, { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ChartColumnStacked, Book } from "lucide-react";

import { JournalEditor } from "../JournalEditor";
import { MoodTracker } from "../MoodTracker";
import { QuoteDisplay } from "../QuoteDisplay";
import { ModeToggle } from "../../components/mode-toggle";
import type { JournalEntry, Mood } from "../../types";
import { demoJournalEntries } from "../../DemoData";

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
  const [currentMood, setCurrentMood] = useState<Mood>("happy");

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
    setCurrentMood("happy");
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
      </div>

      {/* Floating Journal Entries Button */}
      <div className="mt-16 mb-16 text-center">
        <Link
          to="/entries"
          className="inline-flex items-center gap-3 px-6 py-3 text-white transition-all duration-300 rounded-lg shadow-lg sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-xl hover:scale-105"
        >
          <Book className="w-6 h-6" />
          <span className="text-base font-medium sm:text-lg">
            Journal Entries
          </span>
        </Link>
      </div>
    </div>
  );
}
