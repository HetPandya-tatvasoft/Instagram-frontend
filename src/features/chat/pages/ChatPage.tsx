// ChatPage.jsx
import { useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import { useGetChatList } from "../hooks/useGetChatList";

interface User {
  id: number;
  name: string;
  lastMessage: string;
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<User | null>(null);

  const { data: chatList } = useGetChatList();

  console.log("The chat list is as follows : ", chatList);

  return (
    <MainLayout>
      <div className="h-screen flex bg-gray-50">
        {/* Sidebar */}
        <ChatSidebar onSelectChat={setSelectedChat} />

        {/* Chat Window */}
        <div className="flex-1 flex">
          {selectedChat ? (
            <ChatWindow chatUser={selectedChat} />
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
