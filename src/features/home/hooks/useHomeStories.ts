import { useQuery } from "@tanstack/react-query";
import { defaultPaginationRequest } from "../../../common/types/paginationRequest.type";
import { getStoryListOfFollowing } from "../homeService";

export const useHomeStories = () => {
  const defaultPaginationReq = defaultPaginationRequest;

  return useQuery({
    queryKey: ["home-stories"],
    queryFn: () => getStoryListOfFollowing(defaultPaginationReq),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
