import { useQuery } from "@tanstack/react-query";
import type { IPaginationResponse } from "../../../common/types/paginationResponse.type";
import type { IPostResponse } from "../types/home.types";
import { getHomeFeedService } from "../homeService";
import type { ApiResponse } from "../../../@core/api/apiResponse.type";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useHomeFeed = () => {
  return useQuery<ApiResponse<IPaginationResponse<IPostResponse>>>({
    queryKey: [tanstackQueryKeys.getHomeFeed],
    queryFn: getHomeFeedService,
  });
};
