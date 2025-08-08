import { useMutation } from "@tanstack/react-query";
import { updateLikeSubscribeNotification } from "../profileService";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";

export const useSubscribeToLikeNotifications = () => {
  return useMutation({
    mutationFn: (payload: boolean) => updateLikeSubscribeNotification(payload),
    onSuccess: () => {
      toast.success("Lke posts notification subscription updated successfully");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
