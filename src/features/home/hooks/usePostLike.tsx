import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";
import { likePost } from "../homeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messages } from "../../../common/constants/messages";
import { getUserIdFromToken } from "../../../utils/jwt.utils";

export const usePostLike = () => {
  // let postId = 0;

  const queryClient = useQueryClient();

  const loggedInUserId = getUserIdFromToken();

  const mutation = useMutation({
    mutationFn: (postId: number) => {
      return likePost(postId);
    },
    onSuccess: (response, postId) => {
      toast.success(messages.connections.postLikedSuccess);
      queryClient.invalidateQueries({ queryKey: ["home-feed"] });
      queryClient.invalidateQueries({
        queryKey: ["post-details", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-posts", loggedInUserId],
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
