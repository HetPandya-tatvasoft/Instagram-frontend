import { useQuery } from "@tanstack/react-query";
import { defaultPaginationRequest } from "../../../common/types/paginationRequest.type";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { getChatList } from "../service/chatService";

export const useGetChatList = () => {
  const defaultPaginationReq = defaultPaginationRequest;

  return useQuery({
    queryKey: [tanstackQueryKeys.getChatList],
    queryFn: () => getChatList(defaultPaginationReq),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};