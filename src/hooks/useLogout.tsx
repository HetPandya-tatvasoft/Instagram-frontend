import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { logout as logoutUser } from "../features/authentication/authSlice"
import { ROUTES } from "../common/constants/routes";
import { useAppDispatch } from "../app/redux/hooks";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    localStorage.removeItem("user");

    dispatch(logoutUser());

    navigate(ROUTES.LOGIN);
  }, [dispatch, navigate]);

  return logout;
};

export default useLogout;
