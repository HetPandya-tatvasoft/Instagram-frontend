import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../../@core/api/apiResponse.type";
import { IStoryResponse } from "../../home/types/home.types";
import { getUserStories } from "../profileService";
import { getUserIdFromToken } from "../../../utils/jwt.utils";

export const useGetUserStories = (userId: number) => {
  const loggedInUserId = getUserIdFromToken();

  const id = userId === -1 ? loggedInUserId : userId;

  return useQuery<IStoryResponse[]>({
    queryKey: ["user-story-list", id],
    queryFn: () => getUserStories(id),
    enabled: !!id, // Ensures query only runs when userId is available
  });
};
