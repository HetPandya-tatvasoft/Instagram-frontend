import { useMutation } from "@tanstack/react-query";
import { updateLikeSubscribeNotification } from "../profileService";
import { handleApiError } from "../../../utils/error.utils";

export const useSubscribeToLikeNotifications = () => {
  return useMutation({
    mutationFn: (payload: boolean) => updateLikeSubscribeNotification(payload),
    onSuccess: () => {
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
