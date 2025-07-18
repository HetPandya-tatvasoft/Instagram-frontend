import {
  getRequest,
  postRequest,
  getRequestWithParams,
} from "../../utils/httpClient.utils";
import type { UserResponse } from "../home/types/home.types";
import type {
  UpdateUserProfilePayload,
  UserProfileResponse,
} from "../profile/types/profile.types";

const ENDPOINTS = {
  GET_PROFILE_DATA: "/user/get-logged-in-user",
  UPDATE_PROFILE: "/user/update-profile",
  UPDATE_PROFILE_PICTURE: "/user/edit-profile-picture",
  getUserInfoData: (id: number) => `/user/get-user/${id}`,
  getUserFollowing: (id: number) => `/connection/get-following-count/${id}`,
  getUserFollower: (id: number) => `/connection/get-follower-count/${id}`,
  getMutualCount: (id: number) => `/connection/get-mutual-count/${id}`,
  getFollowStatus: (id: number) => `/connection/get-follow-status/${id}`,
  unfollowUserFunc: (id: number) => `/connection/unfollow/${id}`,
  sendFollowRequest : (id : number) => `/connection/send-follow-request/${id}`,
  unfollowUser: "/connection/unfollow",
};

export const getUserProfile = () =>
  getRequest<UserProfileResponse>(ENDPOINTS.GET_PROFILE_DATA);

export const updateUserProfile = (payload: UpdateUserProfilePayload) =>
  postRequest<UserProfileResponse, UpdateUserProfilePayload>(
    ENDPOINTS.UPDATE_PROFILE,
    payload
  );

export const getUserInfo = (userId: number) =>
  getRequest<UserResponse>(ENDPOINTS.getUserInfoData(userId));

export const getUserFollowing = (userId: number) =>
  getRequest<number>(ENDPOINTS.getUserFollowing(userId));

export const getUserFollowers = (userId: number) =>
  getRequest<number>(ENDPOINTS.getUserFollower(userId));

export const getMutualCount = (userId: number) =>
  getRequest<number>(ENDPOINTS.getMutualCount(userId));

export const getFollowStatus = (userId: number) =>
  getRequest<string>(ENDPOINTS.getFollowStatus(userId));

export const UnfollowUser = (receiverId: number) =>
  postRequest<string, { receiverId: number }>(ENDPOINTS.unfollowUserFunc(receiverId), { receiverId });

export const sendFollowRequest = (receiverId: number) =>
  postRequest<string, object>(ENDPOINTS.sendFollowRequest(receiverId), { });

export const updateProfilePicture = async (
  file: File | null
): Promise<Blob> => {
  const formData = new FormData();
  if (file) {
    formData.append("profilePicture", file);
  }

  const response = await postRequest<Blob, FormData>(
    ENDPOINTS.UPDATE_PROFILE_PICTURE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    }
  );

  return response.data;
};
