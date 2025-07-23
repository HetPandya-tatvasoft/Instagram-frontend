import { notificationType } from "../common/enums/notification.enum";
import type { NotificationResponse } from "../common/types/notificationResponse.type";


export function generateNotificationMessage(
  notification: NotificationResponse
): string {
  const { senderUsername, notificationTypeId, message } = notification;

  switch (notificationTypeId) {
    case notificationType.followRequest:
      return `${senderUsername} has requested to follow you`;
    case notificationType.folllowAccepted:
      return `${senderUsername} started following you`;
    case notificationType.postLiked:
      return `${senderUsername} liked your post`;
    case notificationType.commentedInPost:
      return `${message}`
    case notificationType.commentLike : 
      return `${message}.`
    default:
      return "You have a new notification";
  }
}
