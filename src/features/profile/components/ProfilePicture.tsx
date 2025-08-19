import { useRef, useState, useCallback } from "react";
import { useUpdateProfilePicture } from "../hooks/useUpdateProfilePicture";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import type { IFileResponse } from "../../../common/types/fileResponseType.type";
import StoryViewer from "../../home/components/StoryViewer";
import { IProfilePictureProps } from "../types/props.types";

const ProfilePicture: React.FC<IProfilePictureProps> = ({
  ProfilePictureUrlBase64,
  ProfilePictureBase64MimeType,
  userStories,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const [openStoryViewer, setOpenStoryViewer] = useState(false);

  const handleStoryClick = useCallback(() => {
    setOpenStoryViewer(true);
  }, []);

  const [profilePic, setProfilePic] = useState<IFileResponse | null>(
    ProfilePictureUrlBase64
      ? {
          base64String: ProfilePictureUrlBase64,
          mimeType: ProfilePictureBase64MimeType,
        }
      : null
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { upload, isLoading } = useUpdateProfilePicture();

  const handleProfileClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleViewPhoto = useCallback(() => {
    setIsPhotoModalOpen(true);
    setIsModalOpen(false);
  }, []);

  const closePhotoViewModal = useCallback(() => {
    setIsPhotoModalOpen(false);
  }, []);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemovePhoto = useCallback(() => {
    setProfilePic(null);
    handleCloseModal();
  }, [handleCloseModal]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = (reader.result as string).split(",")[1];
          const mimeType = file.type;

          const imageData: IFileResponse = {
            base64String,
            mimeType,
          };

          setProfilePic(imageData);
          upload(file);
        };

        reader.readAsDataURL(file);
      }

      handleCloseModal();
    },
    [upload, handleCloseModal]
  );

  return (
    <>
      {/* <h4>This is the image component</h4> */}
      <div className="flex items-center justify-center mt-10">
        <div onClick={handleProfileClick} className="cursor-pointer relative">
          <img
            src={getBase64ImageUrl(profilePic)}
            alt="Profile Picture"
            className="rounded-full w-32 h-32 object-cover border-2 border-gray-300 hover:opacity-80 transition"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-80 shadow-2xl text-center overflow-hidden">
              <h2 className="text-lg font-bold py-4 border-b">
                Change Profile Photo
              </h2>

              <div className="divide-y">
                {userStories.length >= 1 && (
                  <button
                    onClick={handleStoryClick}
                    className="w-full py-3 text-blue-500 font-medium hover:bg-gray-200 cursor-pointer"
                  >
                    View Story(ies)
                  </button>
                )}
                <button
                  onClick={handleViewPhoto}
                  className="w-full py-3 text-blue-500 font-medium hover:bg-gray-200 cursor-pointer"
                >
                  View Profile Photo
                </button>
                <button
                  onClick={handleUploadClick}
                  className="w-full py-3 text-blue-500 font-medium hover:bg-gray-200 cursor-pointer"
                >
                  Upload Photo
                </button>
                <button
                  onClick={handleRemovePhoto}
                  className="w-full py-3 text-red-500 font-medium hover:bg-gray-200 cursor-pointer"
                >
                  Remove Current Photo
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-full py-3 text-gray-700 font-medium hover:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isPhotoModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="relative max-w-xs sm:max-w-sm p-4">
              <button
                onClick={closePhotoViewModal}
                className="absolute top-2 right-2 text-white text-5xl font-bold hover:text-gray-300"
              >
                ×
              </button>
              <img
                src={getBase64ImageUrl(profilePic)}
                alt="Profile"
                className="w-72 h-72 sm:w-120 sm:h-90 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
        )}

        {openStoryViewer && userStories.length >= 1 && (
          <StoryViewer
            stories={userStories}
            onClose={() => setOpenStoryViewer(false)}
          />
        )}
      </div>
    </>
  );
};

export default ProfilePicture;
