import { useQueries } from "@tanstack/react-query";
import { getPosts } from "../profileService";
import toast from "react-hot-toast";
import { useEffect } from "react";
import type { UserMedia } from "../types/profile.types";

export const useGetUserMedia = (userId: number) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["user-posts", userId],
        queryFn: () => getPosts(userId),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
      },
    ],
  });

  useEffect(() => {
    results.forEach((result, index) => {
      if (result.isSuccess) {
        console.log(`Query ${index} succedded : `, result.data);
      }

      if (result.isError) {
        toast.error(result.error.message);
      }
    });
  }, [results]);

  const [userPosts] = results;

  const userMediaData: UserMedia = {
    userPosts: userPosts.data,
  };

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  return {
    userMedia: userMediaData,
    isLoading,
    isError,
  };
};
