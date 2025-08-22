import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deliverMessage } from "../service/chatService";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { handleApiError } from "../../../utils/error.utils";

export const useDeliverMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (toUserId: number) => deliverMessage(toUserId),
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
    deliverMessage: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
