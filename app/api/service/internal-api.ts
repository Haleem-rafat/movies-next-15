import axios, { AxiosInstance } from "axios";
import { envConfig } from "@/config/env";

// Create axios instance for internal Next.js API routes
const internalApiClient: AxiosInstance = axios.create({
  baseURL: envConfig.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for internal API
internalApiClient.interceptors.request.use(
  (config) => {
    console.log("🚀 Internal API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Internal Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for internal API
internalApiClient.interceptors.response.use(
  (response) => {
    console.log("✅ Internal API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ Internal Response Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default internalApiClient; 