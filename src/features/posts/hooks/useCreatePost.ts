import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostService, type CreatePostResponse } from "../postService";
import type { ApiResponse } from "../../../@core/api/apiResponse.type";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { messages } from "../../../common/constants/messages"
import { handleApiError } from "../../../utils/error.utils";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<CreatePostResponse>, Error, FormData>({
    mutationFn: createPostService,
    onSuccess: (data) => {
      toast.success(messages.posts.postCreatedSuccess);
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
