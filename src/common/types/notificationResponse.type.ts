import type { IFileResponse } from "../../common/types/fileResponseType.type";

export interface INotificationResponse {
  notificationId: number;
  notificationTypeId: number;
  sender: number;
  receiverId: number;
  senderId : number;
  senderUsername: string;
  senderProfilePicture: string;
  senderProfilePictureBase64: IFileResponse;
  postId: number;
  storyId: number;
  commentId: number;
  connectionId: number;
  message: string;
  sentDate: string;
  thumbnail: IFileResponse;
  isSeen: boolean;
}
