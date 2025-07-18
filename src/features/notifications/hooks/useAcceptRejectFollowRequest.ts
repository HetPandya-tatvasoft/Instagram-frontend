import { useMutation } from "@tanstack/react-query";
import { acceptRejectFollowRequest } from "../services/notificationService";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";

type FollowRequestPayload = {
  senderId: number;
  isAccepted: boolean;
};

export const useAcceptRejectFollowRequest = () => {
  const mutation = useMutation({
    mutationFn: ({ senderId, isAccepted }: FollowRequestPayload) =>
      acceptRejectFollowRequest(senderId, isAccepted),
    onSuccess: (response) => {
      toast.success("Request Saved Successfully");
    },
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
