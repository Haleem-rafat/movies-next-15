"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Calendar, ChevronLeft, ChevronRight, Tv } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TVSeries {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  number_of_seasons: number;
}

export default function PopularTVSeries() {
  const [series, setSeries] = useState<TVSeries[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPopularTVSeries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/tv/popular");
        if (response.ok) {
          const data = await response.json();
          setSeries(data.results?.slice(0, 10) || []);
        }
      } catch (error) {
        console.error("Error fetching popular TV series:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularTVSeries();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 4 >= series.length ? 0 : prev + 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 4 < 0 ? Math.max(0, series.length - 4) : prev - 4
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  if (isLoading) {
    return (
      <div className="flex gap-6 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex-shrink-0 w-64 animate-pulse">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-96 bg-gray-700"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (series.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">
          No popular TV series available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      {series.length > 4 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* TV Series Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {series.slice(currentIndex, currentIndex + 4).map((show, index) => (
          <motion.div
            key={show.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Link href={`/tv-series/${show.id}`}>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300">
                <div className="relative h-96">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    {show.vote_average.toFixed(1)}
                  </div>
                  <div className="absolute top-2 left-2 bg-purple-600/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                    <Tv className="w-3 h-3" />
                    TV
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                    {show.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(show.first_air_date)}
                    </span>
                    <span>
                      {show.number_of_seasons} Season
                      {show.number_of_seasons !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>{show.vote_count.toLocaleString()} votes</span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {show.overview}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Link
          href="/tv-series"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          View All TV Series
        </Link>
      </div>
    </div>
  );
}
