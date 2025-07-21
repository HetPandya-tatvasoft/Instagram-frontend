import { NotificationType } from "../common/enums/notification.enum";
import type { NotificationResponse } from "../common/types/notificationResponse.type";


export function generateNotificationMessage(
  notification: NotificationResponse
): string {
  const { senderUsername, notificationTypeId } = notification;

  switch (notificationTypeId) {
    case NotificationType.FollowRequest:
      return `${senderUsername} has requested to follow you`;
    case NotificationType.FollowAccepted:
      return `${senderUsername} started following you`;
    case NotificationType.PostLiked:
      return `${senderUsername} liked your post`;
    default:
      return "You have a new notification";
  }
}
