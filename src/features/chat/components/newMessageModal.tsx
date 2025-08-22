import { useState, FC, useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import { useSearchUsers } from "../../home/hooks/useSearchUsers";
import { IUserResponse } from "../../home/types/home.types";
import { useCreateChat } from "../hooks/useCreateChat";
import { INewMessageModalProps } from "../types/chatProps.types";
import { IDecodedToken } from "../../authentication/types/auth.type";
import { jwtDecode } from "jwt-decode";
import { getAuthToken } from "../../../utils/cookie.utils";

const NewMessageModal: FC<INewMessageModalProps> = ({
  isOpen,
  onClose,
  onSelectChat,
  existingChatLists,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { createNewChat, isLoading: isCreating } = useCreateChat();

  const { data, isLoading } = useSearchUsers(searchQuery);

  const users: IUserResponse[] = data?.data.records || [];

  const decodedToken: IDecodedToken = jwtDecode(getAuthToken()!);

  const loggedInUserId = Number(decodedToken.UserId);

  const findExistingChat = useCallback(
    (userId: number) =>
      existingChatLists?.find((chat) => chat.toUserId === userId),
    [existingChatLists]
  );

  const handleSelectUser = useCallback(
    (user: IUserResponse) => {
      const existingChat = findExistingChat(user.userId);

      if (existingChat) {
        onSelectChat(existingChat);
        onClose();
      } else {
        createNewChat(user.userId, {
          onSuccess: (newChat) => {
            onSelectChat(newChat.data);
            onClose();
          },
        });
      }
    },
    [createNewChat, findExistingChat, onSelectChat, onClose]
  );

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>New Message</DialogTitle>
      <DialogContent>
        {/* Search box */}
        <TextField
          fullWidth
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
        />

        {/* Search results */}
        <div className="mt-4 space-y-2">
          {isLoading ? (
            <p className="text-sm text-gray-500">Searching...</p>
          ) : users.length > 0 ? (
            users
              .filter((u) => u.userId !== loggedInUserId)
              .map((u: IUserResponse) => (
                <div
                  key={u.userId}
                  className="w-full text-left p-2 hover:bg-gray-100 rounded"
                  onClick={() => handleSelectUser(u)}
                >
                  <div className="flex items-center justify-between">
                    <span>{u.userName}</span>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-sm text-gray-500">No users found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewMessageModal;
