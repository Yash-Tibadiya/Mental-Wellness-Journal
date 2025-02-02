import { Link } from "react-router-dom";
import { Book, QuoteIcon } from "lucide-react";
import { ModeToggle } from "../../components/mode-toggle";
import { QuoteDisplay } from "../QuoteDisplay";

const HomeContent = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Mental Wellness
          </h1>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link
              to="/journal"
              className="flex border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-12 w-60 justify-center items-center gap-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <Book className="h-[1.5rem] w-[1.5rem]" />
              <span className="text-xl">Open Journal</span>
            </Link>
          </div>
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
};

export default HomeContent;
