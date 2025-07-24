import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeComment } from "../homeService";
import { handleApiError } from "../../../utils/error.utils";

export const useCommentLike = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      likeComment(commentId),

    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["home-feed"] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("post-details"),
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
