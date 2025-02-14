 import React, { useState } from "react";
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
   Search,
 } from "lucide-react";
 import { ModeToggle } from "../mode-toggle";
 import type { JournalEntry, Mood } from "../../types";

 const moodIcons: Record<Mood, React.ReactNode> = {
   happy: <Smile className="w-5 h-5 text-yellow-500" />,
   calm: <Coffee className="w-5 h-5 text-blue-500" />,
   neutral: <Meh className="w-5 h-5 text-green-500" />,
   sad: <Frown className="w-5 h-5 text-gray-500" />,
   stressed: <Brain className="w-5 h-5 text-red-500" />,
 };

 const moodIconsW: Record<Mood, React.ReactNode> = {
   happy: <Smile className="w-5 h-5" />,
   calm: <Coffee className="w-5 h-5" />,
   neutral: <Meh className="w-5 h-5" />,
   sad: <Frown className="w-5 h-5" />,
   stressed: <Brain className="w-5 h-5" />,
 };

 const moodLabels: Record<Mood, string> = {
   happy: "Happy",
   calm: "Calm",
   neutral: "Neutral",
   sad: "Sad",
   stressed: "Stressed",
 };

 export function Entries() {
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedMood, setSelectedMood] = useState<Mood | "all">("all");

   // Load entries from localStorage
   const entries: JournalEntry[] = JSON.parse(
     localStorage.getItem("journal-entries") || "[]"
   );

   const filteredEntries = entries.filter((entry) => {
     const matchesSearch = entry.content
       .toLowerCase()
       .includes(searchTerm.toLowerCase());
     const matchesMood = selectedMood === "all" || entry.mood === selectedMood;
     return matchesSearch && matchesMood;
   });

   return (
     <div className="min-h-screen bg-gray-50 dark:bg-[#09090b] transition-colors duration-200">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Header */}
         <header className="flex flex-col md:flex-row justify-between items-center mb-8">
           <div className="flex items-center gap-4 mb-4 md:mb-0">
             <Book className="h-6 w-6 sm:h-[1.7rem] sm:w-[1.7rem]" />
             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
               Journal Entries
             </h1>
           </div>
           <div className="flex items-center gap-4">
             <Link
               to="/"
               className="flex border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 w-10 sm:h-12 sm:w-12 justify-center items-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
             >
               <Home className="h-5 w-5 sm:h-[1.5rem] sm:w-[1.5rem] text-gray-700 dark:text-white" />
             </Link>
             <Link
               to="/journal"
               className="flex border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 w-10 sm:h-12 sm:w-12 justify-center items-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
             >
               <Book className="h-5 w-5 sm:h-[1.5rem] sm:w-[1.5rem]" />
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

         {/* Filters */}
         <div className="mb-8 space-y-4">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
             <input
               type="text"
               placeholder="Search entries..."
               className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-[#18181b] focus:ring-2 focus:ring-blue-500"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <div className="flex flex-wrap gap-2">
             <button
               onClick={() => setSelectedMood("all")}
               className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
                 selectedMood === "all"
                   ? "bg-blue-500 text-white"
                   : "bg-gray-200 dark:bg-gray-700"
               }`}
             >
               All
             </button>
             {Object.entries(moodLabels).map(([mood, label]) => (
               <button
                 key={mood}
                 onClick={() => setSelectedMood(mood as Mood)}
                 className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
                   selectedMood === mood
                     ? "bg-blue-500 text-black"
                     : "bg-gray-200 dark:bg-gray-700"
                 }`}
               >
                 {moodIconsW[mood as Mood]}
                 {label}
               </button>
             ))}
           </div>
         </div>

         {/* Entries Grid */}
         <div className="columns-1 md:columns-2 gap-6 space-y-6">
           {filteredEntries.map((entry) => (
             <div
               key={entry.id}
               className="break-inside-avoid bg-white dark:bg-[#18181b] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
             >
               <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-2">
                   {moodIcons[entry.mood]}
                   <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                     {moodLabels[entry.mood]}
                   </span>
                 </div>
                 <span className="text-sm text-gray-500">
                   {new Date(entry.date).toLocaleDateString()}
                 </span>
               </div>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 {entry.content}
               </p>
               <div className="flex flex-wrap gap-2">
                 {entry.tags.map((tag) => (
                   <span
                     key={tag}
                     className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs"
                   >
                     {tag}
                   </span>
                 ))}
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 }