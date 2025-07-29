import { useMutation } from "@tanstack/react-query";
import { deleteHighlight } from "../profileService";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";

export const useDeleteHighlight = () => {
  return useMutation({
    mutationFn: (highlightId: number) => deleteHighlight(highlightId),
    onSuccess: () => {
      toast.success("Highlight Deleted Successfully");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
