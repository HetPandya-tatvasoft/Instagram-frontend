import React, { useRef, useState } from "react";

const ProfilePicture = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profilePic, setProfilePic] = useState("/default-avatar.jpg"); // Replace with real image URL

  const handleProfileClick = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleViewPhoto = () => {
    // Show full screen modal or new tab with image
    window.open(profilePic, "_blank");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setProfilePic("/default-avatar.jpg"); // Set to default
    // Also make API call to remove from server
    handleCloseModal();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      // Make API call to upload `file`
    }
    handleCloseModal();
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div onClick={handleProfileClick} className="cursor-pointer relative">
        <img
          src={profilePic}
          alt="Profile"
          className="rounded-full w-32 h-32 object-cover border-2 border-gray-300 hover:opacity-80 transition"
        />
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-80 text-center p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Change Profile Photo</h2>
            <button
              onClick={handleViewPhoto}
              className="text-blue-500 font-semibold w-full py-2 hover:bg-gray-100"
            >
              View Profile Photo
            </button>
            <button
              onClick={handleUploadClick}
              className="text-blue-500 font-semibold w-full py-2 hover:bg-gray-100"
            >
              Upload Photo
            </button>
            <button
              onClick={handleRemovePhoto}
              className="text-red-500 font-semibold w-full py-2 hover:bg-gray-100"
            >
              Remove Current Photo
            </button>
            <button
              onClick={handleCloseModal}
              className="w-full py-2 mt-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
