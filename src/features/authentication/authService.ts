import type {
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  RegisterUserPayload,
  SendResetLinkResponse,
  RegisterUserResponse,
  User,
  ResetPasswordPayload,
  stringResponseGeneral,
} from "./types/auth.type";
import API from "../../utils/axios.utils";
import {
  postRequest,
  getRequestWithParams,
} from "../../utils/httpClient.utils";
import { errorCodes } from "../../common/constants/error";

const ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER_USER: "/auth/register",
  SEND_RESET_LINK: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  CURRENT_USER: "/user/get-logged-in-user",
  UNIQUE_USERNAME_CHECK: "/auth/is-unique-username",
  UNIQUE_EMAIL_CHECK: "/auth/is-unique-email",
  UNIQUE_CONTACT_CHECK: "/auth/is-unique-contact-number",
  GET_LOGGED_IN_USER: "/user/get-logged-in-user",
};

// export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
//     const response = await API.post<LoginResponse>(ENDPOINTS.LOGIN, data);
//     return response.data;
// };

export const loginUser = (payload: LoginPayload) =>
  postRequest<LoginResponse, LoginPayload>(ENDPOINTS.LOGIN, payload);

export const registerUser = (payload: RegisterUserPayload) =>
  postRequest<RegisterUserResponse, RegisterUserPayload>(
    ENDPOINTS.REGISTER_USER,
    payload
  );

export const sendResetLink = (payload: ForgotPasswordPayload) =>
  postRequest<stringResponseGeneral, ForgotPasswordPayload>(
    ENDPOINTS.SEND_RESET_LINK,
    payload
  );

export const resetPassword = (payload: ResetPasswordPayload) =>
  postRequest<stringResponseGeneral, ResetPasswordPayload>(
    ENDPOINTS.RESET_PASSWORD,
    payload
  );

export const checkUniqueEmail = async (email: string) =>
  getRequestWithParams<boolean, { email: string }>(
    ENDPOINTS.UNIQUE_EMAIL_CHECK,
    { email }
  );

export const checkUniqueContact = (contactNumber: string) =>
  getRequestWithParams<boolean, { contactNumber: string }>(
    ENDPOINTS.UNIQUE_CONTACT_CHECK,
    { contactNumber }
  );

export const checkUniqueUsername = async (username: string) =>
  getRequestWithParams<boolean, { username: string }>(
    ENDPOINTS.UNIQUE_USERNAME_CHECK,
    { username }
  );

// Convert this to use generic one later
export const fetchCurrentUser = async (): Promise<User> => {
  const response = await API.api.get<User>(ENDPOINTS.GET_LOGGED_IN_USER);
  return response.data;
};

// export const registerUser = async (data: RegisterUserPayload): Promise<RegisterUserResponse> => {
//     const response = await API.post<RegisterUserResponse>(ENDPOINTS.REGISTER_USER, data);

//     return response.data;
// };

// export const sendResetLink = async (data: ForgotPasswordPayload): Promise<SendResetLinkResponse> => {
//     const response = await API.post<SendResetLinkResponse>(ENDPOINTS.SEND_RESET_LINK, data);

//     return response.data;
// };

// export const resetPassword = async (data: ResetPasswordPayload): Promise<stringResponseGeneral> => {
//     const response = await API.post<stringResponseGeneral>(ENDPOINTS.RESET_PASSWORD, data);

//     return response.data;
// }

// export const checkUniqueEmail = async (email: string) => {
//   try {
//     const response = await API.api.get(ENDPOINTS.UNIQUE_EMAIL_CHECK, {
//       params: { email },
//     });
//     return response.data;

//     // Remove this try catch block as it is already being handled in the test method in the formik
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     if (error.response && error.response.status === 400) {
//       const message =
//         error.response.data?.message || errorCodes.alreadyExists.email;
//       return Promise.reject(new Error(message));
//     }
//     // Generic fallback
//     return Promise.reject(new Error(errorCodes.internalServer.emailValidation));
//   }
// };

// export const checkUniqueContact = async (contactNumber: string) => {
//   const response = await API.api.get(ENDPOINTS.UNIQUE_CONTACT_CHECK, {
//     params: { contactNumber },
//   });

//   return response.data;
// };

// export const checkUniqueUsername = async (username: string) => {
//   try {
//     const response = await API.api.get(ENDPOINTS.UNIQUE_USERNAME_CHECK, {
//       params: { username },
//     });
//     return response.data;
//   } catch (error) {
//     console.warn(error);
//   }
// };
