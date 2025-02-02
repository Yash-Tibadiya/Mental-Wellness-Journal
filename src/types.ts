export type Mood = 'happy' | 'calm' | 'neutral' | 'sad' | 'stressed';

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: Mood;
  tags: string[];
}

export interface Quote {
  q: string;
  a: string;
}
