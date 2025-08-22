import { IPaginationRequest } from "../../../common/types/paginationRequest.type";
import { IPaginationResponse } from "../../../common/types/paginationResponse.type";
import { postRequest } from "../../../utils/httpClient.utils";
import {
  IChatResponse,
  IMarkMessageSeenPayload,
  IMessageResponse,
  ISaveMessagePayload,
} from "../types/chat.types";

const endPoints = {
  getChatList: `/chat/get-chat-list`,
  saveMessage: `/chat/save-message`,
  deliverMessage: `/chat/deliver-message`,
  markMessageAsSeen: `/chat/mark-message-as-seen`,
  createChat: (toUserId: number) => `/chat/create-chat/${toUserId}`,
  getChatMessages: (chatId: number) => `/chat/get-messages/${chatId}`,
};

export const getChatList = async (payload: IPaginationRequest) =>
  postRequest<IPaginationResponse<IChatResponse>, IPaginationRequest>(
    endPoints.getChatList,
    payload
  );

export const createNewChat = async (toUserId: number) =>
  postRequest<IChatResponse, object>(endPoints.createChat(toUserId), {});

export const getChatMessages = async (
  chatId: number,
  payload: IPaginationRequest
) =>
  postRequest<IPaginationResponse<IMessageResponse>, IPaginationRequest>(
    endPoints.getChatMessages(chatId),
    payload
  );

export const saveMessage = async (payload: ISaveMessagePayload) =>
  postRequest<IMessageResponse, ISaveMessagePayload>(
    endPoints.saveMessage,
    payload
  );

export const deliverMessage = async (toUserId: number) =>
  postRequest<boolean, number>(endPoints.deliverMessage, toUserId);

export const markMessageSeen = async (payload: IMarkMessageSeenPayload) =>
  postRequest<boolean, IMarkMessageSeenPayload>(
    endPoints.markMessageAsSeen,
    payload
  );
