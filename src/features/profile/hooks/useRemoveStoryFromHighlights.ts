import { useMutation } from "@tanstack/react-query";
import { removeStoryFromHighlights } from "../profileService";
import { IRemoveStoryFromHighlightPayload } from "../types/profile.payload.types";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";

export const useRemoveStoryFromHighlights = () => {
  return useMutation({
    mutationFn: (payload: IRemoveStoryFromHighlightPayload) =>
      removeStoryFromHighlights(payload),
    onSuccess: () => {
      toast.success("Story removed from highlights");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
