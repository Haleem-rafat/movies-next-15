"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Star,
  Play,
  Heart,
  Share2,
  Bookmark,
  ArrowLeft,
  Users,
  Tv,
  Award,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TVSeriesDetailsProps {
  seriesId: string;
}

interface TVSeries {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  status: string;
  type: string;
  in_production: boolean;
  production_companies: Array<{ id: number; name: string; logo_path: string }>;
  spoken_languages: Array<{ english_name: string; iso_639_1: string }>;
  production_countries: Array<{ name: string; iso_3166_1: string }>;
  networks: Array<{ id: number; name: string; logo_path: string }>;
  created_by: Array<{ id: number; name: string; profile_path: string }>;
}

interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  episode_count: number;
  air_date: string;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  order: number;
}

interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  created_at: string;
}

export default function TVSeriesDetails({ seriesId }: TVSeriesDetailsProps) {
  const [series, setSeries] = useState<TVSeries | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [cast, setCast] = useState<Cast[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "seasons" | "cast" | "reviews"
  >("overview");

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch series details
        const seriesResponse = await fetch(`/api/tv/${seriesId}`);
        if (!seriesResponse.ok)
          throw new Error("Failed to fetch series details");
        const seriesData = await seriesResponse.json();
        setSeries(seriesData);

        // Fetch seasons
        const seasonsResponse = await fetch(`/api/tv/${seriesId}/seasons`);
        if (seasonsResponse.ok) {
          const seasonsData = await seasonsResponse.json();
          setSeasons(seasonsData.seasons || []);
        }

        // Fetch cast
        const castResponse = await fetch(`/api/tv/${seriesId}/credits`);
        if (castResponse.ok) {
          const castData = await castResponse.json();
          setCast(castData.cast?.slice(0, 10) || []);
        }

        // Fetch reviews
        const reviewsResponse = await fetch(`/api/tv/${seriesId}/reviews`);
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData.results?.slice(0, 5) || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (seriesId) {
      fetchSeriesDetails();
    }
  }, [seriesId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-700 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-700 rounded mb-4"></div>
              </div>
              <div className="h-96 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !series) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">TV Series Not Found</h2>
          <p className="text-gray-300 mb-6">
            {error || "The requested TV series could not be found."}
          </p>
          <Link
            href="/tv-series"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to TV Series
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Backdrop Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
          alt={series.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

        {/* Back Button */}
        <Link
          href="/tv-series"
          className="absolute top-6 left-6 z-10 inline-flex items-center px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        {/* Series Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-end">
              {/* Poster */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-shrink-0"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt={series.name}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>

              {/* Series Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex-1"
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  {series.name}
                </h1>
                {series.original_name !== series.name && (
                  <p className="text-lg text-gray-300 mb-4">
                    {series.original_name}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(series.first_air_date)}</span>
                    {series.last_air_date &&
                      series.last_air_date !== series.first_air_date && (
                        <span> - {formatDate(series.last_air_date)}</span>
                      )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tv className="w-4 h-4 text-gray-400" />
                    <span>
                      {series.number_of_seasons} Season
                      {series.number_of_seasons !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>
                      {series.number_of_episodes} Episode
                      {series.number_of_episodes !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{series.vote_average.toFixed(1)}</span>
                    <span className="text-gray-400">
                      ({series.vote_count.toLocaleString()})
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {series.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-700/50 backdrop-blur-sm rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Trailer
                  </button>
                  <button className="inline-flex items-center px-4 py-3 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 text-white rounded-lg transition-all duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="inline-flex items-center px-4 py-3 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 text-white rounded-lg transition-all duration-300">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="inline-flex items-center px-4 py-3 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 text-white rounded-lg transition-all duration-300">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex border-b border-gray-700 mb-8 overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "seasons", label: "Seasons" },
            { id: "cast", label: "Cast & Crew" },
            { id: "reviews", label: "Reviews" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  {series.overview}
                </p>

                {series.created_by.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">Created By</h4>
                    <div className="flex flex-wrap gap-2">
                      {series.created_by.map((creator) => (
                        <span
                          key={creator.id}
                          className="px-3 py-1 bg-gray-700/50 backdrop-blur-sm rounded-full text-sm"
                        >
                          {creator.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {series.production_companies.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">
                      Production Companies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {series.production_companies.map((company) => (
                        <span
                          key={company.id}
                          className="px-3 py-1 bg-gray-700/50 backdrop-blur-sm rounded-full text-sm"
                        >
                          {company.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Series Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className="flex items-center gap-1">
                        {series.status}
                        {series.in_production && (
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type</span>
                      <span>{series.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Seasons</span>
                      <span>{series.number_of_seasons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Episodes</span>
                      <span>{series.number_of_episodes}</span>
                    </div>
                    {series.spoken_languages.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Language</span>
                        <span>
                          {series.spoken_languages
                            .map((lang) => lang.english_name)
                            .join(", ")}
                        </span>
                      </div>
                    )}
                    {series.production_countries.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Country</span>
                        <span>
                          {series.production_countries
                            .map((country) => country.name)
                            .join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {series.networks.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">Networks</h4>
                    <div className="space-y-2">
                      {series.networks.map((network) => (
                        <div
                          key={network.id}
                          className="flex items-center gap-2"
                        >
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{network.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "seasons" && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Seasons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seasons.map((season) => (
                  <motion.div
                    key={season.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Link
                      href={`/tv-series/${seriesId}/season/${season.season_number}`}
                    >
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300">
                        <div className="relative h-48">
                          <Image
                            src={
                              season.poster_path
                                ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                                : `https://image.tmdb.org/t/p/w500${series.poster_path}`
                            }
                            alt={season.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                            {season.episode_count} Episodes
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors duration-300">
                            {season.name}
                          </h4>
                          {season.air_date && (
                            <p className="text-sm text-gray-400 mb-2">
                              {new Date(season.air_date).getFullYear()}
                            </p>
                          )}
                          {season.overview && (
                            <p className="text-sm text-gray-300 line-clamp-2">
                              {season.overview}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "cast" && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Cast & Crew</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {cast.map((person) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                            : "/placeholder-avatar.png"
                        }
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm mb-1">
                        {person.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {person.character}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Reviews</h3>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {review.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.author}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed line-clamp-4">
                        {review.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No reviews available yet.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
