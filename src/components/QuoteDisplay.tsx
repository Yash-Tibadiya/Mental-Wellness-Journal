import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import type { Quote as QuoteType } from "../types";

export function QuoteDisplay() {
  const [quote, setQuote] = useState<QuoteType | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/quotes/random")
      .then((res) => res.json())
      .then((data) => setQuote({ quote: data.quote, author: data.author }));
  }, []);

  if (!quote) return null;

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg shadow-lg">
      <div className="flex items-start gap-4">
        <Quote className="w-8 h-8 flex-shrink-0 mt-1" />
        <div>
          <p className="text-lg font-medium italic mb-2">{quote.quote}</p>
          <p className="text-sm opacity-90">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
}
