import {
  postRequest,
  postRequestFormData,
  deleteRequest,
} from "../../utils/httpClient.utils";
import type { IPaginationResponse } from "../../common/types/paginationResponse.type";
import {
  ICollectionResponse,
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
  ICollectionCreatePayload,
  ICollectionUpsertPayload,
  IStoryViewCreatePayload,
} from "./types/payload.types";

const endPoints = {
  getHomeFeed: "/post/get-post-feed",
  searchUser: "/user/get-user-list",
  commentInPost: "/post/add-edit-comment",
  getStoriesFollowing: `story/get-story-list-of-following`,
  createStory: `/story/create-story`,
  updateStoryView: `/story/story-view`,
  getCollectionsList: `/post/get-collection-list`,
  createNewCollection: `/post/create-new-collection`,
  upsertCollection: `/post/upsert-collection`,
  deleteCollection: `/post/delete-collection`,
  likePost: (postId: number) => `/post/post-like-unlike/${postId}`,
  likeComment: (commentId: number) => `post/like-unlike-comment/${commentId}`,
  deleteStory: (storyId: number) => `/story/delete-story/${storyId}`,
  getCollectionDetails: (collectionId: number) =>
    `/post/get-collection?collectionId=${collectionId}`,
  removePostsFromCollection: (collectionId: number) =>
    `/post/remove-posts-from-collection?collectionId=${collectionId}`,
};

export const getHomeFeedService = async () =>
  postRequest<IPaginationResponse<IPostResponse>, IPaginationRequest>(
    endPoints.getHomeFeed,
    defaultPaginationRequest
  );

export const getHomeFeedServiceInfiniteScroll = async ({
  pageParam = 1,
  pageSize = 10,
}: {
  pageParam?: number;
  pageSize?: number;
}): Promise<ApiResponse<IPaginationResponse<IPostResponse>>> => {
  return postRequest<IPaginationResponse<IPostResponse>, IPaginationRequest>(
    endPoints.getHomeFeed,
    {
      pageNumber: pageParam,
      pageSize,
    }
  );
};

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

export const getCollectionsList = async (payload: IPaginationRequest) =>
  postRequest<IPaginationResponse<ICollectionResponse>, IPaginationRequest>(
    endPoints.getCollectionsList,
    payload
  );

export const createNewCollection = async (payload: ICollectionCreatePayload) =>
  postRequest<ICollectionResponse, ICollectionCreatePayload>(
    endPoints.createNewCollection,
    payload
  );

export const upsertCollection = async (payload: ICollectionUpsertPayload) =>
  postRequest<string, ICollectionUpsertPayload>(
    endPoints.upsertCollection,
    payload
  );

export const getCollectionDetails = async (
  payload: IPaginationRequest,
  collectionId: number
) =>
  postRequest<IPaginationResponse<ICollectionResponse>, IPaginationRequest>(
    endPoints.getCollectionDetails(collectionId),
    payload
  );

export const removePostsFromCollection = async (
  payload: number[],
  collectionId: number
) =>
  postRequest<string, number[]>(
    endPoints.removePostsFromCollection(collectionId),
    payload
  );

export const deleteCollection = async (collectionId: number) =>
  postRequest<string, number>(endPoints.deleteCollection, collectionId);
