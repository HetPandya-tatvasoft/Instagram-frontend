import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../../../@core/api/apiResponse.type";
import { IStoryResponse } from "../types/home.types";
import { createStory } from "../homeService";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";

export const useCreateStory = () => {
  return useMutation<ApiResponse<IStoryResponse>, Error, FormData>({
    mutationFn: (payload: FormData) => createStory(payload),
    onSuccess: (data) => {
      toast.success("Story created successfully");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
