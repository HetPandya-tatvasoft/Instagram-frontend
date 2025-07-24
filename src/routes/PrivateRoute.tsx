import { type JSX } from "react";
import { useAppSelector } from "../app/redux/hooks";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FullPageLoader from "../common/components/FullPageLoader";
import AuthInitializer from "../common/components/AuthInitializer";
import {
  selectIsAuthenticated,
  selectIsInitialised,
  selectUser,
} from "../features/authentication/slice/authSelector";

interface IDecodedToken {
  exp: number;
  [key: string]: unknown;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<IDecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  // const { user, isInitialised, isAuthenticated } = useAppSelector((state) => state.auth);

  // const user = selectUser;
  
  const user = useAppSelector(selectUser);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const isInitialised = useAppSelector(selectIsInitialised);

  if (!isInitialised) {
    return (
      <>
        <AuthInitializer />
        <FullPageLoader loading={true} />
      </>
    );
  }

  if (!isAuthenticated || isTokenExpired(user?.token ?? "")) {
    return <Navigate to="/accounts/login" replace />;
  }

  return children;
};

export default PrivateRoute;
