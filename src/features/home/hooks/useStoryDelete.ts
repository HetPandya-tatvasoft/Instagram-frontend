import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory } from "../homeService";
import { handleApiError } from "../../../utils/error.utils";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useStoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (storyId: number) => deleteStory(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(tanstackQueryKeys.getUserStoriesKey),
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
