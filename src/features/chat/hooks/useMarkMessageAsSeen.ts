import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IMarkMessageSeenPayload } from "../types/chat.types";
import { markMessageSeen } from "../service/chatService";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { handleApiError } from "../../../utils/error.utils";

export const useMarkMessageAsSeen = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: IMarkMessageSeenPayload) => markMessageSeen(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getParticularChatMessages],
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    markMessageSeen: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
