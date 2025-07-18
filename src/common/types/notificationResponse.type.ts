import type { FileResponse } from "../../common/types/fileResponseType.type";

export interface NotificationResponse {
  notificationId: number;
  notificationTypeId: number;
  sender: number;
  receiverId: number;
  senderId : number;
  senderUsername: string;
  senderProfilePicture: string;
  senderProfilePictureBase64: FileResponse;
  postId: number;
  storyId: number;
  commentId: number;
  connectionId: number;
  message: string;
  sendDate: string;
  thumbnail: FileResponse;
  isSeen: boolean;
}
