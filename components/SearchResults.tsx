"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  Search,
  SortAsc,
  SortDesc,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Film,
  Tv,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SearchResultsProps {
  query: string;
  type: string;
  page: number;
}

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  backdrop_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  media_type: "movie" | "tv" | "person";
  overview?: string;
  known_for_department?: string;
  genre_ids?: number[];
}

type SortOption = "relevance" | "rating" | "release_date" | "title";
type ViewMode = "grid" | "list";

export default function SearchResults({
  query,
  type,
  page,
}: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedMediaType, setSelectedMediaType] = useState<string>(type);
  const [selectedYear, setSelectedYear] = useState<string>("");

  const years = Array.from({ length: 25 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setFilteredResults([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          query: query,
          page: page.toString(),
          ...(selectedMediaType !== "all" && { media_type: selectedMediaType }),
        });

        const response = await fetch(`/api/search?${params}`);
        if (!response.ok) throw new Error("Failed to fetch search results");

        const data = await response.json();
        setResults(data.results || []);
        setFilteredResults(data.results || []);
        setTotalPages(data.total_pages || 1);
        setTotalResults(data.total_results || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page, selectedMediaType]);

  useEffect(() => {
    let filtered = [...results];

    // Apply year filter
    if (selectedYear) {
      filtered = filtered.filter((item) => {
        const date = item.release_date || item.first_air_date;
        return date && date.startsWith(selectedYear);
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number, bValue: number;

      switch (sortBy) {
        case "rating":
          aValue = a.vote_average;
          bValue = b.vote_average;
          break;
        case "release_date":
          aValue = new Date(a.release_date || a.first_air_date || "").getTime();
          bValue = new Date(b.release_date || b.first_air_date || "").getTime();
          break;
        case "title":
          aValue = (a.title || a.name || "").localeCompare(
            b.title || b.name || ""
          );
          bValue = (b.title || b.name || "").localeCompare(
            a.title || a.name || ""
          );
          break;
        default: // relevance
          return 0; // Keep original order for relevance
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredResults(filtered);
  }, [results, selectedYear, sortBy, sortOrder]);

  const clearFilters = () => {
    setSelectedMediaType(type);
    setSelectedYear("");
    setSortBy("relevance");
    setSortOrder("desc");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).getFullYear();
  };

  const getItemTitle = (item: SearchResult) => {
    return item.title || item.name || "Unknown";
  };

  const getItemImage = (item: SearchResult) => {
    if (item.media_type === "person") {
      return item.profile_path
        ? `https://image.tmdb.org/t/p/w300${item.profile_path}`
        : "/placeholder-avatar.png";
    }
    return item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : "/placeholder-poster.png";
  };

  const getItemLink = (item: SearchResult) => {
    switch (item.media_type) {
      case "movie":
        return `/movies/${item.id}`;
      case "tv":
        return `/tv-series/${item.id}`;
      case "person":
        return `/person/${item.id}`;
      default:
        return "#";
    }
  };

  const getMediaTypeIcon = (mediaType: string) => {
    switch (mediaType) {
      case "movie":
        return <Film className="w-4 h-4" />;
      case "tv":
        return <Tv className="w-4 h-4" />;
      case "person":
        return <Users className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Start Your Search</h3>
        <p className="text-gray-400">
          Enter a movie, TV series, or actor name to begin searching.
        </p>
      </div>
    );
  }

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
        <h3 className="text-xl font-semibold mb-4">Error Loading Results</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          type="button"
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
      {/* Search Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Query */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Results
            </h3>
            <p className="text-gray-300">
              Found{" "}
              <span className="text-white font-semibold">{totalResults}</span>{" "}
              results for{" "}
              <span className="text-white font-semibold">
                &quot;{query}&quot;
              </span>
            </p>
          </div>

          {/* Media Type Filter */}
          <div className="lg:w-48">
            <h3 className="text-lg font-semibold mb-3">Type</h3>
            <select
              value={selectedMediaType}
              onChange={(e) => setSelectedMediaType(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
            >
              <option value="all">All Types</option>
              <option value="movie">Movies</option>
              <option value="tv">TV Series</option>
              <option value="person">People</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="lg:w-48">
            <h3 className="text-lg font-semibold mb-3">Year</h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
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
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Rating</option>
              <option value="release_date">Release Date</option>
              <option value="title">Title</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="lg:w-32">
            <h3 className="text-lg font-semibold mb-3">View</h3>
            <div className="flex gap-2">
              <button
                type="button"
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
                type="button"
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
        </div>

        {/* Clear Filters */}
        {(selectedMediaType !== type || selectedYear) && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <button
              type="button"
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
          Showing {filteredResults.length} of {totalResults} results
        </p>
        <p className="text-gray-300">
          Page {page} of {totalPages}
        </p>
      </div>

      {/* Results Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResults.map((item, index) => (
            <motion.div
              key={`${item.media_type}-${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={getItemLink(item)}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300">
                  <div className="relative h-64">
                    <Image
                      src={getItemImage(item)}
                      alt={getItemTitle(item)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                      {getMediaTypeIcon(item.media_type)}
                      {item.media_type === "movie"
                        ? "Movie"
                        : item.media_type === "tv"
                        ? "TV"
                        : "Person"}
                    </div>
                    {item.vote_average > 0 && (
                      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        {item.vote_average.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                      {getItemTitle(item)}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>
                        {formatDate(item.release_date || item.first_air_date)}
                      </span>
                      {item.media_type === "person" &&
                        item.known_for_department && (
                          <span>{item.known_for_department}</span>
                        )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((item, index) => (
            <motion.div
              key={`${item.media_type}-${item.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              className="group"
            >
              <Link href={getItemLink(item)}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-30 flex-shrink-0">
                      <Image
                        src={getItemImage(item)}
                        alt={getItemTitle(item)}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-red-400 transition-colors duration-300">
                          {getItemTitle(item)}
                        </h3>
                        <span className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300 flex items-center gap-1">
                          {getMediaTypeIcon(item.media_type)}
                          {item.media_type === "movie"
                            ? "Movie"
                            : item.media_type === "tv"
                            ? "TV"
                            : "Person"}
                        </span>
                      </div>
                      {item.overview && (
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                          {item.overview}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        {formatDate(
                          item.release_date || item.first_air_date
                        ) && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(
                              item.release_date || item.first_air_date
                            )}
                          </span>
                        )}
                        {item.vote_average > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            {item.vote_average.toFixed(1)} (
                            {item.vote_count.toLocaleString()})
                          </span>
                        )}
                        {item.media_type === "person" &&
                          item.known_for_department && (
                            <span>{item.known_for_department}</span>
                          )}
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
            type="button"
            onClick={() => {
              const newPage = Math.max(1, page - 1);
              window.history.pushState(
                {},
                "",
                `?q=${query}&type=${selectedMediaType}&page=${newPage}`
              );
            }}
            disabled={page === 1}
            className="p-2 bg-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600/50 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
            return (
              <button
                type="button"
                key={pageNum}
                onClick={() => {
                  window.history.pushState(
                    {},
                    "",
                    `?q=${query}&type=${selectedMediaType}&page=${pageNum}`
                  );
                }}
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  page === pageNum
                    ? "bg-gradient-to-r from-red-500 to-purple-600 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              const newPage = Math.min(totalPages, page + 1);
              window.history.pushState(
                {},
                "",
                `?q=${query}&type=${selectedMediaType}&page=${newPage}`
              );
            }}
            disabled={page === totalPages}
            className="p-2 bg-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600/50 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredResults.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">No results found</h3>
          <p className="text-gray-400 mb-6">
            No results found for &quot;{query}&quot;. Try adjusting your search
            terms or filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
