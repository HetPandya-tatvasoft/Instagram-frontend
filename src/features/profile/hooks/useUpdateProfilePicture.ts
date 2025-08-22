import { useMutation } from "@tanstack/react-query";
import { updateProfilePicture } from "../profileService";
import { handleApiError } from "../../../utils/error.utils";

export const useUpdateProfilePicture = () => {
  const mutation = useMutation({
    mutationFn: (file: File | null) => updateProfilePicture(file),
    onSuccess: () => {
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    upload: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
