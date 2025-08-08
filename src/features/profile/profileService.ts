import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../utils/httpClient.utils";
import type { IPaginationRequestGeneric } from "../../common/types/paginationRequest.type";
import {
  IHighlightResponse,
  IStoryResponse,
  type IUserResponse,
} from "../home/types/home.types";
import type { IPostRequestPayload } from "../home/types/payload.types";
import type {
  IUpdateUserProfilePayload,
  IUserProfileResponse,
} from "../profile/types/profile.types";
import type { IPostResponse } from "../home/types/home.types";
import { IPaginationResponse } from "../../common/types/paginationResponse.type";
import {
  IHighlightUpsertPayload,
  IRemoveStoryFromHighlightPayload,
} from "./types/profile.payload.types";
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
  getUserHighlights: (id: number) => `/story/get-highlight-list/${id}`,
  upsertHighlights: `/story/upsert-highlight`,
  deleteHighlight: (id: number) => `/story/delete-highlight/${id}`,
  updateHighlightTitle: `/story/update-highlight-title`,
  removeStoryFromHighlights: `/story/remove-story-from-highlight`,
  getUserStoryNotificationSubscription:
    "/user/get-story-notification-subscription-status",
  getUserLikeNotificationSubscription:
    "/user/get-like-notification-subscription-status",
  updateStorySubscribeNotification: (payload: boolean) =>
    `/user/subscribe-to-story-notifications/${payload}`,
  updateLikeSubscribeNotification: (payload: boolean) =>
    `/user/subscribe-to-like-notifications/${payload}`,
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

export const getUserStoryNotificationSubscription = () =>
  getRequest<boolean>(endPoints.getUserStoryNotificationSubscription);

export const getUserLikeNotificationSubscription = () =>
  getRequest<boolean>(endPoints.getUserLikeNotificationSubscription);

export const updateStorySubscribeNotification = (payload: boolean) =>
  postRequest<ApiResponse<string>, object>(
    endPoints.updateStorySubscribeNotification(payload),
    {}
  );

export const updateLikeSubscribeNotification = (payload: boolean) =>
  postRequest<ApiResponse<string>, object>(
    endPoints.updateLikeSubscribeNotification(payload),
    {}
  );

export const UnfollowUser = (receiverId: number) =>
  postRequest<string, { receiverId: number }>(
    endPoints.unfollowUserFunc(receiverId),
    { receiverId }
  );

export const getUserStories = (userId: number) =>
  getRequest<IStoryResponse[]>(endPoints.getUserStories(userId));

export const getUserHighlights = (userId: number) =>
  getRequest<IHighlightResponse[]>(endPoints.getUserHighlights(userId));

export const upsertHighlights = (payload: IHighlightUpsertPayload) =>
  postRequest<IHighlightResponse, IHighlightUpsertPayload>(
    endPoints.upsertHighlights,
    payload
  );

export const deleteHighlight = (highglightId: number) =>
  deleteRequest<string>(endPoints.deleteHighlight(highglightId));

export const removeStoryFromHighlights = (
  payload: IRemoveStoryFromHighlightPayload
) =>
  postRequest<string, IRemoveStoryFromHighlightPayload>(
    endPoints.removeStoryFromHighlights,
    payload
  );

export const sendFollowRequest = (receiverId: number) =>
  postRequest<string, object>(endPoints.sendFollowRequest(receiverId), {});

export const updateHighlightTitle = (highlightId: number, title: string) =>
  postRequest<string, object>(
    endPoints.updateHighlightTitle,
    {},
    {
      params: {
        highlightId,
        title,
      },
    }
  );

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
