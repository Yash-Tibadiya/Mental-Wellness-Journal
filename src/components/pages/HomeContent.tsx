import { Link } from "react-router-dom";
import { Book, QuoteIcon } from "lucide-react";
import { ModeToggle } from "../../components/mode-toggle";
import { QuoteDisplay } from "../QuoteDisplay";

const HomeContent = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex flex-col items-center justify-between mb-12 md:flex-row">
          <h1 className="text-3xl font-bold text-center text-transparent sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text md:text-left">
            Mental Wellness
          </h1>
          <div className="flex flex-col items-center gap-4 mt-4 sm:flex-row md:mt-0">
            <ModeToggle />
            <Link
              to="/journal"
              className="flex items-center justify-center w-full h-12 gap-3 p-2 text-sm font-medium transition-colors border rounded-md shadow-sm border-input bg-background hover:bg-accent hover:text-accent-foreground sm:w-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <Book className="h-[1.5rem] w-[1.5rem]" />
              <span className="text-xl">Open Journal</span>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl dark:text-white">
              Daily Inspiration
            </h2>
            <p className="text-base text-gray-600 sm:text-lg dark:text-gray-300">
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
              className="inline-flex items-center gap-3 px-6 py-3 text-white transition-all duration-300 rounded-lg shadow-lg sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-xl hover:scale-105"
            >
              <QuoteIcon className="w-6 h-6" />
              <span className="text-base font-medium sm:text-lg">
                Start Journaling
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
