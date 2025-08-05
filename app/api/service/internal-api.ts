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
    // Log request for debugging (consider using a proper logging service in production)
    return config;
  },
  (error) => {
    // Log error for debugging (consider using a proper logging service in production)
    return Promise.reject(error);
  }
);

// Response interceptor for internal API
internalApiClient.interceptors.response.use(
  (response) => {
    // Log response for debugging (consider using a proper logging service in production)
    return response;
  },
  (error) => {
    // Log error for debugging (consider using a proper logging service in production)
    return Promise.reject(error);
  }
);

export default internalApiClient;
