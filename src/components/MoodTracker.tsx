import React from "react";
import { Smile, Meh, Frown, Coffee, Brain } from "lucide-react";
import type { Mood } from "../types";

interface MoodTrackerProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

const moods: { type: Mood; icon: React.ReactNode; label: string }[] = [
  {
    type: "happy",
    icon: <Smile className="w-8 h-8 text-yellow-500" />,
    label: "Happy",
  },
  {
    type: "calm",
    icon: <Coffee className="w-8 h-8 text-blue-500" />,
    label: "Calm",
  },
  {
    type: "neutral",
    icon: <Meh className="w-8 h-8 text-green-500" />,
    label: "Neutral",
  },
  {
    type: "sad",
    icon: <Frown className="w-8 h-8 text-gray-500" />,
    label: "Sad",
  },
  {
    type: "stressed",
    icon: <Brain className="w-8 h-8 text-red-500" />,
    label: "Stressed",
  },
];

export function MoodTracker({ selectedMood, onMoodSelect }: MoodTrackerProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        How are you feeling today?
      </h3>
      <div className="flex justify-between">
        {moods.map(({ type, icon, label }) => (
          <button
            key={type}
            onClick={() => onMoodSelect(type)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200
              ${
                selectedMood === type
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 w-24 h-24 flex justify-center"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 w-24 h-24 flex justify-center"
              }`}
          >
            {icon}
            <span className="mt-2 text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
