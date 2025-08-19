import {
  deleteRequest,
  getRequest,
  postRequestFormData,
} from "../../utils/httpClient.utils";
import { IPostResponse } from "../home/types/home.types";

const endPoints = {
  createPost: "/post/create-post",
  fetchPostDetails: (postId: number) => `/post/get-post/${postId}`,
  deletePost: (postId: number) => `/post/delete-post/${postId}`,
};

export type CreatePostResponse = string[];

export const createPostService = async (payload: FormData) =>
  postRequestFormData<CreatePostResponse>(endPoints.createPost, payload);

export const fetchPostDetails = async (postId: number) =>
  getRequest<IPostResponse>(endPoints.fetchPostDetails(postId));

export const deletePost = async (postId: number) =>
  deleteRequest<string>(endPoints.deletePost(postId));
