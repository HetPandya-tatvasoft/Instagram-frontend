import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../profileService";
import { useAppDispatch } from "../../../app/redux/hooks";
import { setUserProfile } from "../profileSlice";
import type { UserProfileResponse } from "../types/profile.types";
import { useEffect } from "react";

export const useGetUserProfile = () => {
    const dispatch = useAppDispatch();

    const queryResult = useQuery<UserProfileResponse, Error>({
        queryKey: ["getUserProfile"],
        queryFn: getUserProfile,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });


    useEffect(() => {
        if (queryResult.isSuccess && queryResult.data) {
            dispatch(setUserProfile(queryResult.data));
        }
    }, [queryResult.isSuccess, queryResult.data, dispatch]);

    useEffect(() => {
        if (queryResult.isError && queryResult.error) {
            console.error("Error fetching user profile:", queryResult.error.message);
        }
    }, [queryResult.isError, queryResult.error]);

    return queryResult;
};
