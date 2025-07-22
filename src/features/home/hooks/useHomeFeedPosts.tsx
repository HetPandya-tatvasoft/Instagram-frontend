import { useQuery } from "@tanstack/react-query";
import type { PaginationResponse } from "../../../common/types/paginationResponse.type";
import type { PostResponse } from "../types/home.types";
import { getHomeFeedService } from "../homeService"
import type { ApiResponse } from "../../../@core/api/apiResponse.type";

export const useHomeFeed = () => {
    return useQuery<ApiResponse<PaginationResponse<PostResponse>>>({
        queryKey : ["home-feed"],
        queryFn : getHomeFeedService,
    });
}