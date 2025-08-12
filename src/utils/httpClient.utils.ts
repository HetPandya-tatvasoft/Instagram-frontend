import axiosUtils from "./axios.utils";
import type { ApiResponse } from "./../@core/api/apiResponse.type";
import type { AxiosRequestConfig } from "axios";

const { api, apiFormData } = axiosUtils;
class HttpError extends Error {
  errorCode?: string;
  constructor(message: string, errorCode?: string) {
    super(message);
    this.name = "HttpError";
    this.errorCode = errorCode;
  }
}

export const getRequest = async <T>(url: string): Promise<T> => {
  const res = await api.get<ApiResponse<T>>(url);
  return res.data.data;
};

export const getRequestWithParams = async <TResponse, TPayload>(
  url: string,
  payload: TPayload,
  config?: AxiosRequestConfig
): Promise<ApiResponse<TResponse>> => {
  const res = await api.get<ApiResponse<TResponse>>(url, {
    ...config,
    params: payload,
  });

  return res.data;
};

/**
 * Sends a POST request.
 * @throws { AxiosError } If the request fails, the error will be thrown and must be handled by the caller / mutation.
 */

export const postRequest = async <TResponse, TPayload>(
  url: string,
  payload: TPayload,
  config?: AxiosRequestConfig
): Promise<ApiResponse<TResponse>> => {
  const res = await api.post<ApiResponse<TResponse>>(url, payload, config);
  return res.data;
};

export const deleteRequest = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<TResponse>> => {
  const res = await api.delete<ApiResponse<TResponse>>(url, config);
  return res.data;
};

export const postRequestFormData = async <TResponse>(
  url: string,
  payload: FormData,
  config?: AxiosRequestConfig
): Promise<ApiResponse<TResponse>> => {
  const res = await apiFormData.post<ApiResponse<TResponse>>(
    url,
    payload,
    config
  );
  return res.data;
};
