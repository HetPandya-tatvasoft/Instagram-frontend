import { postRequestFormData } from "../../utils/httpClient.utils";

const ENDPOINTS = {
  CREATE_POST: "/post/create-post",
};

export type CreatePostResponse = string[];

export const createPostService = async (payload: FormData) =>
  postRequestFormData<CreatePostResponse>(ENDPOINTS.CREATE_POST, payload);
