import axios, {
  AxiosError,
  AxiosRequestConfig,
  type AxiosInstance,
} from "axios";
import { apiConfig } from "../common/constants/apiConfig";
import { getAuthToken } from "./cookie.utils";
import toast from "react-hot-toast";
import { errorCodes } from "../common/constants/error";
import performLogout from "./logout.utils";

const handleUnAuthorizedError = (error: AxiosError) => {
  const status = error?.response?.status;

  if (status === 401) {
    toast.error(errorCodes.sessionExpired.sessionExpired);
    setTimeout(() => {
      performLogout();
    }, 1000);
    return;
  }

  return Promise.reject(error);
};

const createAxiosInstance = (
  headers: AxiosRequestConfig["headers"] = {}
): AxiosInstance => {
  const instance = axios.create({
    baseURL: apiConfig.baseUrl,
    headers,
  });

  instance.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => handleUnAuthorizedError(error)
  );

  return instance;
};

export const api = createAxiosInstance(apiConfig.headers);

export const apiFormData = createAxiosInstance(apiConfig.formDataHeaders);

export default { api, apiFormData }

// const api: AxiosInstance = axios.create({
//   baseURL: apiConfig.baseUrl,
//   headers: apiConfig.headers,
// });

// const apiFormData: AxiosInstance = axios.create({
//   baseURL: apiConfig.baseUrl,
//   headers: apiConfig.formDataHeaders,
// });

// apiFormData.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// apiFormData.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error?.response?.status;
//     if (status === 401) {
//       toast.error(errorCodes.sessionExpired.sessionExpired);
//       setTimeout(() => {
//         performLogout();
//       }, 1000);
//       return;
//     }
//     return Promise.reject(error);
//   }
// );

// api.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error?.response?.status;
//     // handleApiError(error);
//     if (status === 401) {
//       toast.error(errorCodes.sessionExpired.sessionExpired);
//       setTimeout(() => {
//         performLogout();
//       }, 1000);
//       return;
//     }
//     return Promise.reject(error);
//   }
// );

// // export default API;
// export default { api, apiFormData };
