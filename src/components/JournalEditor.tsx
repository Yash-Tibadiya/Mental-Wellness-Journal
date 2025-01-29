import { useState } from 'react';
import { Save, Tag } from 'lucide-react';

interface JournalEditorProps {
  onSave: (content: string, tags: string[]) => void;
}

export function JournalEditor({ onSave }: JournalEditorProps) {
  const [content, setContent] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleSave = () => {
    onSave(content, tags);
    setContent('');
    setTags([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-48 p-4 mb-4 rounded-lg border border-gray-200 dark:border-gray-700 
                   focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white
                   transition-all duration-200 ease-in-out resize-none"
      />
      
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          placeholder="Add tags..."
          className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTag}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 
                     transition-colors duration-200"
        >
          <Tag size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 
                       text-blue-800 dark:text-blue-100 text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white 
                   rounded-lg hover:bg-green-600 transition-colors duration-200"
      >
        <Save size={20} />
        Save Entry
      </button>
    </div>
  );
}