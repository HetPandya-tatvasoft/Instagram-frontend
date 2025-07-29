import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";
import { likePost } from "../homeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messages } from "../../../common/constants/messages";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const usePostLike = () => {
  const queryClient = useQueryClient();

  const loggedInUserId = getUserIdFromToken();

  const mutation = useMutation({
    mutationFn: (postId: number) => {
      return likePost(postId);
    },
    onSuccess: (response, postId) => {
      toast.success(messages.connections.postLikedSuccess);
      queryClient.invalidateQueries({ queryKey: [tanstackQueryKeys.getHomeFeed] });
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getPostDetails, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getUserPosts, loggedInUserId],
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    likePost: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
