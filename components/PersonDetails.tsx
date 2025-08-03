"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Star,
  ArrowLeft,
  ExternalLink,
  Award,
  Users,
  Film,
  Tv,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PersonDetailsProps {
  personId: string;
}

interface Person {
  id: number;
  name: string;
  biography: string;
  profile_path: string;
  birthday: string;
  deathday: string | null;
  place_of_birth: string;
  known_for_department: string;
  popularity: number;
  imdb_id: string;
  homepage: string;
  gender: number;
  adult: boolean;
  also_known_as: string[];
}

interface MovieCredit {
  id: number;
  title: string;
  character: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  media_type: "movie" | "tv";
  episode_count?: number;
  first_air_date?: string;
  name?: string;
}

interface TVCredit {
  id: number;
  name: string;
  character: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  episode_count: number;
  media_type: "tv";
}

export default function PersonDetails({ personId }: PersonDetailsProps) {
  const [person, setPerson] = useState<Person | null>(null);
  const [movieCredits, setMovieCredits] = useState<MovieCredit[]>([]);
  const [tvCredits, setTVCredits] = useState<TVCredit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "movies" | "tv" | "photos"
  >("overview");

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch person details
        const personResponse = await fetch(`/api/person/${personId}`);
        if (!personResponse.ok)
          throw new Error("Failed to fetch person details");
        const personData = await personResponse.json();
        setPerson(personData);

        // Fetch movie credits
        const movieCreditsResponse = await fetch(
          `/api/person/${personId}/movie_credits`
        );
        if (movieCreditsResponse.ok) {
          const movieCreditsData = await movieCreditsResponse.json();
          setMovieCredits(movieCreditsData.cast?.slice(0, 12) || []);
        }

        // Fetch TV credits
        const tvCreditsResponse = await fetch(
          `/api/person/${personId}/tv_credits`
        );
        if (tvCreditsResponse.ok) {
          const tvCreditsData = await tvCreditsResponse.json();
          setTVCredits(tvCreditsData.cast?.slice(0, 12) || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (personId) {
      fetchPersonDetails();
    }
  }, [personId]);

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

  if (error || !person) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Person Not Found</h2>
          <p className="text-gray-300 mb-6">
            {error || "The requested person could not be found."}
          </p>
          <Link
            href="/search"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (birthDate: string, deathDate?: string | null) => {
    const birth = new Date(birthDate);
    const end = deathDate ? new Date(deathDate) : new Date();
    const age = end.getFullYear() - birth.getFullYear();
    const monthDiff = end.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const getGenderText = (gender: number) => {
    switch (gender) {
      case 1:
        return "Female";
      case 2:
        return "Male";
      default:
        return "Not specified";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

        {/* Back Button */}
        <Link
          href="/search"
          className="absolute top-6 left-6 z-10 inline-flex items-center px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        {/* Person Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-end">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-shrink-0"
              >
                <Image
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                      : "/placeholder-avatar.png"
                  }
                  alt={person.name}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>

              {/* Person Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex-1"
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  {person.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                  {person.birthday && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{formatDate(person.birthday)}</span>
                      {!person.deathday && (
                        <span className="text-gray-400">
                          ({calculateAge(person.birthday)} years old)
                        </span>
                      )}
                    </div>
                  )}
                  {person.deathday && (
                    <div className="flex items-center gap-1">
                      <span className="text-red-400">
                        † {formatDate(person.deathday)}
                      </span>
                      <span className="text-gray-400">
                        (aged {calculateAge(person.birthday, person.deathday)})
                      </span>
                    </div>
                  )}
                  {person.place_of_birth && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{person.place_of_birth}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{person.popularity.toFixed(1)} popularity</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {person.homepage && (
                    <a
                      href={person.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Official Website
                    </a>
                  )}
                  {person.imdb_id && (
                    <a
                      href={`https://www.imdb.com/name/${person.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      IMDb
                    </a>
                  )}
                  <button className="inline-flex items-center px-4 py-2 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 text-white rounded-lg transition-all duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 text-white rounded-lg transition-all duration-300">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 text-white rounded-lg transition-all duration-300">
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
            { id: "movies", label: "Movies" },
            { id: "tv", label: "TV Shows" },
            { id: "photos", label: "Photos" },
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
                <h3 className="text-2xl font-bold mb-4">Biography</h3>
                {person.biography ? (
                  <p className="text-gray-300 leading-relaxed mb-8 whitespace-pre-line">
                    {person.biography}
                  </p>
                ) : (
                  <p className="text-gray-400 italic mb-8">
                    No biography available for this person.
                  </p>
                )}

                {person.also_known_as.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">
                      Also Known As
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {person.also_known_as.map((name, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700/50 backdrop-blur-sm rounded-full text-sm"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Personal Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Known For</span>
                      <span>{person.known_for_department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gender</span>
                      <span>{getGenderText(person.gender)}</span>
                    </div>
                    {person.birthday && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Birthday</span>
                        <span>{formatDate(person.birthday)}</span>
                      </div>
                    )}
                    {person.deathday && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Death Date</span>
                        <span className="text-red-400">
                          {formatDate(person.deathday)}
                        </span>
                      </div>
                    )}
                    {person.place_of_birth && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Birth Place</span>
                        <span>{person.place_of_birth}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Popularity</span>
                      <span>{person.popularity.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Career Stats</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Film className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Movies</p>
                        <p className="font-semibold">{movieCredits.length}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Tv className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">TV Shows</p>
                        <p className="font-semibold">{tvCredits.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "movies" && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Movie Credits</h3>
              {movieCredits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {movieCredits.map((movie) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      <Link href={`/movies/${movie.id}`}>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300">
                          <div className="relative h-64">
                            <Image
                              src={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                  : "/placeholder-poster.png"
                              }
                              alt={movie.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              {movie.vote_average.toFixed(1)}
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                              {movie.title}
                            </h4>
                            <p className="text-xs text-gray-400 mb-2">
                              {movie.character}
                            </p>
                            <p className="text-xs text-gray-500">
                              {movie.release_date
                                ? new Date(movie.release_date).getFullYear()
                                : "TBA"}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No movie credits available.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "tv" && (
            <div>
              <h3 className="text-2xl font-bold mb-6">TV Show Credits</h3>
              {tvCredits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {tvCredits.map((show) => (
                    <motion.div
                      key={show.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      <Link href={`/tv-series/${show.id}`}>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300">
                          <div className="relative h-64">
                            <Image
                              src={
                                show.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                                  : "/placeholder-poster.png"
                              }
                              alt={show.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              {show.vote_average.toFixed(1)}
                            </div>
                            <div className="absolute top-2 left-2 bg-purple-600/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                              TV
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                              {show.name}
                            </h4>
                            <p className="text-xs text-gray-400 mb-2">
                              {show.character}
                            </p>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>
                                {show.first_air_date
                                  ? new Date(show.first_air_date).getFullYear()
                                  : "TBA"}
                              </span>
                              <span>{show.episode_count} episodes</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Tv className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No TV show credits available.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "photos" && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Photos</h3>
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Photo gallery coming soon.</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
