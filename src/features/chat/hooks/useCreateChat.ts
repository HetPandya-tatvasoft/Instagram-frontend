import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewChat } from "../service/chatService";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { handleApiError } from "../../../utils/error.utils";

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (toUserId: number) => createNewChat(toUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getChatList],
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