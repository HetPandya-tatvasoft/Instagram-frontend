import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchUsers } from "../../features/home/hooks/useSearchUsers";
import type { IUserResponse } from "../../features/home/types/home.types";
import { routes } from "../../common/constants/routes";
import { getBase64ImageUrl } from "../../utils/getBase64Image";

interface ISearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPanel: React.FC<ISearchPanelProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState<string>("");

  const { data: users, isLoading } = useSearchUsers(search);

  const navigate = useNavigate();

  const handleProfileClick = (id: number) => {
    const route = routes.mainRoutes.userProfile.replace(
      ":userId",
      id.toString()
    );
    navigate(route);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full md:w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-60" : "-translate-x-full"
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
      {search && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
          {isLoading ? (
            <p className="p-2 text-sm text-gray-500">Loading...</p>
          ) : users?.data.records.length ? (
            users?.data.records.map((user: IUserResponse) => (
              <div
                onClick={() => handleProfileClick(user.userId)}
                key={user.userId}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={
                    getBase64ImageUrl(user.profilePictureBase64)
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
