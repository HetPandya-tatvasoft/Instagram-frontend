import { useMutation } from "@tanstack/react-query";
import { acceptRejectFollowRequest } from "../services/notificationService";
import { handleApiError } from "../../../utils/error.utils";
import { IFollowRequestPayload } from "../types/notification.types";

export const useAcceptRejectFollowRequest = () => {
  const mutation = useMutation({
    mutationFn: ({ senderId, isAccepted }: IFollowRequestPayload) =>
      acceptRejectFollowRequest(senderId, isAccepted),
    onSuccess: () => {},
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    respondToFollowRequest: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
