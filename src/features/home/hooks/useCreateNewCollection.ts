import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICollectionCreatePayload } from "../types/payload.types";
import { createNewCollection } from "../homeService";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { handleApiError } from "../../../utils/error.utils";
import toast from "react-hot-toast";

export const useCreateNewCollection = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: ICollectionCreatePayload) =>
      createNewCollection(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getUserCollections],
      });
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getCollectionDetails],
      });
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getUserCollections],
      });
      toast.success("New Collection Inserted in the list .");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    createNewCollection: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
