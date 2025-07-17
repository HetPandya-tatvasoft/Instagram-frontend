import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchUsers } from "../../features/home/hooks/useSearchUsers";
import type { PaginationRequest } from "../types/paginationRequest.type";
import type { UserResponse } from "../../features/home/types/home.types";
import { ROUTES } from "../../common/constants/routes";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState<string>("");

  const { data: users, isLoading } = useSearchUsers(search);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(ROUTES.MAIN_ROUTES.PROFILE);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full md:w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-72" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Search</h2>
        <button onClick={onClose} className="text-gray-500 text-2xl">
          &times;
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* You can later map search results here */}
      {/* <div className="px-4 py-2 text-gray-500">Start typing to search...</div> */}
      {search && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
          {isLoading ? (
            <p className="p-2 text-sm text-gray-500">Loading...</p>
          ) : users?.data.records.length ? (
            users?.data.records.map((user: UserResponse) => (
              <div
                onClick={handleProfileClick}
                key={user.userId}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={
                    user.profilePicture
                      ? `data:${user.profilePictureBase64.mimeType};base64,${user.profilePictureBase64.base64String}`
                      : "/default-user.png"
                  }
                  alt={user.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{user.userName}</p>
                  <p className="text-xs text-gray-500">{user.fullName}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-2 flex justify-center test-sm text-gray-500">
              No Users Found
            </p>
            // <p className="p-2 text-sm text-gray-500">No users found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
