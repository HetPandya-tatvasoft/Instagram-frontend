import axios, { type AxiosInstance } from "axios";
import { API_CONFIG } from "../common/constants/apiConfig";
import { handleApiError } from "./error.utils";
import { getAuthToken } from "./cookie.utils";
import toast from "react-hot-toast";
import { ERROR_CODES } from "../common/constants/error";
import PerformLogout from "./logout.utils";

const API: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

const APIFormData: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.FORM_DATA_HEADERS,
});

APIFormData.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

APIFormData.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      toast.error(ERROR_CODES.sessionExpired.sessionExpired);
      setTimeout(() => {
        PerformLogout();
      }, 1000);
      return;
    }
    return Promise.reject(error);
  }
);

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
    // // eslint-disable-next-line no-debugger
    // debugger;
    // handleApiError(error);
    if (status === 401) {
      toast.error(ERROR_CODES.sessionExpired.sessionExpired);
      setTimeout(() => {
        PerformLogout();
      }, 1000);
      return;
    }
    return Promise.reject(error);
  }
);

// export default API;

export default { API, APIFormData };
