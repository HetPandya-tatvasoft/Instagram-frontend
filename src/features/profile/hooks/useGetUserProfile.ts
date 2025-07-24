import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../profileService";
import { useAppDispatch } from "../../../app/redux/hooks";
import { setUserProfile } from "../profileSlice";
import type { IUserProfileResponse } from "../types/profile.types";
import { useEffect } from "react";
import { handleApiError } from "../../../utils/error.utils";
import type { IUserResponse } from "../../home/types/home.types";

export const useGetUserProfile = () => {
  const dispatch = useAppDispatch();

  const queryResult = useQuery<IUserResponse, Error>({
    queryKey: ["getUserProfile"],
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      dispatch(setUserProfile(queryResult.data));
    }
  }, [queryResult.isSuccess, queryResult.data, dispatch, queryResult]);

  useEffect(() => {
    if (queryResult.isError && queryResult.error) {
      console.error("Error fetching user profile:", queryResult.error.message);
      handleApiError(queryResult.error);
    }
  }, [queryResult.isError, queryResult.error]);

  return queryResult;
};
