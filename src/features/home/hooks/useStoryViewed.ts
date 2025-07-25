import { useMutation } from "@tanstack/react-query";
import { IStoryViewCreatePayload } from "../types/payload.types";
import { updateViewStory } from "../homeService";
import { handleApiError } from "../../../utils/error.utils";
import toast from "react-hot-toast";

export const useStoryViewed = () => {
  return useMutation({
    mutationFn: (payload: IStoryViewCreatePayload) => updateViewStory(payload),
    onSuccess: () => {
      toast.success("Story View updated successfully");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
