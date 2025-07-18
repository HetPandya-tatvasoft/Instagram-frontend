import toast from "react-hot-toast";
import { UnfollowUser } from "../profileService";
import { handleApiError } from "../../../utils/error.utils";
import { useMutation } from "@tanstack/react-query";

export const useUnfollowUser = () => {
  // eslint-disable-next-line no-debugger
  debugger;
  const mutation = useMutation({
    mutationFn: (receiverId: number) => UnfollowUser(receiverId),
    onSuccess: (response) => {
      toast.success("User Unfollowed Successfully");
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
