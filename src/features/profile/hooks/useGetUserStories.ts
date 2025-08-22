import { useQuery } from "@tanstack/react-query";
import { IStoryResponse } from "../../home/types/home.types";
import { getUserStories } from "../profileService";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useGetUserStories = (userId: number) => {
  const loggedInUserId = getUserIdFromToken();

  const id = userId === -1 ? loggedInUserId : userId;

  return useQuery<IStoryResponse[]>({
    queryKey: [tanstackQueryKeys.getUserStoriesKey],
    queryFn: () => getUserStories(id),
    enabled: !!id,
  });
};
