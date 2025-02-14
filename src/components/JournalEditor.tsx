import { useState } from "react";
import { Save, Tag } from "lucide-react";
import { CalendarForm } from "../components/CalendarForm";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

interface JournalEditorProps {
  onSave: (content: string, tags: string[], date: Date | undefined) => void;
}

export function JournalEditor({ onSave }: JournalEditorProps) {
  const [content, setContent] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleSave = () => {
    // Check if content is empty (or only whitespace)
    if (!content.trim()) {
      toast.error("Please write something before saving");
      return;
    }

    try {
      // Save all data: content, tags, and selected date
      onSave(content, tags, selectedDate);
      setContent("");
      setTags([]);
      setSelectedDate(undefined);
      toast.success("Journal entry saved successfully!");
    } catch (error) {
      console.error("Failed to save journal entry:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg p-6 shadow-md border border-gray-200 bg-white dark:bg-[#101012] dark:border-[#1f1f23]">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-48 p-4 mb-4 rounded-md border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-200 resize-none dark:border-[#1f1f23] dark:bg-[#0e0e10] dark:text-white"
      />
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          placeholder="Add tags..."
          className="flex-1 p-2 rounded-md border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-[#1f1f23] dark:bg-[#0e0e10] dark:text-white"
        />
        <button
          onClick={handleAddTag}
          className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
        >
          <Tag size={20} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full border border-blue-300 text-blue-500 text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Render the CalendarForm to pick a date */}
      <div className="mb-4">
        <CalendarForm
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md transition-colors duration-200"
      >
        <Save size={20} />
        Save Entry
      </button>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#ffffff",
          },
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#27272a",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#27272a",
            },
          },
        }}
      />
    </div>
  );
}
