import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeComment } from "../homeService";
import { handleApiError } from "../../../utils/error.utils";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useCommentLike = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      likeComment(commentId),

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getHomeFeed],
      });
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getPostDetails],
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    likeComment: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
