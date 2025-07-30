import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHighlightTitle } from "../profileService";
import { IUpdateHighlightPayload } from "../types/profile.payload.types";
import { handleApiError } from "../../../utils/error.utils";
import { useParams } from "react-router-dom";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useEditHighlightTitle = () => {
  const { userId } = useParams<{ userId: string }>();
  const loggedInUserId = getUserIdFromToken();
  const queryClient = useQueryClient();

  const id = Number(userId) === -1 ? loggedInUserId : Number(userId);

  return useMutation({
    mutationFn: ({ highlightId, title }: IUpdateHighlightPayload) =>
      updateHighlightTitle(highlightId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getUserHighlights, id],
      });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
