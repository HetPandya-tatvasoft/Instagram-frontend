import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";
import { likePost } from "../homeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostLike = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (postId: number) => likePost(postId),
    onSuccess: (response) => {
      toast.success("Post liked successfully");
      queryClient.invalidateQueries({ queryKey: ["home-feed"] });
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
