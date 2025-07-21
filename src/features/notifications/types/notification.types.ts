import type { FileResponse } from "../../../common/types/fileResponseType.type";

export interface NotificationResponse {
  notificationId: number;
  notificationTypeId: number;
  senderId: number;
  receiverId: number;
  senderUsername: string;
  senderProfilePicture: string;
  senderProfilePictureBase64: FileResponse;
  postId: number;
  storyId: number;
  commentId: number;
  connectionId: number;
  message: string;
  sentDate: string;
  Thumbnail: FileResponse;
  isSeen: boolean;
}
