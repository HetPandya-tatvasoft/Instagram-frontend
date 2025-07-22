import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { logout as logoutUser } from "../features/authentication/slice/authSlice";
import { routes } from "../common/constants/routes";
import { useAppDispatch } from "../app/redux/hooks";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const logout = useCallback(() => {
    localStorage.removeItem("user");

    dispatch(logoutUser());
    queryClient.clear();

    navigate(routes.login);
  }, [dispatch, navigate, queryClient]);

  return logout;
};

export default useLogout;
