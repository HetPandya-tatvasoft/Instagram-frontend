import type { IFileResponse } from "../../../common/types/fileResponseType.type";

export interface INotificationResponse {
  notificationId: number;
  notificationTypeId: number;
  senderId: number;
  receiverId: number;
  senderUsername: string;
  senderProfilePicture: string;
  senderProfilePictureBase64: IFileResponse;
  postId: number;
  storyId: number;
  commentId: number;
  connectionId: number;
  message: string;
  sentDate: string;
  Thumbnail: IFileResponse;
  isSeen: boolean;
}

export interface IFollowRequestPayload {
  senderId: number;
  isAccepted: boolean;
}
