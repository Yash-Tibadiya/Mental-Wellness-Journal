import type { JournalEntry, Mood } from "./types";

const moods: Mood[] = ["happy", "calm", "neutral", "sad", "stressed"];

function getRandomMood(): Mood {
  return moods[Math.floor(Math.random() * moods.length)];
}

function getRandomDate(): Date {
  // Generate a random date between fabruary 1, 2024 and now.
  const start = new Date(2024, 1, 1).getTime();
  const end = Date.now();
  return new Date(start + Math.random() * (end - start));
}

function getRandomTags(): string[] {
  const possibleTags = ["work", "life", "personal", "fun", "health"];
  const numTags = Math.floor(Math.random() * 3); // 0, 1, or 2 tags
  const tags: string[] = [];
  for (let i = 0; i < numTags; i++) {
    const tag = possibleTags[Math.floor(Math.random() * possibleTags.length)];
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
  return tags;
}

export const demoJournalEntries: JournalEntry[] = Array.from({ length: 500 }, (_, i) => {
  const date = getRandomDate();
  return {
    id: (i + 1).toString(),
    date: date.toISOString(),
    content: `This is a demo journal entry #${i + 1} made on ${date.toDateString()}.`,
    mood: getRandomMood(),
    tags: getRandomTags(),
  };
});
