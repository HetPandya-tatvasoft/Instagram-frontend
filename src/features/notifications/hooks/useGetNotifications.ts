import { useMutation, useQuery } from "@tanstack/react-query";
import {
  type IPaginationRequest,
  defaultPaginationRequest,
} from "../../../common/types/paginationRequest.type";
import { getNotificationList } from "../services/notificationService";
import { handleApiError } from "../../../utils/error.utils";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useGetNotifications = () => {
  const defaultPayload: IPaginationRequest = defaultPaginationRequest;

  const mutation = useMutation({
    mutationFn: () => getNotificationList(defaultPayload),
    onSuccess: () => {},
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    getNotifications: mutation.mutate,
    notifications: mutation.data?.data.records,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

export const useGetNotificationsQuery = () => {
  const defaultPayload: IPaginationRequest = defaultPaginationRequest;

  return useQuery({
    queryKey: [tanstackQueryKeys.getNotificationsListKey],
    queryFn: () => getNotificationList(defaultPayload),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
