import { useMutation, useQuery } from "@tanstack/react-query";
import {
  type PaginationRequest,
  defaultPaginationRequest,
} from "../../../common/types/paginationRequest.type";
import { getNotificationList } from "../services/notificationService";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/error.utils";

export const useGetNotifications = () => {
  const defaultPayload: PaginationRequest = defaultPaginationRequest;

  const mutation = useMutation({
    mutationFn: () => getNotificationList(defaultPayload),
    onSuccess: (response) => {
    },
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
  const defaultPayload: PaginationRequest = defaultPaginationRequest;

  return useQuery({
    queryKey: ["notifications-list-forPage", defaultPayload],
    queryFn: () => getNotificationList(defaultPayload),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
