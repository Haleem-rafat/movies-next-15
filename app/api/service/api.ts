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

    console.log(
      "🚀 External API Request:",
      config.method?.toUpperCase(),
      config.url
    );
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(
      "✅ External API Response:",
      response.status,
      response.config.url
    );
    return response;
  },
  (error) => {
    console.error(
      "❌ Response Error:",
      error.response?.status,
      error.response?.data
    );

    // Handle specific error cases
    if (error.response?.status === 401) {
      console.error("API Key is invalid or missing");
    } else if (error.response?.status === 429) {
      console.error("Rate limit exceeded");
    } else if (error.response?.status >= 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  }
);

export default instance;
