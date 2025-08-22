import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../../../@core/api/apiResponse.type";
import { IStoryResponse } from "../types/home.types";
import { createStory } from "../homeService";
import { handleApiError } from "../../../utils/error.utils";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<IStoryResponse>, Error, FormData>({
    mutationFn: (payload: FormData) => createStory(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getStoriesForHome],
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
