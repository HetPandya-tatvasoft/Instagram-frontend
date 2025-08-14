import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICollectionUpsertPayload } from "../types/payload.types";
import { upsertCollection } from "../homeService";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useUpsertCollection = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: ICollectionUpsertPayload) =>
      upsertCollection(payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getCollectionDetails],
      });
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getUserCollections],
      });
      toast.success(response.data);
    },

    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    upsertCollection: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
