import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../@core/api/apiResponse.type";
import { IPaginationResponse } from "../../../common/types/paginationResponse.type";
import { IPostResponse } from "../types/home.types";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { getHomeFeedServiceInfiniteScroll } from "../homeService";

export const useGetHomeFeedInfinite = () => {
  return useInfiniteQuery<
    ApiResponse<IPaginationResponse<IPostResponse>>,
    Error,
    InfiniteData<ApiResponse<IPaginationResponse<IPostResponse>>>,
    [string],
    number
  >({
    queryKey: [tanstackQueryKeys.getHomeFeed],
    queryFn: ({ pageParam = 1 }) =>
      getHomeFeedServiceInfiniteScroll({
        pageParam,
        pageSize: 10,
      }),
    initialPageParam: 1,
    staleTime: 5 * 60 * 60,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalRecords, pageSize } = lastPage.data;
      const maxPage = Math.ceil(totalRecords / pageSize);
      return currentPage < maxPage ? currentPage + 1 : undefined;
    },
  });
};
