export const baseAPIUrl = import.meta.env.viteAPIUrl ?? "http://localhost:5259";

// Common API configuration for all services
export const apiConfig = {
    baseUrl: import.meta.env.viteAPIUrl || "http://localhost:5259",
    headers: {
      "Content-Type": "application/json",
    },
    formDataHeaders: {
      // Browser will detect by itself
    },
  };

export const authEndPoints = {
    login: () => `/auth/login`,
    currentUser: () => `/user/get-logged-in-user`,
};

