import { getRequest, postRequestFormData } from "../../utils/httpClient.utils";
import { IPostResponse } from "../home/types/home.types";

const endPoints = {
  createPost: "/post/create-post",
  fetchPostDetails: (postId: number) => `/post/get-post/${postId}`,
};

export type CreatePostResponse = string[];

export const createPostService = async (payload: FormData) =>
  postRequestFormData<CreatePostResponse>(endPoints.createPost, payload);

export const fetchPostDetails = async (postId: number) =>
  getRequest<IPostResponse>(endPoints.fetchPostDetails(postId));
