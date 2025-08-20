// ChatWindow.tsx

import { ArrowLeft, Send } from "lucide-react";
import React from "react";
import { IChatResponse } from "../types/chat.types"; // ✅ import your global type

interface ChatWindowProps {
  chatUser: IChatResponse; // use the same type as sidebar + modal
  onBack?: () => void; // optional handler for ArrowLeft (mobile back)
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatUser, onBack }) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Mobile Header */}
      <div className="flex items-center gap-3 p-3 border-b">
        <ArrowLeft
          className="md:hidden w-6 h-6 cursor-pointer"
          onClick={onBack} // ✅ make this functional
        />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <p className="font-medium">User Name: {chatUser.toUserFullname}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                i % 2 === 0
                  ? "bg-gray-200 text-gray-900"
                  : "bg-blue-500 text-white"
              }`}
            >
              {i % 2 === 0 ? "Hey! How are you?" : "I'm good, you?"}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t flex items-center gap-3 bg-white">
        <input
          type="text"
          placeholder="Message..."
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none"
        />
        <button className="p-2 bg-blue-500 rounded-full text-white">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;