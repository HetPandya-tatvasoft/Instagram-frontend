import { IChatResponse } from "./chat.types";

export interface INewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat: (chat: IChatResponse) => void;
  existingChatLists?: IChatResponse[];
}
