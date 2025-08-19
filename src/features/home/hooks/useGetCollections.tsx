import { useQuery } from "@tanstack/react-query";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { getCollectionsList } from "../homeService";
import { defaultPaginationRequest } from "../../../common/types/paginationRequest.type";

export const useGetCollections = () => {
  const defaultPaginationReq = defaultPaginationRequest;

  return useQuery({
    queryKey: [tanstackQueryKeys.getUserCollections],
    queryFn: () => getCollectionsList(defaultPaginationReq),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
  