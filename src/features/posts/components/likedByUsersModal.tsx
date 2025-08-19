import React from "react";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { ILikesModalProps } from "../types/postProps.types";

const LikesModal: React.FC<ILikesModalProps> = ({
  isOpen,
  onClose,
  users,
  onToggleFollow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Likes</h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-600">
            &times;
          </button>
        </div>

        {/* List */}
        <div className="max-h-[70vh] overflow-y-auto">
          {users.map((user) => (
            <div key={user.userId} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={getBase64ImageUrl(user.profilePicBase64)}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">{user.username}</span>
              </div>
              <button
                onClick={() => onToggleFollow(user.userId, user.isFollowing)}
                className={`px-3 py-1 text-sm rounded-full ${
                  user.isFollowing
                    ? "bg-gray-200 text-black"
                    : "bg-blue-500 text-white"
                }`}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikesModal;
