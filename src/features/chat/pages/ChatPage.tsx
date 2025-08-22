import { useEffect, useState } from "react";
import { IChatResponse } from "../types/chat.types";
import MainLayout from "../../../layouts/MainLayout";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import { createChatHubConnection } from "../../../utils/signalR.utils";
import { HubConnectionState } from "@microsoft/signalr";
import { HubMessages, tanstackQueryKeys } from "../../../common/constants/keys";
import { useQueryClient } from "@tanstack/react-query";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<IChatResponse | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const connection = createChatHubConnection();

    const startConnection = async () => {
      if (connection.state === HubConnectionState.Disconnected) {
        try {
          await connection.start();
        } catch (err) {
          console.error("Signal R Error : ", err, "Chat Hub Signal Error");
        }
      }

      connection.on(HubMessages.chatCreated, () => {
        queryClient.invalidateQueries({
          queryKey: [tanstackQueryKeys.getChatList],
        });
      });

      connection.on(HubMessages.messageReceived, () => {
        queryClient.invalidateQueries({
          queryKey: [tanstackQueryKeys.getParticularChatMessages],
        });
      });
    };

    startConnection();

    return () => {
      connection.off(HubMessages.chatCreated);
      connection.off(HubMessages.messageReceived);
    };
  }, [queryClient]);

  return (
    <MainLayout>
      <div className="h-screen flex bg-gray-50">
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-1">
          <ChatSidebar onSelectChat={setSelectedChat} />
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

        {/* Mobile Layout */}
        <div className="flex md:hidden flex-1">
          {selectedChat ? (
            <ChatWindow
              chatUser={selectedChat}
              onBack={() => setSelectedChat(null)}
            />
          ) : (
            <ChatSidebar onSelectChat={setSelectedChat} isMobile />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
