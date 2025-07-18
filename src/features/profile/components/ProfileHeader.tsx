import React, { useState, useCallback } from "react";
import ProfilePicture from "../components/ProfilePicture";
import { Settings, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants/routes";
import useLogout from "../../../hooks/useLogout";
import type {
  UserResponse,
  UserProfileHeader,
} from "../../home/types/home.types";
import ConnectionButton from "../components/ConnectionButton";

interface ProfileHeaderProps {
  userInfo: UserProfileHeader;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userInfo }) => {
  const updateProfileRoute = ROUTES.MAIN_ROUTES.UPDATE_PROFILE;

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navigate = useNavigate();

  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleEditProfileClick = useCallback(() => {
    navigate(updateProfileRoute);
  }, [navigate, updateProfileRoute]);

  const settingsOptions = [
    "Apps and websites",
    "QR Code",
    "Notifications",
    "Settings and privacy",
    "Supervision",
    "Login Activity",
    "Log out",
  ];

  return (
    <>
      <div className="flex flex-row gap-3 sm:gap-16 flex-wrap sm:flex-nowrap">
        <div className="min-w-[80px]">
          <ProfilePicture
            ProfilePictureUrlBase64={
              userInfo?.userHeaderInfo?.profilePictureBase64.base64String
            }
            ProfilePictureBase64MimeType={
              userInfo?.userHeaderInfo?.profilePictureBase64.mimeType ??
              "application/octet-stream"
            }
          />
        </div>

        <div className="flex flex-col flex-1 gap-2 justify-center">
          <div className="flex flex-col md:flex-row gap-3 lg:gap-8">
            <h2 className="text-lg sm:text-xl font-semibold">
              {userInfo?.userHeaderInfo?.userName}
            </h2>

            <div className="flex  flex-wrap gap-3 lg:gap-6">
              {/* <button
                onClick={handleEditProfileClick}
                className="bg-gray-100 hover:bg-gray-200 text-sm px-2 sm:px-4 py-1 rounded-md font-medium"
              >
                <span className="sm:hidden flex items-center gap-2">
                  <Pencil size={16} /> Profile{" "}
                </span>
                <span className="hidden sm:block">Edit Profile</span>
              </button> */}
              <ConnectionButton  userId={userInfo.userHeaderInfo?.userId ?? 0} followStatus={userInfo.userConnectionData.followStatus} />
              <button className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-1 rounded-md font-medium">
                Archive
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-1 rounded-md font-medium"
              >
                <Settings />
              </button>
            </div>
          </div>
          <div className="flex gap-4 text-sm sm:text-base">
            <span>
              <strong>52</strong> posts
            </span>
            <span>
              <strong>{userInfo.userConnectionData.followersCount}</strong>{" "}
              followers
            </span>
            <span>
              <strong>{userInfo.userConnectionData.followingCount}</strong>{" "}
              following
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          {/* Backdrop click to close */}
          <div
            onClick={() => setIsSettingsOpen(false)}
            className="absolute inset-0"
          ></div>

          {/* Modal Content */}
          <div className="bg-white w-full sm:w-96 rounded-t-2xl sm:rounded-2xl z-10 p-4 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Options</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-sm text-gray-500 hover:text-black"
              >
                Close
              </button>
            </div>
            <ul className="flex flex-col gap-3 w-full">
              {settingsOptions.map((item) => (
                <li
                  key={item}
                  onClick={handleLogout}
                  className="py-2 px-3 hover:bg-gray-100 cursor-pointer transition flex justify-center border-b-1 border-gray-400 pb-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
