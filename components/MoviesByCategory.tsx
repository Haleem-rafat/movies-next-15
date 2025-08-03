"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  SortAsc,
  SortDesc,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  TrendingUp,
  Flame,
  Award,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MoviesByCategoryProps {
  category: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  genre_ids: number[];
}

type SortOption = "popularity" | "rating" | "release_date" | "title";
type ViewMode = "grid" | "list";

const categoryConfig = {
  trending: {
    title: "Trending Movies",
    description: "Movies that are trending right now",
    icon: TrendingUp,
    color: "from-orange-500 to-red-600",
    endpoint: "/api/movies/trending",
  },
  popular: {
    title: "Popular Movies",
    description: "Most popular movies of all time",
    icon: Flame,
    color: "from-red-500 to-pink-600",
    endpoint: "/api/movies/popular",
  },
  "top-rated": {
    title: "Top Rated Movies",
    description: "Highest rated movies by critics and audiences",
    icon: Award,
    color: "from-yellow-500 to-orange-600",
    endpoint: "/api/movies/top-rated",
  },
  upcoming: {
    title: "Upcoming Movies",
    description: "Movies coming soon to theaters",
    icon: Clock,
    color: "from-green-500 to-blue-600",
    endpoint: "/api/movies/upcoming",
  },
  "now-playing": {
    title: "Now Playing",
    description: "Movies currently in theaters",
    icon: Calendar,
    color: "from-blue-500 to-purple-600",
    endpoint: "/api/movies/now-playing",
  },
};

export default function MoviesByCategory({ category }: MoviesByCategoryProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const config =
    categoryConfig[category as keyof typeof categoryConfig] ||
    categoryConfig.popular;

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${config.endpoint}?page=${currentPage}`);
        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();
        setMovies(data.results || []);
        setFilteredMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesByCategory();
  }, [category, currentPage, config.endpoint]);

  useEffect(() => {
    let filtered = [...movies];

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "rating":
          aValue = a.vote_average;
          bValue = b.vote_average;
          break;
        case "release_date":
          aValue = new Date(a.release_date);
          bValue = new Date(b.release_date);
          break;
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        default: // popularity
          aValue = a.vote_count;
          bValue = b.vote_count;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredMovies(filtered);
  }, [movies, sortBy, sortOrder]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-700 rounded w-48 animate-pulse"></div>
          <div className="h-8 bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="h-64 bg-gray-700"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-4">Error Loading Movies</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${config.color}`}>
            <config.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{config.title}</h2>
            <p className="text-gray-300">{config.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <span>Showing {filteredMovies.length} movies</span>
          <span>•</span>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-4">
          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-gray-300 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-red-500"
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="release_date">Release Date</option>
              <option value="title">Title</option>
            </select>
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="p-1 bg-gray-700/50 rounded hover:bg-gray-600/50 transition-colors"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* View Mode */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-gradient-to-r from-red-500 to-purple-600 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "list"
                ? "bg-gradient-to-r from-red-500 to-purple-600 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Movies Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/movies/${movie.id}`}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300">
                  <div className="relative h-64">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      {movie.vote_average.toFixed(1)}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(movie.release_date)}
                      </span>
                      <span>{movie.vote_count.toLocaleString()} votes</span>
                    </div>
                    <p className="text-gray-300 text-xs line-clamp-2">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              className="group"
            >
              <Link href={`/movies/${movie.id}`}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-30 flex-shrink-0">
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors duration-300">
                        {movie.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {movie.overview}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(movie.release_date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {movie.vote_average.toFixed(1)} (
                          {movie.vote_count.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 bg-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600/50 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page =
              Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-red-500 to-purple-600 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600/50 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredMovies.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <config.icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">No movies found</h3>
          <p className="text-gray-400">
            No movies available in this category at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
