import { Link } from "react-router-dom";
import { Book, Quote as QuoteIcon } from "lucide-react";
import { QuoteDisplay } from "../components/QuoteDisplay";

export function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Mental Wellness
          </h1>
          <Link
            to="/journal"
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg 
                     shadow-lg hover:shadow-xl transition-all duration-300 text-gray-800 
                     dark:text-white hover:scale-105"
          >
            <Book className="w-5 h-5" />
            <span>Open Journal</span>
          </Link>
          
        </nav>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Daily Inspiration
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Find peace and motivation in these carefully curated quotes
            </p>
          </div>

          <div className="grid gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <QuoteDisplay />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/journal"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r 
                       from-purple-600 to-blue-600 text-white rounded-lg shadow-lg 
                       hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <QuoteIcon className="w-6 h-6" />
              <span className="text-lg font-medium">Start Journaling</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
