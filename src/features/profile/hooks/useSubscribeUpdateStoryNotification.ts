import { useMutation } from "@tanstack/react-query";
import { updateStorySubscribeNotification } from "../profileService";
import { handleApiError } from "../../../utils/error.utils";

export const useSubscribeUpdateStoryNotification = () => {
  return useMutation({
    mutationFn: (payload: boolean) => updateStorySubscribeNotification(payload),
    onSuccess: () => {
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
