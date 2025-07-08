import Cookies from "js-cookie";
import { COOKIE_KEYS } from "../common/constants/keys";


export const setAuthToken = (token: string) => {
  Cookies.set(COOKIE_KEYS.AUTH_TOKEN, token, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
};

export const getAuthToken = () => Cookies.get(COOKIE_KEYS.AUTH_TOKEN);

export const removeAuthToken = () => Cookies.remove(COOKIE_KEYS.AUTH_TOKEN);
