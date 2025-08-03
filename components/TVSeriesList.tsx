"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  Filter,
  SortAsc,
  SortDesc,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Tv,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TVSeries {
  id: number;
  name: string;
  original_name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  overview: string;
  number_of_seasons: number;
  number_of_episodes: number;
}

interface TVSeriesListProps {
  category?: string;
  initialSeries?: TVSeries[];
}

type SortOption = "popularity" | "rating" | "air_date" | "name";
type ViewMode = "grid" | "list";

export default function TVSeriesList({
  category = "popular",
  initialSeries = [],
}: TVSeriesListProps) {
  const [series, setSeries] = useState<TVSeries[]>(initialSeries);
  const [filteredSeries, setFilteredSeries] =
    useState<TVSeries[]>(initialSeries);
  const [isLoading, setIsLoading] = useState(initialSeries.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [yearFilter, setYearFilter] = useState<string>("");

  const genres = [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
  ];

  const years = Array.from({ length: 25 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  useEffect(() => {
    const fetchTVSeries = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const endpoint =
          category === "popular" ? "/api/tv/popular" : `/api/tv/${category}`;

        const response = await fetch(`${endpoint}?page=${currentPage}`);
        if (!response.ok) throw new Error("Failed to fetch TV series");

        const data = await response.json();
        setSeries(data.results || []);
        setFilteredSeries(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (initialSeries.length === 0) {
      fetchTVSeries();
    }
  }, [category, currentPage, initialSeries.length]);

  useEffect(() => {
    let filtered = [...series];

    // Apply genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((show) =>
        show.genre_ids.some((genreId) => selectedGenres.includes(genreId))
      );
    }

    // Apply year filter
    if (yearFilter) {
      filtered = filtered.filter((show) =>
        show.first_air_date.startsWith(yearFilter)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "rating":
          aValue = a.vote_average;
          bValue = b.vote_average;
          break;
        case "air_date":
          aValue = new Date(a.first_air_date);
          bValue = new Date(b.first_air_date);
          break;
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
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

    setFilteredSeries(filtered);
  }, [series, selectedGenres, yearFilter, sortBy, sortOrder]);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setYearFilter("");
    setSortBy("popularity");
    setSortOrder("desc");
  };

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
        <h3 className="text-xl font-semibold mb-4">Error Loading TV Series</h3>
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
      {/* Filters and Controls */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Genre Filter */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Genres
            </h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedGenres.includes(genre.id)
                      ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div className="lg:w-48">
            <h3 className="text-lg font-semibold mb-3">Year</h3>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="lg:w-48">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              {sortOrder === "asc" ? (
                <SortAsc className="w-5 h-5" />
              ) : (
                <SortDesc className="w-5 h-5" />
              )}
              Sort By
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="air_date">Air Date</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="lg:w-32">
            <h3 className="text-lg font-semibold mb-3">View</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedGenres.length > 0 || yearFilter) && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <button
              onClick={clearFilters}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-300">
          Showing {filteredSeries.length} of {series.length} TV series
        </p>
        <p className="text-gray-300">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* TV Series Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSeries.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/tv-series/${show.id}`}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300">
                  <div className="relative h-64">
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
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                      {show.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{formatDate(show.first_air_date)}</span>
                      <span>
                        {show.number_of_seasons} Season
                        {show.number_of_seasons !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSeries.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              className="group"
            >
              <Link href={`/tv-series/${show.id}`}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-30 flex-shrink-0">
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                        alt={show.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-400 transition-colors duration-300">
                        {show.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {show.overview}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(show.first_air_date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tv className="w-4 h-4" />
                          {show.number_of_seasons} Season
                          {show.number_of_seasons !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {show.number_of_episodes} Episode
                          {show.number_of_episodes !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {show.vote_average.toFixed(1)} (
                          {show.vote_count.toLocaleString()})
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
                    ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white"
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
      {filteredSeries.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Tv className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">No TV series found</h3>
          <p className="text-gray-400 mb-6">
            No TV series match your current filters. Try adjusting your search
            criteria.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
