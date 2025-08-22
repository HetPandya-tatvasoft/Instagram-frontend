import { useQuery } from "@tanstack/react-query";
import { defaultPaginationRequest } from "../../../common/types/paginationRequest.type";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { getCollectionDetails } from "../../home/homeService";
import type { IPaginationResponse } from "../../../common/types/paginationResponse.type";
import type { ICollectionResponse } from "../../home/types/home.types";
import { ApiResponse } from "../../../@core/api/apiResponse.type";

export const useGetCollectionDetails = (collectionId: number) => {
  return useQuery<ApiResponse<IPaginationResponse<ICollectionResponse>>>({
    queryKey: [tanstackQueryKeys.getCollectionDetails, collectionId],
    queryFn: () => getCollectionDetails(defaultPaginationRequest, collectionId),
    enabled: !!collectionId,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
