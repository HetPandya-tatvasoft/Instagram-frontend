export const BASE_API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5259";

// Common API configuration for all services
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5259",
    HEADERS: {
      "Content-Type": "application/json",
    },
  };

export const AUTH_ENDPOINTS = {
    LOGIN: () => `/auth/login`,
    CURRENT_USER: () => `/user/get-logged-in-user`,
};

