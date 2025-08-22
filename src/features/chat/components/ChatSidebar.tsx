import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { IChatResponse } from "../types/chat.types";
import { useGetChatList } from "../hooks/useGetChatList";
import NewMessageModal from "./newMessageModal";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { IChatSidebarProps } from "../types/chatProps.types";



const ChatSidebar: React.FC<IChatSidebarProps> = ({
  onSelectChat,
  isMobile,
}) => {
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const { data: chatList } = useGetChatList();

  return (
    <div
      className={`flex flex-col border-r ${
        isMobile ? "flex-1 md:hidden" : "hidden md:flex md:w-1/3 lg:w-1/4"
      }`}
    >
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
            <img src={getBase64ImageUrl(chat.toUserProfilePictureBase64)} className="w-10 h-10 rounded-full" alt="" />
            <div className="truncate">
              <p className="font-medium text-black truncate">
                {chat.toUserFullname}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
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
