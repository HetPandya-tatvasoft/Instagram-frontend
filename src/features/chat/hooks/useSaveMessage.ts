import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ISaveMessagePayload } from "../types/chat.types";
import { saveMessage } from "../service/chatService";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { handleApiError } from "../../../utils/error.utils";

export const useSaveMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: ISaveMessagePayload) => saveMessage(payload),
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
    createNewChat: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
