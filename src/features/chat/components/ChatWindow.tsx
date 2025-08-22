import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeft, Send } from "lucide-react";
import { IMessageResponse, ISaveMessagePayload } from "../types/chat.types";
import { useGetMessagesByChatId } from "../hooks/useGetMessagesByChatId";
import { IChatWindowProps } from "../types/chatProps.types";
import { useSaveMessage } from "../hooks/useSaveMessage";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { useDeliverMessage } from "../hooks/useDeliverMessage";
import { useMarkMessageAsSeen } from "../hooks/useMarkMessageAsSeen";

const ChatWindow: React.FC<IChatWindowProps> = ({ chatUser, onBack }) => {
  const [message, setMessage] = useState<string>("");

  const { data: chatMessages, isLoading } = useGetMessagesByChatId(
    chatUser.chatId
  );

  const loggedInUserId = getUserIdFromToken();

  const { createNewChat, isLoading: createChatPending } = useSaveMessage();

  const { deliverMessage } = useDeliverMessage();

  const { markMessageSeen } = useMarkMessageAsSeen();

  const isDisabled = !message.trim() || createChatPending;

  const records = useMemo(
    () => chatMessages?.data.records || [],
    [chatMessages?.data.records]
  );

  const sortedRecords = useMemo(
    () => records.sort((a, b) => a.messageId - b.messageId),
    [records]
  );

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sortedRecords.length, sortedRecords]);

  useEffect(() => {
    if (chatUser.toUserId) {
      deliverMessage(chatUser.toUserId);
    }
  }, [chatUser.toUserId, deliverMessage]);

  useEffect(() => {
    const unseenMessages = sortedRecords.filter(
      (m) => m.toUserId === loggedInUserId && !m.isSeen
    );

    unseenMessages.forEach((message: IMessageResponse) => {
      markMessageSeen({ chatId: message.chatId, toUserId: message.toUserId });
    });
  }, [sortedRecords, loggedInUserId, markMessageSeen]);

  const handleCreateNewChat = useCallback(async () => {
    if (!message.trim()) return;

    try {
      const sendMessagePayload: ISaveMessagePayload = {
        chatId: chatUser.chatId,
        senderId: loggedInUserId,
        receiverId: chatUser.toUserId,
        isReceiverOnline: false,
        message: message,
      };

      createNewChat(sendMessagePayload);

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [
    message,
    chatUser.chatId,
    createNewChat,
    chatUser.toUserId,
    loggedInUserId,
  ]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Mobile Header */}
      <div className="flex items-center gap-3 p-3 border-b">
        {onBack && (
          <ArrowLeft
            className="md:hidden w-6 h-6 cursor-pointer"
            onClick={onBack}
          />
        )}
        <div className="flex items-center gap-2">
          <img
            src={getBase64ImageUrl(chatUser.toUserProfilePictureBase64)}
            className="w-12 h-12 rounded-full"
            alt=""
          />
          <p className="font-medium">{chatUser.toUserFullname}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="text-gray-500 text-center">Loading messages...</div>
        ) : sortedRecords.length === 0 ? (
          <div className="text-gray-400 text-center">No messages yet</div>
        ) : (
          sortedRecords.map((message: IMessageResponse) => (
            <div
              key={message.messageId}
              className={`flex ${
                message.fromUserId === loggedInUserId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                  message.fromUserId === loggedInUserId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {message.message}
              </div>
            </div>
          ))
        )}
        {/* dummy div for auto scroll */}
        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <div className="mb-10 md:mb-0 p-3 border-t flex items-center gap-3 bg-white">
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none"
        />
        <button
          disabled={isDisabled}
          className={`p-2 rounded-full text-white transition ${
            isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() => handleCreateNewChat()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
