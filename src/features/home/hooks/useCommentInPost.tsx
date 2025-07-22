import { useMutation } from "@tanstack/react-query";
import type { addCommentPayload } from "../types/payload.types";
import { commentInPost } from "../homeService";
import { messages } from "../../../common/constants/messages";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";
import { useQueryClient } from "@tanstack/react-query"

export const useCommentInPost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: addCommentPayload) => commentInPost(payload),
    onSuccess: (response) => {
      toast.success(messages.connections.commentAddSuccess);
      queryClient.invalidateQueries({ queryKey: ["home-feed"] });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    addComment: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
