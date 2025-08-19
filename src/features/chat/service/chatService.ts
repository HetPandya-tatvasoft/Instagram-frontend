import { IPaginationRequest } from "../../../common/types/paginationRequest.type";
import { IPaginationResponse } from "../../../common/types/paginationResponse.type";
import { postRequest } from "../../../utils/httpClient.utils";
import { IChatResponse, IMessageResponse } from "../types/chat.types";

const endPoints = {
  getChatList: `/chat/get-chat-list`,
  createChat: (toUserId: number) => `/chat/create-chat/${toUserId}`,
  getChatMessages: (chatId: number) => `/chat`,
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
