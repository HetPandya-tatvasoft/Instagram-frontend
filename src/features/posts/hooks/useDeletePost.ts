import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../postService";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      // instead do here single invalidating of queries and not invalidate all the queries
      queryClient.invalidateQueries();
    },
  });

  return {
    deletePost: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
