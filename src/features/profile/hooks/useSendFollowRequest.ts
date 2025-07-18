import { useMutation } from "@tanstack/react-query";
import { sendFollowRequest } from "../profileService";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";

export const useSendFollowRequest = () => {
  const mutation = useMutation({
    mutationFn: (receiverId: number) => sendFollowRequest(receiverId),
    onSuccess: (response) => {
      toast.success("Follow Request sent.");
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
