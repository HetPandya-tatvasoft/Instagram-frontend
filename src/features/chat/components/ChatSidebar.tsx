// ChatSidebar.tsx
import React from "react";
import { Search } from "lucide-react";

interface User {
  id: number;
  name: string;
  lastMessage: string;
}

interface ChatSidebarProps {
  onSelectChat: (user: User) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onSelectChat }) => {
  const users: User[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    name: `User ${i + 1}`,
    lastMessage: "Last message...",
  }));

  return (
    <div className="hidden md:flex md:w-1/3 lg:w-1/4 border-r flex-col">
      {/* Header */}
      <div className="p-4 border-b font-semibold text-lg">Messages</div>

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
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectChat(user)}
            className="w-full text-left flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer focus:outline-none"
          >
            {/* Avatar placeholder */}
            <div className="w-10 h-10 bg-gray-300 rounded-full" />

            {/* User Info */}
            <div className="truncate">
              <p className="font-medium text-black truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {user.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
