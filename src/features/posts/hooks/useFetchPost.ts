import { useQuery } from "@tanstack/react-query";
import { fetchPostDetails } from "../postService";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useFetchPost = (postId: number) => {
  const result = useQuery({
    queryKey: [tanstackQueryKeys.getPostDetails, postId],
    queryFn: () => fetchPostDetails(postId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data, isLoading, isError, error, refetch } = result;

  return {
    post: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
