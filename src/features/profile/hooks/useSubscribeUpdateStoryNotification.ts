import { useMutation } from "@tanstack/react-query";
import { updateStorySubscribeNotification } from "../profileService";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";

export const useSubscribeUpdateStoryNotification = () => {
  return useMutation({
    mutationFn: (payload: boolean) => updateStorySubscribeNotification(payload),
    onSuccess: () => {
      toast.success("Subscription data updated successfully");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
