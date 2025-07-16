import axiosUtils from "./axios.utils";
import type { ApiResponse } from "./../@core/api/apiResponse.type";
import type { AxiosRequestConfig } from "axios";

const { API, APIFormData } = axiosUtils;
class HttpError extends Error {
  errorCode?: string;
  constructor(message: string, errorCode?: string) {
    super(message);
    this.name = "HttpError";
    this.errorCode = errorCode;
  }
}

export const getRequest = async <T>(url: string): Promise<T> => {
  const res = await API.get<ApiResponse<T>>(url);
  console.log(res.data.isSuccess);
  //   if (!res.data.isSuccess) {
  //     throw new HttpError(res.data.message, res.data.errorCode);
  //   }

  return res.data.data;
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
  const res = await API.post<ApiResponse<TResponse>>(url, payload, config);
  console.log(res);
  return res.data;
};

export const postRequestFormData = async <TResponse>(
  url: string,
  payload: FormData,
  config?: AxiosRequestConfig
): Promise<ApiResponse<TResponse>> => {
  const res = await APIFormData.post<ApiResponse<TResponse>>(
    url,
    payload,
    config
  );
  console.log(res);
  return res.data;
};

// export const postRequest = async <T, D>(url: string, data: D): Promise<T> => {
//     const res = await API.post<ApiResponse<T>>(url, data);
//     console.log(res.data.isSuccess)

//     if (!res.data.isSuccess) {
//         throw new HttpError(res.data.message, res.data.errorCode);
//     }

//     return res.data.data;
// }
