"use client";

import { useEffect } from "react";
import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MoviesError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Movies section error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              We encountered an error while loading the movies. Please try again
              or go back to the homepage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && (
            <details className="mt-8 text-left max-w-2xl mx-auto">
              <summary className="cursor-pointer text-gray-400 hover:text-white">
                Error Details (Development)
              </summary>
              <pre className="mt-2 p-4 bg-gray-800 rounded text-sm text-red-400 overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
