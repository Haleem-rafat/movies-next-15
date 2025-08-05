"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Play,
  Eye,
  Heart,
  Share2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

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

interface TrendingResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Fetcher function for SWR
const fetcher = async (url: string): Promise<TrendingResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  return response.json();
};

export default function TrendingMovies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use SWR for data fetching
  const { data, error, isLoading, mutate } = useSWR<TrendingResponse>(
    "/api/movies/trending?limit=20",
    fetcher
  );

  const movies = data?.results || [];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 4 >= movies.length ? 0 : prev + 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 4 < 0 ? Math.max(0, movies.length - 4) : prev - 4
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 bg-gray-700 rounded w-48 animate-pulse"></div>
            <div className="h-8 bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg overflow-hidden animate-pulse"
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
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">
              Error Loading Trending Movies
            </h3>
            <p className="text-gray-400 mb-6">{error.message}</p>
            <button
              type="button"
              onClick={() => mutate()}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!movies.length) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">No Trending Movies</h3>
            <p className="text-gray-400">
              No trending movies available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                Trending Movies
              </h2>
              <p className="text-gray-400">
                Discover what&apos;s hot right now
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/movies/category/trending"
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View All
            </Link>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="p-3 bg-gray-800/50 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={currentIndex + 4 >= movies.length}
                className="p-3 bg-gray-800/50 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-300 group"
              >
                <ChevronRight className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {movies
              .slice(currentIndex, currentIndex + 8)
              .map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link href={`/movies/${movie.id}`}>
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300 relative">
                      {/* Movie Poster */}
                      <div className="relative h-64">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Overlay with Action Buttons */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200"
                                >
                                  <Play className="w-4 h-4 text-white" />
                                </button>
                                <button
                                  type="button"
                                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200"
                                >
                                  <Heart className="w-4 h-4 text-white" />
                                </button>
                                <button
                                  type="button"
                                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200"
                                >
                                  <Share2 className="w-4 h-4 text-white" />
                                </button>
                              </div>
                              <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-white font-medium">
                                  {movie.vote_average.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          {movie.vote_average.toFixed(1)}
                        </div>
                      </div>

                      {/* Movie Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                          {movie.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
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
          </motion.div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(movies.length / 8) }).map(
              (_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setCurrentIndex(index * 8)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / 8) === index
                      ? "bg-yellow-400 w-6"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              )
            )}
          </div>
        </div>

        {/* View All Button (Mobile) */}
        <div className="flex justify-center mt-8 md:hidden">
          <Link
            href="/movies/category/trending"
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View All Trending Movies
          </Link>
        </div>
      </div>
    </section>
  );
}
