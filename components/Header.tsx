"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Loader2,
  Menu,
  Search,
  X,
  Film,
  Tv,
  TrendingUp,
  Star,
  Calendar,
  Play,
  Heart,
  Share2,
  Eye,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Result } from "@/app/api/types/suggestions.types";
import { useSearchSuggestions } from "@/app/hooks/useTMDB";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: TrendingUp,
      description: "Discover trending content",
    },
    {
      label: "Movies",
      href: "/movies",
      icon: Film,
      description: "Browse movies by category",
      subItems: [
        {
          label: "Trending",
          href: "/movies/category/trending",
          icon: TrendingUp,
        },
        { label: "Popular", href: "/movies/category/popular", icon: Star },
        { label: "Top Rated", href: "/movies/category/top-rated", icon: Award },
        {
          label: "Upcoming",
          href: "/movies/category/upcoming",
          icon: Calendar,
        },
        {
          label: "Now Playing",
          href: "/movies/category/now-playing",
          icon: Play,
        },
      ],
    },
    {
      label: "TV Series",
      href: "/tv-series",
      icon: Tv,
      description: "Explore TV shows",
      subItems: [
        {
          label: "Trending",
          href: "/tv-series/category/trending",
          icon: TrendingUp,
        },
        { label: "Popular", href: "/tv-series/category/popular", icon: Star },
        {
          label: "Top Rated",
          href: "/tv-series/category/top-rated",
          icon: Award,
        },
        { label: "On Air", href: "/tv-series/category/on-air", icon: Tv },
        {
          label: "Airing Today",
          href: "/tv-series/category/airing-today",
          icon: Calendar,
        },
      ],
    },
  ];

  // Debounce search term to avoid excessive API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Use custom hook for search suggestions
  const {
    suggestions,
    isLoading: suggestionsIsLoading,
    error: suggestionsError,
  } = useSearchSuggestions(debouncedSearchTerm);

  // Memoized filtered suggestions
  const filteredSuggestions = useMemo(() => {
    return suggestions
      .filter(
        (result: Result) =>
          result.media_type === "movie" || result.media_type === "tv"
      )
      .slice(0, 5);
  }, [suggestions]);

  // Show search dropdown when there are suggestions or when loading
  useEffect(() => {
    if (
      debouncedSearchTerm.trim() &&
      (filteredSuggestions.length > 0 || suggestionsIsLoading)
    ) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [debouncedSearchTerm, filteredSuggestions.length, suggestionsIsLoading]);

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);

      if (!value.trim()) {
        setIsSearchOpen(false);
      }
    },
    []
  );

  const handleSearchClick = useCallback(() => {
    if (isSearchOpen && filteredSuggestions.length > 0) {
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  }, [isSearchOpen, filteredSuggestions.length]);

  const handleSuggestionClick = useCallback(() => {
    setIsSearchOpen(false);
    setSearchTerm("");
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <motion.header
      className="bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-sm text-white w-full py-4 z-50 md:px-10 px-4 xl:px-36 fixed top-0 left-0 border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navbar */}
      <nav className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link className="flex items-center gap-2 group" href="/">
            <div className="p-2 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg group-hover:from-red-600 group-hover:to-purple-700 transition-all duration-300">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                MovieHub
              </span>
              <span className="text-xs text-gray-400 hidden sm:block">
                Discover Amazing Content
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                    pathname === item.href
                      ? "bg-white/20 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {item.subItems && (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 0 }}
                      className="w-3 h-3"
                    >
                      <svg
                        className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  )}
                </Link>

                {/* Desktop Dropdown */}
                {item.subItems && (
                  <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 p-2 min-w-48">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                        >
                          <subItem.icon className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
                          <span className="text-sm">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search bar */}
          <motion.div className="relative w-full md:w-80 lg:w-96 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies and TV shows..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none rounded-xl border border-white/20 focus:border-white/40 pr-10 transition-all duration-200"
              />
              <button
                type="button"
                onClick={handleSearchClick}
                disabled={suggestionsIsLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                {suggestionsIsLoading ? (
                  <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                ) : isSearchOpen && filteredSuggestions.length > 0 ? (
                  <X className="w-4 h-4 text-gray-400 hover:text-white" />
                ) : (
                  <Search className="w-4 h-4 text-gray-400 hover:text-white" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 z-50 mt-2 max-h-80 overflow-y-auto"
                >
                  {suggestionsIsLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="w-5 h-5 text-gray-400 animate-spin mr-2" />
                      <span className="text-gray-400">Searching...</span>
                    </div>
                  ) : suggestionsError ? (
                    <div className="p-4 text-center">
                      <p className="text-red-400">Error loading suggestions</p>
                    </div>
                  ) : filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((suggestion: Result) => (
                      <Link
                        key={suggestion.id}
                        href={`/${suggestion.media_type}/${suggestion.id}`}
                        onClick={handleSuggestionClick}
                      >
                        <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer group transition-all duration-200">
                          <div className="relative w-12 h-16 flex-shrink-0">
                            <Image
                              src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`}
                              alt={suggestion.title || suggestion.name || ""}
                              fill
                              className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm text-white font-semibold mb-1 group-hover:text-yellow-400 transition-colors">
                              {suggestion.title || suggestion.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  suggestion.media_type === "movie"
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                    : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                }`}
                              >
                                {suggestion.media_type === "movie"
                                  ? "Movie"
                                  : "TV Show"}
                              </span>
                              <span>•</span>
                              <span>
                                {(
                                  suggestion.release_date ||
                                  suggestion.first_air_date
                                )?.split("-")[0] || "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                              >
                                <Eye className="w-3 h-3 text-gray-400 hover:text-white" />
                              </button>
                              <button
                                type="button"
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                              >
                                <Heart className="w-3 h-3 text-gray-400 hover:text-white" />
                              </button>
                              <button
                                type="button"
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                              >
                                <Share2 className="w-3 h-3 text-gray-400 hover:text-white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : debouncedSearchTerm.trim() ? (
                    <div className="p-4 text-center">
                      <p className="text-gray-400">
                        No results found for &quot;{debouncedSearchTerm}&quot;
                      </p>
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mobile Search */}
          <div className="md:hidden w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none rounded-lg border border-white/20 focus:border-white/40 pr-10 transition-all duration-200"
              />
              <button
                type="button"
                onClick={handleSearchClick}
                disabled={suggestionsIsLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                {suggestionsIsLoading ? (
                  <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 text-gray-400 hover:text-white" />
                )}
              </button>
            </div>

            {/* Mobile Search Results */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 z-50 mt-2 max-h-60 overflow-y-auto"
                >
                  {suggestionsIsLoading ? (
                    <div className="flex items-center justify-center p-3">
                      <Loader2 className="w-4 h-4 text-gray-400 animate-spin mr-2" />
                      <span className="text-gray-400 text-sm">
                        Searching...
                      </span>
                    </div>
                  ) : filteredSuggestions.length > 0 ? (
                    filteredSuggestions
                      .slice(0, 3)
                      .map((suggestion: Result) => (
                        <Link
                          key={suggestion.id}
                          href={`/${suggestion.media_type}/${suggestion.id}`}
                          onClick={handleSuggestionClick}
                        >
                          <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer group transition-all duration-200">
                            <div className="relative w-10 h-12 flex-shrink-0">
                              <Image
                                src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`}
                                alt={suggestion.title || suggestion.name || ""}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm text-white font-medium mb-1 group-hover:text-yellow-400 transition-colors">
                                {suggestion.title || suggestion.name}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    suggestion.media_type === "movie"
                                      ? "bg-red-500/20 text-red-400"
                                      : "bg-purple-500/20 text-purple-400"
                                  }`}
                                >
                                  {suggestion.media_type === "movie"
                                    ? "Movie"
                                    : "TV"}
                                </span>
                                <span>
                                  {(
                                    suggestion.release_date ||
                                    suggestion.first_air_date
                                  )?.split("-")[0] || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                  ) : debouncedSearchTerm.trim() ? (
                    <div className="p-3 text-center">
                      <p className="text-gray-400 text-sm">No results found</p>
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 top-24 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleMobileMenuClose}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-900/95 backdrop-blur-sm p-6 flex flex-col gap-2 text-white border-b border-gray-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item) => (
                <div key={item.label} className="space-y-2">
                  <Link
                    onClick={handleMobileMenuClose}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      pathname === item.href
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10 text-gray-300 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
                    <span className="font-medium">{item.label}</span>
                  </Link>

                  {/* Mobile submenu */}
                  {item.subItems && (
                    <div className="ml-8 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          onClick={handleMobileMenuClose}
                          href={subItem.href}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group ${
                            pathname === subItem.href
                              ? "bg-white/20 text-white"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <subItem.icon className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
                          <span className="text-sm">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
