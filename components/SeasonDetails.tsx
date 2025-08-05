"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Star,
  Users,
  Play,
  Info,
  ChevronDown,
  ChevronUp,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SeasonDetailsProps {
  seriesId: string;
  seasonNumber: string;
}

interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string;
  air_date: string;
  episode_number: number;
  vote_average: number;
  vote_count: number;
  runtime: number;
  guest_stars: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }>;
}

interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  air_date: string;
  season_number: number;
  episode_count: number;
  episodes: Episode[];
}

interface Series {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export default function SeasonDetails({
  seriesId,
  seasonNumber,
}: SeasonDetailsProps) {
  const [season, setSeason] = useState<Season | null>(null);
  const [series, setSeries] = useState<Series | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedEpisodes, setExpandedEpisodes] = useState<Set<number>>(
    new Set()
  );
  const [activeTab, setActiveTab] = useState<"overview" | "episodes" | "cast">(
    "overview"
  );

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch series details
        const seriesResponse = await fetch(`/api/tv/${seriesId}`);
        if (seriesResponse.ok) {
          const seriesData = await seriesResponse.json();
          setSeries(seriesData);
        }

        // Fetch season details
        const seasonResponse = await fetch(
          `/api/tv/${seriesId}/season/${seasonNumber}`
        );
        if (!seasonResponse.ok)
          throw new Error("Failed to fetch season details");

        const seasonData = await seasonResponse.json();
        setSeason(seasonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeasonDetails();
  }, [seriesId, seasonNumber]);

  const toggleEpisodeExpansion = (episodeId: number) => {
    setExpandedEpisodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(episodeId)) {
        newSet.delete(episodeId);
      } else {
        newSet.add(episodeId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "TBA";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRuntime = (minutes: number) => {
    if (!minutes) return "Unknown";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
          <div className="flex gap-6">
            <div className="w-48 h-72 bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-lg p-4 animate-pulse"
            >
              <div className="h-32 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-4">Error Loading Season</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!season) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-4">Season Not Found</h3>
        <p className="text-gray-400 mb-6">
          The requested season could not be found.
        </p>
        <Link
          href={`/tv-series/${seriesId}`}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
        >
          Back to Series
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>•</span>
        <Link href="/tv-series" className="hover:text-white transition-colors">
          TV Series
        </Link>
        <span>•</span>
        <Link
          href={`/tv-series/${seriesId}`}
          className="hover:text-white transition-colors"
        >
          {series?.name || "Series"}
        </Link>
        <span>•</span>
        <span className="text-white">Season {seasonNumber}</span>
      </div>

      {/* Season Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative w-48 h-72 flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
              alt={season.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {season.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(season.air_date)}
                </span>
                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  {season.episode_count} Episodes
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  {season.episodes?.[0]?.vote_average?.toFixed(1) || "N/A"}
                </span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {season.overview || "No overview available for this season."}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/tv-series/${seriesId}`}
                className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                Back to Series
              </Link>
              {series && (
                <Link
                  href={`/tv-series/${seriesId}/season/${
                    parseInt(seasonNumber) + 1
                  }`}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Next Season
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
        <div className="flex border-b border-gray-700">
          {[
            { id: "overview", label: "Overview", icon: Info },
            { id: "episodes", label: "Episodes", icon: Play },
            { id: "cast", label: "Cast", icon: Users },
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "overview" | "episodes" | "cast")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-purple-500 bg-gray-700/30"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/20"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {season.episode_count}
                  </div>
                  <div className="text-sm text-gray-300">Episodes</div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatDate(season.air_date)}
                  </div>
                  <div className="text-sm text-gray-300">Air Date</div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {season.episodes?.[0]?.vote_average?.toFixed(1) || "N/A"}
                  </div>
                  <div className="text-sm text-gray-300">Rating</div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {season.episodes?.[0]?.runtime
                      ? formatRuntime(season.episodes[0].runtime)
                      : "N/A"}
                  </div>
                  <div className="text-sm text-gray-300">Avg Runtime</div>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Season Overview
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {season.overview ||
                    "No detailed overview available for this season."}
                </p>
              </div>
            </div>
          )}

          {/* Episodes Tab */}
          {activeTab === "episodes" && (
            <div className="space-y-4">
              {season.episodes?.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700/30 rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative w-32 h-20 flex-shrink-0">
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                          alt={episode.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-white mb-1">
                              {episode.episode_number}. {episode.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(episode.air_date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {formatRuntime(episode.runtime)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                {episode.vote_average.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleEpisodeExpansion(episode.id)}
                            className="p-1 hover:bg-gray-600/50 rounded transition-colors"
                          >
                            {expandedEpisodes.has(episode.id) ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        <p className="text-gray-300 text-sm line-clamp-2">
                          {episode.overview ||
                            "No overview available for this episode."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Episode Details */}
                  {expandedEpisodes.has(episode.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-600 p-4 bg-gray-800/30"
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-white mb-2">
                            Episode Overview
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {episode.overview ||
                              "No detailed overview available for this episode."}
                          </p>
                        </div>

                        {episode.guest_stars &&
                          episode.guest_stars.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-white mb-2">
                                Guest Stars
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {episode.guest_stars.slice(0, 8).map((star) => (
                                  <div
                                    key={star.id}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="relative w-8 h-8">
                                      <Image
                                        src={`https://image.tmdb.org/t/p/w92${star.profile_path}`}
                                        alt={star.name}
                                        fill
                                        className="object-cover rounded-full"
                                      />
                                    </div>
                                    <div className="text-xs">
                                      <div className="text-white font-medium">
                                        {star.name}
                                      </div>
                                      <div className="text-gray-400">
                                        {star.character}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Cast Tab */}
          {activeTab === "cast" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {season.episodes?.[0]?.guest_stars?.map((star) => (
                  <motion.div
                    key={star.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-600/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src={`https://image.tmdb.org/t/p/w185${star.profile_path}`}
                          alt={star.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white text-sm">
                          {star.name}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {star.character}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {(!season.episodes?.[0]?.guest_stars ||
                season.episodes[0].guest_stars.length === 0) && (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">
                    No cast information available for this season.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
