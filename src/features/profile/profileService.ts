import { getRequest, postRequest } from "../../utils/httpClient.utils";
import type { PaginationRequestGeneric } from "../../common/types/paginationRequest.type";
import type { UserResponse } from "../home/types/home.types";
import type { PostRequestPayload } from "../home/types/payload.types";
import type {
  UpdateUserProfilePayload,
  UserProfileResponse,
} from "../profile/types/profile.types";
import type { PostResponse } from "../home/types/home.types";
import { PaginationResponse } from "../../common/types/paginationResponse.type";

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
  sendFollowRequest: (id: number) => `/connection/send-follow-request/${id}`,
  unfollowUser: "/connection/unfollow",
  getPosts: `/post/get-post-list`,
};

export const getUserProfile = () =>
  getRequest<UserResponse>(ENDPOINTS.GET_PROFILE_DATA);

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
  postRequest<string, { receiverId: number }>(
    ENDPOINTS.unfollowUserFunc(receiverId),
    { receiverId }
  );

export const sendFollowRequest = (receiverId: number) =>
  postRequest<string, object>(ENDPOINTS.sendFollowRequest(receiverId), {});

export const getPosts = (
  payload: PaginationRequestGeneric<PostRequestPayload>
) =>
  postRequest<
    PaginationResponse<PostResponse[]>,
    PaginationRequestGeneric<PostRequestPayload>
  >(ENDPOINTS.getPosts, payload);

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
