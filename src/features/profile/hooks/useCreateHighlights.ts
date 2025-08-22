import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "../../../@core/api/apiResponse.type";
import { IHighlightResponse } from "../../home/types/home.types";
import { IHighlightUpsertPayload } from "../types/profile.payload.types";
import { upsertHighlights } from "../profileService";
import { handleApiError } from "../../../utils/error.utils";

export const useCreateHighlights = () => {
  return useMutation<
    ApiResponse<IHighlightResponse>,
    Error,
    IHighlightUpsertPayload
  >({
    mutationFn: (payload: IHighlightUpsertPayload) => upsertHighlights(payload),
    onSuccess: () => {
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
