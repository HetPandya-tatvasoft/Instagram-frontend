import { useQuery } from "@tanstack/react-query";
import type { IPaginationResponse } from "../../../common/types/paginationResponse.type";
import type { IPostResponse } from "../types/home.types";
import { getHomeFeedService } from "../homeService"
import type { ApiResponse } from "../../../@core/api/apiResponse.type";

export const useHomeFeed = () => {
    return useQuery<ApiResponse<IPaginationResponse<IPostResponse>>>({
        queryKey : ["home-feed"],
        queryFn : getHomeFeedService,
    });
}