import { postRequest, getRequest } from "../../utils/httpClient.utils";
import type { PaginationResponse } from "../../common/types/paginationResponse.type";
import type { PostResponse, UserResponse } from "./types/home.types";
import {
  defaultPaginationRequest,
  type PaginationRequest,
} from "../../common/types/paginationRequest.type";
import type { ApiResponse } from "../../@core/api/apiResponse.type";
import type { addCommentPayload } from "./types/payload.types";

const endPoints = {
  getHomeFeed: "/post/get-post-feed",
  searchUser: "/user/get-user-list",
  likePost: (postId: number) => `/post/post-like-unlike/${postId}`,
  commentInPost: "/post/add-edit-comment",
  likeComment: (commentId: number) => `post/like-unlike-comment/${commentId}`,
};

export const getHomeFeedService = async () =>
  postRequest<PaginationResponse<PostResponse>, PaginationRequest>(
    endPoints.getHomeFeed,
    defaultPaginationRequest
  );

export const searchUserService = async (payload: PaginationRequest) =>
  postRequest<PaginationResponse<UserResponse>, PaginationRequest>(
    endPoints.searchUser,
    payload
  );

export const likePost = async (postId: number) =>
  postRequest<ApiResponse<string>, object>(endPoints.likePost(postId), {});

export const commentInPost = async (payload: addCommentPayload) =>
  postRequest<ApiResponse<number>, addCommentPayload>(
    endPoints.commentInPost,
    payload
  );

export const likeComment = async (commentId: number) =>
  postRequest<ApiResponse<string>, object>(
    endPoints.likeComment(commentId),
    {}
  );
