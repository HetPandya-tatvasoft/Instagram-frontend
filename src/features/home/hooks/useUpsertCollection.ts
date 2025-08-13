import { useMutation } from "@tanstack/react-query";
import { ICollectionUpsertPayload } from "../types/payload.types";
import { upsertCollection } from "../homeService";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";

export const useUpsertCollection = () => {
  const mutation = useMutation({
    mutationFn: (payload: ICollectionUpsertPayload) =>
      upsertCollection(payload),

    onSuccess: (response) => {
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
