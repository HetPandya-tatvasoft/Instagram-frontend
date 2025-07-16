import { useMutation } from "@tanstack/react-query";
// import { updateProfilePicture } from "../profileService";
import { updateProfilePicture } from "../profileService";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";
import { generalConsts } from "../../../common/constants/generalConsts";
import { generateUpdatedSuccessMessage } from "../../../common/constants/messages";

export const useUpdateProfilePicture = () => {
  const mutation = useMutation({
    mutationFn: (file: File | null) => updateProfilePicture(file),
    onSuccess: (response) => {
      toast.success(
        generateUpdatedSuccessMessage(generalConsts.entityConsts.profilePic)
      );
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
