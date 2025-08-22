import { useMutation } from "@tanstack/react-query";
import { IStoryViewCreatePayload } from "../types/payload.types";
import { updateViewStory } from "../homeService";

export const useStoryViewed = () => {
  return useMutation({
    mutationFn: (payload: IStoryViewCreatePayload) => updateViewStory(payload),
    onSuccess: () => {},
    onError: () => {},
  });
};
