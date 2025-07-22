import { useEffect } from "react";
import { useAppDispatch } from "../../app/redux/hooks";
import type { User } from "../../features/authentication/types/auth.type";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  setUser,
  setInitialised,
} from "../../features/authentication/slice/authSlice";
import { getAuthToken } from "../../utils/cookie.utils";
import useLogout from "../../hooks/useLogout";
import { removeAuthToken } from "../../utils/cookie.utils";

interface DecodedToken extends User {
  exp: number;
}

const AuthInitializer = () => {
  const dispatch = useAppDispatch();
  const logout = useLogout();
  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      dispatch(setInitialised());
      logout();
      return;
    }
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const isValid = decoded.exp > Math.floor(Date.now() / 1000);

      if (isValid) {
        dispatch(setUser({ ...decoded, token }));
      } else {
        removeAuthToken();
        logout();
        dispatch(setInitialised());
      }
    } catch (err) {
      logout();
      removeAuthToken();
    }
  }, [dispatch, logout]);

  return null;
};

export default AuthInitializer;
