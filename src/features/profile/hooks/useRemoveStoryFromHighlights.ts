import { useMutation } from "@tanstack/react-query";
import { removeStoryFromHighlights } from "../profileService";
import { IRemoveStoryFromHighlightPayload } from "../types/profile.payload.types";
import { handleApiError } from "../../../utils/error.utils";

export const useRemoveStoryFromHighlights = () => {
  return useMutation({
    mutationFn: (payload: IRemoveStoryFromHighlightPayload) =>
      removeStoryFromHighlights(payload),
    onSuccess: () => {
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
