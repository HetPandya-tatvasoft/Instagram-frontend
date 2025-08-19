import { INotificationResponse } from "../../../common/types/notificationResponse.type";

export interface INotificationCardProps {
  notification: INotificationResponse;
  onRespond?: (senderId: number, isAccepted: boolean) => void;
}
