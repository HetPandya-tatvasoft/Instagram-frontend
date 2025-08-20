import { IFileResponse } from "../../../common/types/fileResponseType.type";

export interface IChatResponse {
  chatId: number;
  fromUserId: number;
  toUserId: number;
  toUserUsername: string;
  toUserFullname: string;
  toUserProfilePictureBase64: IFileResponse;
  lastMessage: string;
  unreadMessageCount: number;
  isOnline: boolean;
  lastSeen: string;
  createdDate: string;
  modifiedDate: string;
}

export interface IMessageResponse {
  messageId: number;
  chatId: number;
  fromUserId: number;
  toUserId: number;
  message: string;
  isSent: boolean;
  isDelivered: boolean;
  isSeen: boolean;
  isDeleted: boolean;
  createdDate: string;
  modifiedDate: string;
}