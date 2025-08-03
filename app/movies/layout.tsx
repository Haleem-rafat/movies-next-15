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
            <a
              href="/movies"
              className="text-gray-300 hover:text-white transition-colors"
            >
              All Movies
            </a>
            <a
              href="/movies/category/trending"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Trending
            </a>
            <a
              href="/movies/category/popular"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Popular
            </a>
            <a
              href="/movies/category/top-rated"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Top Rated
            </a>
            <a
              href="/movies/category/upcoming"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Upcoming
            </a>
          </nav>
        </div>
      </div>

      {children}
    </div>
  );
}
