import Link from "next/link";
import { ReactNode } from "react";

interface MoviesLayoutProps {
  children: ReactNode;
}

export default function MoviesLayout({ children }: MoviesLayoutProps) {
  return (
    <div className="movies-layout">
      {/* Movies-specific layout elements */}
      <div className="movies-navigation bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/movies"
              className="text-gray-300 hover:text-white transition-colors"
            >
              All Movies
            </Link>
            <Link
              href="/movies/category/trending"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Trending
            </Link>
            <Link
              href="/movies/category/popular"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Popular
            </Link>
            <Link
              href="/movies/category/top-rated"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Top Rated
            </Link>
            <Link
              href="/movies/category/upcoming"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Upcoming
            </Link>
          </nav>
        </div>
      </div>

      {children}
    </div>
  );
}
