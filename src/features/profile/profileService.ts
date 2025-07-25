import { getRequest, postRequest } from "../../utils/httpClient.utils";
import type { IPaginationRequestGeneric } from "../../common/types/paginationRequest.type";
import { IStoryResponse, type IUserResponse } from "../home/types/home.types";
import type { IPostRequestPayload } from "../home/types/payload.types";
import type {
  IUpdateUserProfilePayload,
  IUserProfileResponse,
} from "../profile/types/profile.types";
import type { IPostResponse } from "../home/types/home.types";
import { IPaginationResponse } from "../../common/types/paginationResponse.type";
import { ApiResponse } from "../../@core/api/apiResponse.type";

const endPoints = {
  getProfileData: "/user/get-logged-in-user",
  updateProfile: "/user/update-profile",
  updateProfilePicture: "/user/edit-profile-picture",
  getUserInfoData: (id: number) => `/user/get-user/${id}`,
  getUserFollowing: (id: number) => `/connection/get-following-count/${id}`,
  getUserFollower: (id: number) => `/connection/get-follower-count/${id}`,
  getMutualCount: (id: number) => `/connection/get-mutual-count/${id}`,
  getFollowStatus: (id: number) => `/connection/get-follow-status/${id}`,
  unfollowUserFunc: (id: number) => `/connection/unfollow/${id}`,
  sendFollowRequest: (id: number) => `/connection/send-follow-request/${id}`,
  unfollowUser: "/connection/unfollow",
  getPosts: `/post/get-post-list`,
  getUserStories: (id: number) => `/story/get-story-list/${id}`,
};

export const getUserProfile = () =>
  getRequest<IUserResponse>(endPoints.getProfileData);

export const updateUserProfile = (payload: IUpdateUserProfilePayload) =>
  postRequest<IUserProfileResponse, IUpdateUserProfilePayload>(
    endPoints.updateProfile,
    payload
  );

export const getUserInfo = (userId: number) =>
  getRequest<IUserResponse>(endPoints.getUserInfoData(userId));

export const getUserFollowing = (userId: number) =>
  getRequest<number>(endPoints.getUserFollowing(userId));

export const getUserFollowers = (userId: number) =>
  getRequest<number>(endPoints.getUserFollower(userId));

export const getMutualCount = (userId: number) =>
  getRequest<number>(endPoints.getMutualCount(userId));

export const getFollowStatus = (userId: number) =>
  getRequest<string>(endPoints.getFollowStatus(userId));

export const UnfollowUser = (receiverId: number) =>
  postRequest<string, { receiverId: number }>(
    endPoints.unfollowUserFunc(receiverId),
    { receiverId }
  );

export const getUserStories = (userId: number) =>
  getRequest<IStoryResponse[]>(endPoints.getUserStories(userId));

export const sendFollowRequest = (receiverId: number) =>
  postRequest<string, object>(endPoints.sendFollowRequest(receiverId), {});

export const getPosts = (
  payload: IPaginationRequestGeneric<IPostRequestPayload>
) =>
  postRequest<
    IPaginationResponse<IPostResponse[]>,
    IPaginationRequestGeneric<IPostRequestPayload>
  >(endPoints.getPosts, payload);

export const updateProfilePicture = async (
  file: File | null
): Promise<Blob> => {
  const formData = new FormData();
  if (file) {
    formData.append("profilePicture", file);
  }

  const response = await postRequest<Blob, FormData>(
    endPoints.updateProfilePicture,
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
