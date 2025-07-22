import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeComment } from "../homeService";
import { handleApiError } from "../../../utils/error.utils";

export const useCommentLike = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (commentId: number) => likeComment(commentId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["home-feed"] });
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
