import { useQueries } from "@tanstack/react-query";
import {
  getUserInfo,
  getUserFollowing,
  getUserFollowers,
  getMutualCount,
  getFollowStatus,
} from "../profileService";
import toast from "react-hot-toast";
import { useEffect } from "react";
import type {
  UserProfileHeader,
  UserConnectionData,
} from "../../home/types/home.types";

export const useUserProfile = (userId: string) => {
  const idInt = Number(userId);

  console.log("hello the id converted to string and all and is : ", idInt);

  const results = useQueries({
    queries: [
      {
        queryKey: ["user-info", userId],
        queryFn: () => getUserInfo(idInt),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["user-following", userId],
        queryFn: () => getUserFollowing(idInt),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["user-followers", userId],
        queryFn: () => getUserFollowers(idInt),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["user-mutuals", userId],
        queryFn: () => getMutualCount(idInt),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["follow-status", userId],
        queryFn: () => getFollowStatus(idInt),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
      },
    ],
  });

  useEffect(() => {
    results.forEach((result, index) => {
      if (result.isSuccess) {
        console.log(`Query ${index} succeeded : `, result.data);
      }

      if (result.isError) {
        toast.error(result.error.message);
      }
    });
  }, [results]);

  const [userInfo, following, followers, mutuals, followStatus] = results;

  const userConnectionData: UserConnectionData = {
    followersCount: followers.data ?? 0,
    followingCount: following.data ?? 0,
    mutualsCount: mutuals.data ?? 0,
    followStatus: followStatus.data ?? "",
  };

  const userHeaderData: UserProfileHeader = {
    userHeaderInfo: userInfo.data,
    userConnectionData,
  };

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  console.log(userInfo);

  return {
    userHeaderData: userHeaderData,
    isLoading,
    isError,
  };
};
