import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollection } from "../../home/homeService";

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (collectionId: number) => deleteCollection(collectionId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    deleteCollection: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
