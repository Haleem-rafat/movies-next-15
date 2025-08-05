import { ISuggestions } from "../types/suggestions.types";
import instance from "./api";

// Type definitions for API responses
interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path?: string;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      profile_path?: string;
    }>;
  };
  videos: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  images: {
    backdrops: Array<{ file_path: string; width: number; height: number }>;
    posters: Array<{ file_path: string; width: number; height: number }>;
  };
  similar: ISuggestions;
  recommendations: ISuggestions;
}

interface TVDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  last_air_date: string;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path?: string;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      profile_path?: string;
    }>;
  };
  videos: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  images: {
    backdrops: Array<{ file_path: string; width: number; height: number }>;
    posters: Array<{ file_path: string; width: number; height: number }>;
  };
  similar: ISuggestions;
  recommendations: ISuggestions;
}

interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  profile_path?: string;
  birthday?: string;
  place_of_birth?: string;
  known_for_department: string;
  popularity: number;
  combined_credits: {
    cast: Array<{
      id: number;
      title?: string;
      name?: string;
      character: string;
      poster_path?: string;
    }>;
    crew: Array<{
      id: number;
      title?: string;
      name?: string;
      job: string;
      poster_path?: string;
    }>;
  };
}

interface GenreList {
  genres: Array<{ id: number; name: string }>;
}

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
      console.log("Failed to fetch popular movies", error);
      throw error;
    }
  }

  public async getPopularMovies(): Promise<ISuggestions> {
    try {
      // Use predefined request URL for popular movies
      const response = await fetch(requests.requestPopular);
      if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Failed to fetch top rated movies", error);
      throw error;
    }
  }

  public async getTopRatedMovies(): Promise<ISuggestions> {
    try {
      // Use predefined request URL for top rated movies
      const response = await fetch(requests.requestTopRated);
      if (!response.ok) {
        throw new Error("Failed to fetch top rated movies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Failed to fetch top rated movies", error);
      throw error;
    }
  }

  public async getPopularTV(): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/tv/popular", {
        params: { page: 1 },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch popular TV", error);
      throw error;
    }
  }

  public async getTopRatedTV(): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/tv/top_rated", {
        params: { page: 1 },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch top rated TV", error);
      throw error;
    }
  }

  public async getTrending(): Promise<ISuggestions> {
    try {
      const response = await fetch(requests.requestTrending);
      if (!response.ok) {
        throw new Error("Failed to fetch trending movies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Failed to fetch trending movies", error);
      throw error;
    }
  }

  public async getMovieDetails(
    movieId: string | number
  ): Promise<MovieDetails> {
    try {
      const { data } = await instance.get(`/movie/${movieId}`, {
        params: {
          append_to_response: "credits,videos,images,similar,recommendations",
        },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch movie details", error);
      throw error;
    }
  }

  public async getTVDetails(tvId: string | number): Promise<TVDetails> {
    try {
      const { data } = await instance.get(`/tv/${tvId}`, {
        params: {
          append_to_response: "credits,videos,images,similar,recommendations",
        },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch TV details", error);
      throw error;
    }
  }

  public async getMovieGenres(): Promise<GenreList> {
    try {
      const { data } = await instance.get("/genre/movie/list");
      return data;
    } catch (error) {
      console.log("Failed to fetch movie genres", error);
      throw error;
    }
  }

  public async getTVGenres(): Promise<GenreList> {
    try {
      const { data } = await instance.get("/genre/tv/list");
      return data;
    } catch (error) {
      console.log("Failed to fetch TV genres", error);
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
      console.log("Failed to discover movies", error);
      throw error;
    }
  }

  public async discoverTV(params: DiscoverParams = {}): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/discover/tv", { params });
      return data;
    } catch (error) {
      console.log("Failed to discover TV", error);
      throw error;
    }
  }

  public async getUpcomingMovies(): Promise<ISuggestions> {
    try {
      const response = await fetch(requests.requestUpcoming);
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Failed to fetch upcoming movies", error);
      throw error;
    }
  }

  public async getHorrorMovies(): Promise<ISuggestions> {
    try {
      const response = await fetch(requests.requestHorror);
      if (!response.ok) {
        throw new Error("Failed to fetch horror movies");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Failed to fetch horror movies", error);
      throw error;
    }
  }

  public async getNowPlayingMovies(): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/movie/now_playing", {
        params: { page: 1 },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch now playing movies", error);
      throw error;
    }
  }

  public async getOnTheAirTV(): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/tv/on_the_air", {
        params: { page: 1 },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch on the air TV", error);
      throw error;
    }
  }

  public async getAiringTodayTV(): Promise<ISuggestions> {
    try {
      const { data } = await instance.get("/tv/airing_today", {
        params: { page: 1 },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch airing today TV", error);
      throw error;
    }
  }

  public async getPersonDetails(
    personId: string | number
  ): Promise<PersonDetails> {
    try {
      const { data } = await instance.get(`/person/${personId}`, {
        params: {
          append_to_response: "movie_credits,tv_credits,images,external_ids",
        },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch person details", error);
      throw error;
    }
  }

  public async getMovieCredits(
    movieId: string | number
  ): Promise<MovieDetails["credits"]> {
    try {
      const { data } = await instance.get(`/movie/${movieId}/credits`);
      return data;
    } catch (error) {
      console.log("Failed to fetch movie credits", error);
      throw error;
    }
  }

  public async getTVCredits(
    tvId: string | number
  ): Promise<TVDetails["credits"]> {
    try {
      const { data } = await instance.get(`/tv/${tvId}/credits`);
      return data;
    } catch (error) {
      console.log("Failed to fetch TV credits", error);
      throw error;
    }
  }

  public async getMovieVideos(
    movieId: string | number
  ): Promise<MovieDetails["videos"]> {
    try {
      const { data } = await instance.get(`/movie/${movieId}/videos`);
      return data;
    } catch (error) {
      console.log("Failed to fetch movie videos", error);
      throw error;
    }
  }

  public async getTVVideos(
    tvId: string | number
  ): Promise<TVDetails["videos"]> {
    try {
      const { data } = await instance.get(`/tv/${tvId}/videos`);
      return data;
    } catch (error) {
      console.log("Failed to fetch TV videos", error);
      throw error;
    }
  }

  public async getMovieImages(
    movieId: string | number
  ): Promise<MovieDetails["images"]> {
    try {
      const { data } = await instance.get(`/movie/${movieId}/images`);
      return data;
    } catch (error) {
      console.log("Failed to fetch movie images", error);
      throw error;
    }
  }

  public async getTVImages(
    tvId: string | number
  ): Promise<TVDetails["images"]> {
    try {
      const { data } = await instance.get(`/tv/${tvId}/images`);
      return data;
    } catch (error) {
      console.log("Failed to fetch TV images", error);
      throw error;
    }
  }

  public async getMovieRecommendations(
    movieId: string | number
  ): Promise<ISuggestions> {
    try {
      const { data } = await instance.get(`/movie/${movieId}/recommendations`, {
        params: { page: 1 },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch movie recommendations", error);
      throw error;
    }
  }

  public async getTVRecommendations(
    tvId: string | number
  ): Promise<ISuggestions> {
    try {
      const { data } = await instance.get(`/tv/${tvId}/recommendations`, {
        params: { page: 1 },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch TV recommendations", error);
      throw error;
    }
  }

  public async getMovieSimilar(
    movieId: string | number
  ): Promise<ISuggestions> {
    try {
      const { data } = await instance.get(`/movie/${movieId}/similar`, {
        params: { page: 1 },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch movie similar", error);
      throw error;
    }
  }

  public async getTVSimilar(tvId: string | number): Promise<ISuggestions> {
    try {
      const { data } = await instance.get(`/tv/${tvId}/similar`, {
        params: { page: 1 },
      });
      return data;
    } catch (error) {
      console.log("Failed to fetch TV similar", error);
      throw error;
    }
  }
}

export default Object.freeze(new SuggestionsService());
