import axios, { type AxiosInstance } from "axios";
import { API_CONFIG } from "../common/constants/apiConfig";
import { getAuthToken } from "./cookie.utils";
import toast from "react-hot-toast";
import PerformLogout from "./logout.utils";

const API: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

API.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      PerformLogout();
      return;
    }

    return Promise.reject(error);
  }
);

export default API;
