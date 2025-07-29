import { useQuery } from "@tanstack/react-query";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { IHighlightResponse } from "../../home/types/home.types";
import { tanstackQueryKeys } from "../../../common/constants/keys";
import { getUserHighlights } from "../profileService";

export const useGetUserHighlights = (userId: number) => {
  const loggedInUserId = getUserIdFromToken();

  const id = userId === -1 ? loggedInUserId : userId;

  return useQuery<IHighlightResponse[]>({
    queryKey: [tanstackQueryKeys.getUserHighlights, id],
    queryFn: () => getUserHighlights(id),
    enabled: !!id,
  });
};
