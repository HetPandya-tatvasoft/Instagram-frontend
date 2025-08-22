import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostService, type CreatePostResponse } from "../postService";
import type { ApiResponse } from "../../../@core/api/apiResponse.type";
import { handleApiError } from "../../../utils/error.utils";

export const useCreatePost = () => {
  return useMutation<ApiResponse<CreatePostResponse>, Error, FormData>({
    mutationFn: createPostService,
    onSuccess: () => {},
    onError: (error) => {
      handleApiError(error);
    },
  });
};
