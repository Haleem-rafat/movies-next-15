import { ISuggestions } from "../types/suggestions.types";
import instance from "./api";

// API Key from environment
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Predefined request URLs
const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=horror&page=1&include_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
};

interface SearchParams {
  query: string;
  page?: number;
  include_adult?: boolean;
}

interface DiscoverParams {
  page?: number;
  sort_by?: string;
  genre?: string;
  year?: number;
  with_keywords?: string;
  with_genres?: string;
  with_cast?: string;
  with_crew?: string;
  include_adult?: boolean;
  include_video?: boolean;
  primary_release_year?: number;
  first_air_date_year?: number;
}

interface TrendingParams {
  mediaType?: "all" | "movie" | "tv" | "person";
  timeWindow?: "day" | "week";
  page?: number;
}

class SuggestionsService {
  public async searchMulti(params: SearchParams): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/search/multi", {
        params: {
          query: params.query,
          page: params.page || 1,
          include_adult: params.include_adult || false,
        },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getPopularMovies(_page: number = 1): Promise<ISuggestions> {
    try {
      // Use predefined request URL for popular movies
      const response = await fetch(requests.requestPopular);
      if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getTopRatedMovies(page: number = 1): Promise<ISuggestions> {
    try {
      // Use predefined request URL for top rated movies
      const response = await fetch(requests.requestTopRated);
      if (!response.ok) {
        throw new Error("Failed to fetch top rated movies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getPopularTV(page: number = 1): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/tv/popular", {
        params: { page },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getTopRatedTV(page: number = 1): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/tv/top_rated", {
        params: { page },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getTrending(params: TrendingParams = {}): Promise<ISuggestions> {
    try {
      // Use predefined request URL for trending movies
      const response = await fetch(requests.requestTrending);
      if (!response.ok) {
        throw new Error("Failed to fetch trending movies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getMovieDetails(movieId: string | number): Promise<any> {
    try {
      const { data } = await instance.get(`/movie/${movieId}`, {
        params: {
          append_to_response: "credits,videos,images,similar,recommendations",
        },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getTVDetails(tvId: string | number): Promise<any> {
    try {
      const { data } = await instance.get(`/tv/${tvId}`, {
        params: {
          append_to_response: "credits,videos,images,similar,recommendations",
        },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getMovieGenres(): Promise<any> {
    try {
      const { data } = await instance.get("/genre/movie/list");
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getTVGenres(): Promise<any> {
    try {
      const { data } = await instance.get("/genre/tv/list");
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async discoverMovies(
    params: DiscoverParams = {}
  ): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/discover/movie", { params });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async discoverTV(params: DiscoverParams = {}): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/discover/tv", { params });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getUpcomingMovies(page: number = 1): Promise<ISuggestions> {
    try {
      // Use predefined request URL for upcoming movies
      const response = await fetch(requests.requestUpcoming);
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getHorrorMovies(): Promise<ISuggestions> {
    try {
      // Use predefined request URL for horror movies
      const response = await fetch(requests.requestHorror);
      if (!response.ok) {
        throw new Error("Failed to fetch horror movies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getNowPlayingMovies(page: number = 1): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/movie/now_playing", {
        params: { page },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getOnTheAirTV(page: number = 1): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/tv/on_the_air", {
        params: { page },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getAiringTodayTV(page: number = 1): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/tv/airing_today", {
        params: { page },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getPersonDetails(personId: string | number): Promise<any> {
    try {
      const { data } = await instance.get(`/person/${personId}`, {
        params: {
          append_to_response: "movie_credits,tv_credits,images,external_ids",
        },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getMovieCredits(movieId: string | number): Promise<any> {
    try {
      const { data } = await instance.get(`/movie/${movieId}/credits`);
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getTVCredits(tvId: string | number): Promise<any> {
    try {
      const { data } = await instance.get(`/tv/${tvId}/credits`);
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getMovieVideos(movieId: string | number): Promise<any> {
    try {
      const { data } = await instance.get(`/movie/${movieId}/videos`);
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getTVVideos(tvId: string | number): Promise<any> {
    try {
      const { data } = await instance.get(`/tv/${tvId}/videos`);
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getMovieImages(movieId: string | number): Promise<any> {
    try {
      const { data } = await instance.get(`/movie/${movieId}/images`);
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getTVImages(tvId: string | number): Promise<any> {
    try {
      const { data } = await instance.get(`/tv/${tvId}/images`);
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getMovieRecommendations(
    movieId: string | number,
    page: number = 1
  ): Promise<ISuggestions> {
    try {
      const { data } = await instance.get(`/movie/${movieId}/recommendations`, {
        params: { page },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getTVRecommendations(
    tvId: string | number,
    page: number = 1
  ): Promise<ISuggestions> {
    try {
      const { data } = await instance.get(`/tv/${tvId}/recommendations`, {
        params: { page },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getMovieSimilar(
    movieId: string | number,
    page: number = 1
  ): Promise<ISuggestions> {
    try {
      const { data } = await instance.get(`/movie/${movieId}/similar`, {
        params: { page },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }

  public async getTVSimilar(
    tvId: string | number,
    page: number = 1
  ): Promise<ISuggestions> {
    try {
      const { data } = await instance.get(`/tv/${tvId}/similar`, {
        params: { page },
      });
      return data;
    } catch (error) {
      // Log error for debugging (consider using a proper logging service in production)
      throw error;
    }
  }
}

export default Object.freeze(new SuggestionsService());
