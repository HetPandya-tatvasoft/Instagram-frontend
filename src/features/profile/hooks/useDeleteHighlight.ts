import { useMutation } from "@tanstack/react-query";
import { deleteHighlight } from "../profileService";
import { handleApiError } from "../../../utils/error.utils";

export const useDeleteHighlight = () => {
  return useMutation({
    mutationFn: (highlightId: number) => deleteHighlight(highlightId),
    onSuccess: () => {},
    onError: (error) => {
      handleApiError(error);
    },
  });
};
