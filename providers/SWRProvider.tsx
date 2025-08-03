"use client";

import { SWRConfig } from "swr";

interface SWRProviderProps {
  children: React.ReactNode;
}

export default function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        // Global SWR configuration
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        errorRetryInterval: 1000,
        focusThrottleInterval: 5000,
        loadingTimeout: 3000,
        onError: (error, key) => {
          console.error("SWR Error:", error, "Key:", key);
        },
        onSuccess: (data, key) => {
          console.log("SWR Success:", key, data);
        },
        // Custom fetcher for better error handling
        fetcher: async (url: string) => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          } catch (error) {
            console.error("Fetcher error:", error);
            throw error;
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
