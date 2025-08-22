import { UnfollowUser } from "../profileService";
import { handleApiError } from "../../../utils/error.utils";
import { useMutation } from "@tanstack/react-query";

export const useUnfollowUser = () => {
  const mutation = useMutation({
    mutationFn: (receiverId: number) => UnfollowUser(receiverId),
    onSuccess: () => {
    },
    onError: (error) => {
      handleApiError(error);
    },
    
  });

  return {
    unfollow: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
