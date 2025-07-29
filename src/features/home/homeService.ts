import {
  postRequest,
  getRequest,
  postRequestFormData,
  deleteRequest,
} from "../../utils/httpClient.utils";
import type { IPaginationResponse } from "../../common/types/paginationResponse.type";
import {
  IStoryFollowingList,
  IStoryResponse,
  type IPostResponse,
  type IUserResponse,
} from "./types/home.types";
import {
  defaultPaginationRequest,
  type IPaginationRequest,
} from "../../common/types/paginationRequest.type";
import type { ApiResponse } from "../../@core/api/apiResponse.type";
import type {
  IAddCommentPayload,
  ICreateStoryPayload,
  IStoryViewCreatePayload,
} from "./types/payload.types";

const endPoints = {
  getHomeFeed: "/post/get-post-feed",
  searchUser: "/user/get-user-list",
  likePost: (postId: number) => `/post/post-like-unlike/${postId}`,
  commentInPost: "/post/add-edit-comment",
  likeComment: (commentId: number) => `post/like-unlike-comment/${commentId}`,
  getStoriesFollowing: `story/get-story-list-of-following`,
  createStory: `/story/create-story`,
  updateStoryView: `/story/story-view`,
  deleteStory: (storyId: number) => `/story/delete-story/${storyId}`,
};

export const getHomeFeedService = async () =>
  postRequest<IPaginationResponse<IPostResponse>, IPaginationRequest>(
    endPoints.getHomeFeed,
    defaultPaginationRequest
  );

export const searchUserService = async (payload: IPaginationRequest) =>
  postRequest<IPaginationResponse<IUserResponse>, IPaginationRequest>(
    endPoints.searchUser,
    payload
  );

export const likePost = async (postId: number) =>
  postRequest<ApiResponse<string>, object>(endPoints.likePost(postId), {});

export const commentInPost = async (payload: IAddCommentPayload) =>
  postRequest<ApiResponse<number>, IAddCommentPayload>(
    endPoints.commentInPost,
    payload
  );

export const likeComment = async (commentId: number) =>
  postRequest<ApiResponse<string>, object>(
    endPoints.likeComment(commentId),
    {}
  );

export const updateViewStory = async (payload: IStoryViewCreatePayload) =>
  postRequest<ApiResponse<string>, object>(endPoints.updateStoryView, payload);

// If in the below api thing if ApiResponse Doesn't work then write only string there instead of APIResponse String
export const deleteStory = async (storyId: number) =>
  deleteRequest<ApiResponse<string>>(endPoints.deleteStory(storyId));

export const getStoryListOfFollowing = async (payload: IPaginationRequest) =>
  postRequest<IPaginationResponse<IStoryFollowingList>, IPaginationRequest>(
    endPoints.getStoriesFollowing,
    payload
  );

export const createStory = async (payload: FormData) =>
  postRequestFormData<IStoryResponse>(endPoints.createStory, payload);
