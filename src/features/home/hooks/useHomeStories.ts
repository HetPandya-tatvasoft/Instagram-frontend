import { useQuery } from "@tanstack/react-query";
import { defaultPaginationRequest } from "../../../common/types/paginationRequest.type";
import { getStoryListOfFollowing } from "../homeService";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useHomeStories = () => {
  const defaultPaginationReq = defaultPaginationRequest;

  return useQuery({
    queryKey: [tanstackQueryKeys.getStoriesForHome],
    queryFn: () => getStoryListOfFollowing(defaultPaginationReq),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
