import { useQueries } from "@tanstack/react-query";
import {
  getUserProfile,
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
import { getAuthToken } from "../../../utils/cookie.utils";
import { decodeToken } from "../../../utils/jwt.utils";
import { generalConsts } from "../../../common/constants/generalConsts";

export const useUserProfile = (userId: string) => {
  const id = Number(userId);
  const jwt_token = getAuthToken();
  let idInt = Number(id);
  if (Number(userId) === -1) {
    const decodedData = decodeToken(jwt_token ?? "");
    idInt = decodedData?.UserId ?? idInt;
  }

  const results = useQueries({
    queries: [
      {
        queryKey: ["user-info", id],
        queryFn: () => (id <= 0 ? getUserProfile() : getUserInfo(idInt)),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["user-following", id],
        queryFn: () => getUserFollowing(idInt),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["user-followers", id],
        queryFn: () => getUserFollowers(idInt),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["follow-status", id],
        queryFn: () => (id <= 0 ? generalConsts.entityConsts.updateProfile : getFollowStatus(idInt)),
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

  const [userInfo, following, followers, followStatus] = results;

  const userConnectionData: UserConnectionData = {
    followersCount: followers.data ?? 0,
    followingCount: following.data ?? 0,
    followStatus: followStatus.data ?? "",
  };

  const userHeaderData: UserProfileHeader = {
    userHeaderInfo: userInfo.data,
    userConnectionData,
  };

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  return {
    userHeaderData: userHeaderData,
    isLoading,
    isError,
  };
};
