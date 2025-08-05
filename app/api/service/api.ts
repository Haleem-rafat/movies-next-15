import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// API Configuration for external TMDB API
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const baseURL = "https://api.themoviedb.org/3";

// Create axios instance for external TMDB API
const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for external API
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add API key to all requests
    if (config.params) {
      config.params.api_key = apiKey;
    } else {
      config.params = { api_key: apiKey };
    }

    // Add language parameter
    config.params.language = "en-US";

    // Log request for debugging (consider using a proper logging service in production)
    return config;
  },
  (error) => {
    // Log error for debugging (consider using a proper logging service in production)
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response for debugging (consider using a proper logging service in production)
    return response;
  },
  (error) => {
    // Log error for debugging (consider using a proper logging service in production)

    // Handle specific error cases
    if (error.response?.status === 401) {
      // API Key is invalid or missing
    } else if (error.response?.status === 429) {
      // Rate limit exceeded
    } else if (error.response?.status >= 500) {
      // Server error
    }

    return Promise.reject(error);
  }
);

export default instance;
