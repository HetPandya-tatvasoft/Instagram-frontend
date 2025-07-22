import Cookies from "js-cookie";
import { coookieKeys } from "../common/constants/keys";


export const setAuthToken = (token: string) => {
  Cookies.set(coookieKeys.authToken, token, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
};

export const getAuthToken = () => Cookies.get(coookieKeys.authToken);

export const removeAuthToken = () => Cookies.remove(coookieKeys.authToken);
