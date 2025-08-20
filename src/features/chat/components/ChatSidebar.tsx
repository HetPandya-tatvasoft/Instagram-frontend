import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useGetChatList } from "../hooks/useGetChatList";
import { IChatResponse } from "../types/chat.types";
import NewMessageModal from "./newMessageModal";
interface ChatSidebarProps {
  onSelectChat: (chat: IChatResponse) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onSelectChat }) => {
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);

  // const

  const { data: chatList } = useGetChatList();

  // const handleCreateChat = useCallback(() => {
  //   if(create)
  // }, [])

  return (
    <div className="hidden md:flex md:w-1/3 lg:w-1/4 border-r flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="font-semibold text-lg">Messages</div>

        <button
          className="flex items-center justify-center border px-2 py-2"
          onClick={() => setIsNewMessageOpen(true)}
        >
          <Plus className="mr-1" /> <span>Message</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-3 border-b">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto flex-1">
        {chatList?.data.records.map((chat: IChatResponse) => (
          <button
            key={chat.toUserId}
            onClick={() => onSelectChat(chat)}
            className="w-full text-left flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="truncate">
              <p className="font-medium text-black truncate">
                {chat.toUserFullname}
              </p>
              <p className="text-sm text-gray-500 truncate">
                user's last message
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* New Message Modal */}
      <NewMessageModal
        isOpen={isNewMessageOpen}
        onClose={() => setIsNewMessageOpen(false)}
        onSelectChat={(chat) => {
          onSelectChat(chat);
          setIsNewMessageOpen(false);
        }}
        existingChatLists={chatList?.data.records}
      />
    </div>
  );
};

export default ChatSidebar;
