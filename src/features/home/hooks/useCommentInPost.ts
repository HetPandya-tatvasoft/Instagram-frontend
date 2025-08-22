import { useMutation } from "@tanstack/react-query";
import type { IAddCommentPayload } from "../types/payload.types";
import { commentInPost } from "../homeService";
import { handleApiError } from "../../../utils/error.utils";
import { useQueryClient } from "@tanstack/react-query"
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useCommentInPost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: IAddCommentPayload) => commentInPost(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [tanstackQueryKeys.getHomeFeed] });
      queryClient.invalidateQueries({ queryKey: [tanstackQueryKeys.getPostDetails]})
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    addComment: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
