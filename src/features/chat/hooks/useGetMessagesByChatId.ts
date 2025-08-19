import { useQuery } from "@tanstack/react-query";
import { defaultPaginationRequest } from "../../../common/types/paginationRequest.type";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { getChatMessages } from "../service/chatService";

export const useGetMessagesByChatId = (chatId: number) => {
  const defaultPaginationReq = defaultPaginationRequest;

  return useQuery({
    queryKey: [tanstackQueryKeys.getParticularChatMessages],
    queryFn: () => getChatMessages(chatId, defaultPaginationReq),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
