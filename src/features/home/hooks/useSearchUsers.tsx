import { useDebounce } from "../hooks/useDebounce";
import { searchUserService } from "../homeService";
import {
  type PaginationRequest,
  defaultPaginationRequest,
} from "../../../common/types/paginationRequest.type";
import { useQuery } from "@tanstack/react-query";

export const useSearchUsers = (searchText: string) => {
  const debouncedQuery = useDebounce(searchText, 100);

  const payloadForUserSearch = defaultPaginationRequest;
  payloadForUserSearch.searchText = debouncedQuery;

  return useQuery({
    queryKey: ["search-users", debouncedQuery],
    queryFn: () => searchUserService(defaultPaginationRequest),
    enabled: !!debouncedQuery,
    staleTime: 1000 * 60,
  });
};
