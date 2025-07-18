import { getRequest, postRequest } from "../../../utils/httpClient.utils";
import type { PaginationResponse } from "../../../common/types/paginationResponse.type";
import type { PaginationRequest } from "../../../common/types/paginationRequest.type";
import type { NotificationResponse } from "../../../common/types/notificationResponse.type";
import type { ApiResponse } from "../../../@core/api/apiResponse.type";

const ENDPOINTS = {
  getNotificationsList: "/notification/get-notification-list",
  acceptRejectFollowRequest: (senderId: number, isAccepted: boolean) =>
    `/connection/accept-or-reject-follow-request?senderId=${senderId}&isAccepted=${isAccepted}`,
};

export const getNotificationList = (payload: PaginationRequest) =>
  postRequest<PaginationResponse<NotificationResponse>, PaginationRequest>(
    ENDPOINTS.getNotificationsList,
    payload
  );

export const acceptRejectFollowRequest = (
  senderId: number,
  isAccepted: boolean
) =>
  postRequest<ApiResponse<string>, object>(
    ENDPOINTS.acceptRejectFollowRequest(senderId, isAccepted),
    {}
  );
