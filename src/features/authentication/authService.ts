import type {
  IForgotPasswordPayload,
  ILoginPayload,
  ILoginResponse,
  IRegisterUserPayload,
  IRegisterUserResponse,
  IUser,
  IResetPasswordPayload,
  IStringResponseGeneral,
} from "./types/auth.type";
import API from "../../utils/axios.utils";
import {
  postRequest,
  getRequestWithParams,
} from "../../utils/httpClient.utils";

const endPoints = {
  login: "/auth/login",
  registerUser: "/auth/register",
  sendResetLink: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  currentUser: "/user/get-logged-in-user",
  uniqueUsernameCheck: "/auth/is-unique-username",
  uniqueEmailCheck: "/auth/is-unique-email",
  uniqueContactCheck: "/auth/is-unique-contact-number",
  getLoggedInUser: "/user/get-logged-in-user",
};

export const loginUser = (payload: ILoginPayload) =>
  postRequest<ILoginResponse, ILoginPayload>(endPoints.login, payload);

export const registerUser = (payload: IRegisterUserPayload) =>
  postRequest<IRegisterUserResponse, IRegisterUserPayload>(
    endPoints.registerUser,
    payload
  );

export const sendResetLink = (payload: IForgotPasswordPayload) =>
  postRequest<IStringResponseGeneral, IForgotPasswordPayload>(
    endPoints.sendResetLink,
    payload
  );

export const resetPassword = (payload: IResetPasswordPayload) =>
  postRequest<IStringResponseGeneral, IResetPasswordPayload>(
    endPoints.resetPassword,
    payload
  );

export const checkUniqueEmail = async (email: string) =>
  getRequestWithParams<boolean, { email: string }>(endPoints.uniqueEmailCheck, {
    email,
  });

export const checkUniqueContact = (contactNumber: string) =>
  getRequestWithParams<boolean, { contactNumber: string }>(
    endPoints.uniqueContactCheck,
    { contactNumber }
  );

export const checkUniqueUsername = async (username: string) =>
  getRequestWithParams<boolean, { username: string }>(
    endPoints.uniqueUsernameCheck,
    { username }
  );

// Convert this to use generic one later
export const fetchCurrentUser = async (): Promise<IUser> => {
  const response = await API.api.get<IUser>(endPoints.getLoggedInUser);
  return response.data;
};
