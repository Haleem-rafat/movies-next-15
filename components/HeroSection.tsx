"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Info,
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FeaturedMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export default function HeroSection() {
  const [featuredMovies, setFeaturedMovies] = useState<FeaturedMovie[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        setIsLoading(true);
        // Fetch trending movies for hero section
        const response = await fetch("/api/movies/trending?time_window=week");
        if (response.ok) {
          const data = await response.json();
          setFeaturedMovies(data.results?.slice(0, 5) || []);
        }
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === featuredMovies.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === featuredMovies.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredMovies.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  if (isLoading) {
    return (
      <div className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
      </div>
    );
  }

  if (featuredMovies.length === 0) {
    return (
      <div className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to MovieHub
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover the latest movies and TV series
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/movies"
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Explore Movies
            </Link>
            <Link
              href="/tv-series"
              className="px-8 py-4 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Browse TV Series
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Hero Slider */}
      <AnimatePresence mode="wait">
        {featuredMovies.map(
          (movie, index) =>
            index === currentSlide && (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* Backdrop Image */}
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 via-gray-900/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Movie Info */}
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-white"
                      >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                          {movie.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{formatDate(movie.release_date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{movie.vote_average.toFixed(1)}</span>
                            <span className="text-gray-400">
                              ({movie.vote_count.toLocaleString()})
                            </span>
                          </div>
                        </div>

                        <p className="text-lg text-gray-300 mb-8 line-clamp-3 max-w-2xl">
                          {movie.overview}
                        </p>

                        <div className="flex flex-wrap gap-4">
                          <Link
                            href={`/movies/${movie.id}`}
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Watch Now
                          </Link>
                          <Link
                            href={`/movies/${movie.id}`}
                            className="inline-flex items-center px-8 py-4 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 text-white font-semibold rounded-lg transition-all duration-300"
                          >
                            <Info className="w-5 h-5 mr-2" />
                            More Info
                          </Link>
                        </div>
                      </motion.div>

                      {/* Movie Poster */}
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="hidden lg:flex justify-center"
                      >
                        <div className="relative">
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={300}
                            height={450}
                            className="rounded-lg shadow-2xl"
                          />
                          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </div>
  );
}
