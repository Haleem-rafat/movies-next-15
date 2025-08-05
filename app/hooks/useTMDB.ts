import useSWR from "swr";
import { ISuggestions } from "@/app/api/types/suggestions.types";
import { SWR_KEYS } from "../constants/swrkeys";
import suggestionsService from "../api/service/suggestions.service";

// Fetcher function for API calls
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// Custom hook for search suggestions
export const useSearchSuggestions = (query: string) => {
  const { data, error, isLoading, mutate } = useSWR<ISuggestions>(
    query.trim() ? `/api/search?q=${encodeURIComponent(query)}&limit=10` : null,
    fetcher
  );

  return {
    suggestions: data?.results || [],
    totalResults: data?.total_results || 0,
    totalPages: data?.total_pages || 0,
    currentPage: data?.page || 1,
    isLoading,
    error,
    mutate,
  };
};

// Custom hook for popular movies
export const usePopularMovies = (page: number = 1) => {
  const { data, error, isLoading, mutate } = useSWR<ISuggestions>(
    `/api/movies/popular?page=${page}`,
    fetcher
  );

  return {
    movies: data?.results || [],
    totalResults: data?.total_results || 0,
    totalPages: data?.total_pages || 0,
    currentPage: data?.page || 1,
    isLoading,
    error,
    mutate,
  };
};

// Custom hook for top rated movies
export const useTopRatedMovies = (page: number = 1) => {
  const { data, error, isLoading, mutate } = useSWR<ISuggestions>(
    `/api/movies/top-rated?page=${page}`,
    fetcher
  );

  return {
    movies: data?.results || [],
    totalResults: data?.total_results || 0,
    totalPages: data?.total_pages || 0,
    currentPage: data?.page || 1,
    isLoading,
    error,
    mutate,
  };
};

// Custom hook for trending content
export const useTrending = (
  mediaType: "all" | "movie" | "tv" = "all",
  timeWindow: "day" | "week" = "week"
) => {
  const { data, error, isLoading, mutate } = useSWR(
    [SWR_KEYS.TRENDING, mediaType, timeWindow],
    async () => {
      return suggestionsService.getTrending();
    }
  );

  return {
    trending: data?.results || [],
    totalResults: data?.total_results || 0,
    totalPages: data?.total_pages || 0,
    currentPage: data?.page || 1,
    isLoading,
    error,
    mutate,
  };
};

// Custom hook for movie details
export const useMovieDetails = (movieId: string | number) => {
  const { data, error, isLoading, mutate } = useSWR(
    movieId ? `/api/movies/${movieId}` : null,
    fetcher
  );

  return {
    movie: data,
    isLoading,
    error,
    mutate,
  };
};

// Custom hook for TV series details
export const useTVDetails = (tvId: string | number) => {
  const { data, error, isLoading, mutate } = useSWR(
    tvId ? `/api/tv/${tvId}` : null,
    fetcher
  );

  return {
    tv: data,
    isLoading,
    error,
    mutate,
  };
};

// Custom hook for person details
export const usePersonDetails = (personId: string | number) => {
  const { data, error, isLoading, mutate } = useSWR(
    personId ? `/api/person/${personId}` : null,
    fetcher
  );

  return {
    person: data,
    isLoading,
    error,
    mutate,
  };
};
