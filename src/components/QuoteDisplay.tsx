import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import type { Quote as QuoteType } from "../types";

export function QuoteDisplay() {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/quotes/random")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch quote");
        return res.json();
      })
      .then((data) => {
        setQuote({ quote: data.quote, author: data.author });
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return (
  //     <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
  //       <p className="text-base sm:text-lg font-medium break-words">
  //         Loading quote...
  //       </p>
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mt-1 animate-pulse bg-white/30 rounded" />
          <div className="w-full">
            <div className="h-4 sm:h-5 bg-white/30 rounded animate-pulse mb-2 w-3/4" />
            <div className="h-4 sm:h-5 bg-white/30 rounded animate-pulse mb-2 w-4/5" />
            <div className="h-3 sm:h-4 bg-white/30 rounded animate-pulse w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <p className="text-base sm:text-lg font-medium break-words">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <Quote className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mt-1" />
        <div className="w-full">
          <p className="text-base sm:text-lg font-medium italic mb-2 break-words">
            {quote.quote}
          </p>
          <p className="text-xs sm:text-sm opacity-90 break-words">
            — {quote.author}
          </p>
        </div>
      </div>
    </div>
  );
}
