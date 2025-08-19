import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePostsFromCollection } from "../homeService";

export const useRemovePostFromCollection = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      postId,
      collectionId,
    }: {
      postId: number[];
      collectionId: number;
    }) => removePostsFromCollection(postId, collectionId),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    removePostsFromCollection: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};