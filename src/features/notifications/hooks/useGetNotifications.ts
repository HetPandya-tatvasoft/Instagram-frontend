import { useMutation } from "@tanstack/react-query";
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
      toast.success("Notifications received");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return {
    getNotifications: mutation.mutate,
    notifications : mutation.data?.data.records,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
