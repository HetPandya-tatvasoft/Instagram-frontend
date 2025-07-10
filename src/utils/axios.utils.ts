import axios, { type AxiosInstance } from "axios";
import { API_CONFIG } from "../common/constants/apiConfig";
import { getAuthToken } from "./cookie.utils"

const API: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: API_CONFIG.HEADERS,
});

API.interceptors.request.use((config) => {

    // You can also skip that for public urls like login, register
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;