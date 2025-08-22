import { IChatResponse } from "./chat.types";

export interface INewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChat: (chat: IChatResponse) => void;
  existingChatLists?: IChatResponse[];
}

export interface IChatWindowProps {
  chatUser: IChatResponse;
  onBack?: () => void;
}

export interface IChatSidebarProps {
  onSelectChat: (chat: IChatResponse) => void;
  isMobile?: boolean;
}
