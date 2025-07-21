import { postRequest, getRequest } from "../../utils/httpClient.utils";
import type { PaginationResponse } from "../../common/types/paginationResponse.type";
import type { PostResponse, UserResponse } from "./types/home.types";
import {
  defaultPaginationRequest,
  type PaginationRequest,
} from "../../common/types/paginationRequest.type";
import type { ApiResponse } from "../../@core/api/apiResponse.type";

const ENDPOINTS = {
  getHomeFeed: "/post/get-post-feed",
  searchUser: "/user/get-user-list",
  likePost: (postId: number) => `/post/post-like-unlike/${postId}`,
};

export const getHomeFeedService = async () =>
  postRequest<PaginationResponse<PostResponse>, PaginationRequest>(
    ENDPOINTS.getHomeFeed,
    defaultPaginationRequest
  );

export const searchUserService = async (payload: PaginationRequest) =>
  postRequest<PaginationResponse<UserResponse>, PaginationRequest>(
    ENDPOINTS.searchUser,
    payload
  );

export const likePost = async (postId: number) =>
  postRequest<ApiResponse<string>, object>(ENDPOINTS.likePost(postId), {});
