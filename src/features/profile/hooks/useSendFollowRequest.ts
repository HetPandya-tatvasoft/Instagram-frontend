import { useMutation } from "@tanstack/react-query";
import { sendFollowRequest } from "../profileService";
import { handleApiError } from "../../../utils/error.utils";

export const useSendFollowRequest = () => {
  const mutation = useMutation({
    mutationFn: (receiverId: number) => sendFollowRequest(receiverId),
    onSuccess: () => {
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    follow: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
