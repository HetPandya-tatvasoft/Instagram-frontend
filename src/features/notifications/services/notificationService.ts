import { getRequest, postRequest } from "../../../utils/httpClient.utils";
import type { IPaginationResponse } from "../../../common/types/paginationResponse.type";
import type { IPaginationRequest } from "../../../common/types/paginationRequest.type";
import type { INotificationResponse } from "../../../common/types/notificationResponse.type";
import type { ApiResponse } from "../../../@core/api/apiResponse.type";

const endPoints = {
  getNotificationsList: "/notification/get-notification-list",
  acceptRejectFollowRequest: (senderId: number, isAccepted: boolean) =>
    `/connection/accept-or-reject-follow-request?senderId=${senderId}&isAccepted=${isAccepted}`,
};

export const getNotificationList = (payload: IPaginationRequest) =>
  postRequest<IPaginationResponse<INotificationResponse>, IPaginationRequest>(
    endPoints.getNotificationsList,
    payload
  );

export const acceptRejectFollowRequest = (
  senderId: number,
  isAccepted: boolean
) =>
  postRequest<ApiResponse<string>, object>(
    endPoints.acceptRejectFollowRequest(senderId, isAccepted),
    {}
  );
