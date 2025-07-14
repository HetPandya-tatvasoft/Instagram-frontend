import { useRef, useState } from "react";

interface ProfilePictureProps {
    ProfilePictureUrl?: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ ProfilePictureUrl }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [profilePic, setProfilePic] = useState(ProfilePictureUrl)

    const handleProfileClick = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const handleViewPhoto = () => {
        // fileInputRef.current?.click();
        setIsPhotoModalOpen(true);
        setIsModalOpen(false)
    };

    const closePhotoViewModal = () => {
        setIsPhotoModalOpen(false);
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemovePhoto = () => {
        setProfilePic('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALEAAACUCAMAAADrljhyAAAANlBMVEXl5uivtLirsLTKz9PDyMzm5ubo6euttLrj5+rl5uq1ub3j5+jO0dPi4+ausbbW2Nu9wcTa3uH3jEsrAAADU0lEQVR4nO2c23LcIAxADdgysMbA//9sYS9NNrG9aAsW29F56EOmD2cUWRKgyTAwDMMwDMMwDMMwDMMwDNM1WuuNn05T+sec7VIOGOeiXzI+Oq2BWuiIFEtwXgW7yhvCBuW7dgY3BiGFEHNCXJFJ2vXqDINKrmIDNZiJ2m4D463c0s2BFkt/n15KiD3fHHc59pYaEMOe74019KUMUexG+C+xI+WXwrfS0Y3yBdzuN/eE7UZ5CGuJsBCBWvSO2a8SP5Bqa+44n1gU4et/WsnzQqdZAmxhhDMWiJtf+iXDUpoT17xYiIOc0/JF6/gB/ccHHiUshKfO5GHcnNZ2kSO1cMR8dxnrqI0x3901yJ5WGBTamLhaQGmD/iIQG1u0sSU2xvomDO3tBTaNUyLrTzNe2fgUY0I0WlgITTpwoobjG9T1GDdrZkZaY43v0orU+KLxk1CkFB4ug/u4abP86H8PMflE/2mnplRZDfJkSn+PDB41b9IfTHMTKc9kSTwc30EUOOLS9gCWYmNF7XrHBSnmgmsLGahr8QOT2kjJPYvtIycypmToXMXmqzUR+vqucBjn1boLteZ3IAZ5mMoyRJi6ejidhsMBQ9Lfwv5kSs0v37b8jnMOve2h1f1Cg1NWbmSGtOpCe7bbB9xi5XNySGkXRz/9bDMNlwlyoL8JW+UG6sealwAY5xel8taNhh7zdwN4QC1SzpShlmCYQj4vXw26INBWEICYC++IQi3e0Ugn3dHa3IZx5EZoxwinz5556kE/jD1NR6ee+SCqgm2xI+ZZChXPmpAAUnyLDs9HxnOO8zkHv/uu2PxvyjdOWDSc8JeZx3iTb6FbAqqqsBCq8QkbkBfcr5ENX3JS/dRjZd9My6cc/P7HS3LNaLcjUvmj+6LZ3YDGP5AWos3Qomdr/PtoIWvQLYyb5UTGN7gimJDrjhjm1PyqG0+Dr14nviF9/Ri/sXWFocEjVNMQi7n+KxSMNWa1XeF5rt2s9TvrNTgqz8qmZWm7UbnAQYsR6Jmx7ln1jX0gLKGuMXpVBY91NY0NepX7DeOq9Q38CcZVZ85PNG4uXHmuB4+9XnuDuieRqNpTd7IwvT4i/kfo7T9CUJPUPy5dbWAwDMMwDMMwDMMwDMMw3fAHahcnKf8VqB0AAAAASUVORK5CYII=');

        handleCloseModal();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
        }
        handleCloseModal();
    }

    return (
        <>
            {/* <h4>This is the image component</h4> */}
            <div className="flex items-center justify-center mt-10">
                <div onClick={handleProfileClick} className="cursor-pointer relative">
                    <img
                        src={profilePic}
                        alt="Profile Picture Image"
                        className="rounded-full w-32 h-32 object-cover border-2 border-gray-300 hover:opacity-80 transition" />
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
                            <h2 className="text-lg font-bold py-4 border-b">Change Profile Photo</h2>

                            <div className="divide-y">
                                <button
                                    onClick={handleViewPhoto}
                                    className="w-full py-3 text-blue-500 font-medium hover:bg-gray-50"
                                >
                                    View Profile Photo
                                </button>
                                <button
                                    onClick={handleUploadClick}
                                    className="w-full py-3 text-blue-500 font-medium hover:bg-gray-50"
                                >
                                    Upload Photo
                                </button>
                                <button
                                    onClick={handleRemovePhoto}
                                    className="w-full py-3 text-red-500 font-medium hover:bg-gray-50"
                                >
                                    Remove Current Photo
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="w-full py-3 text-gray-700 font-medium hover:bg-gray-50"
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
                                src={profilePic}
                                alt="Profile"
                                className="w-72 h-72 sm:w-120 sm:h-90 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProfilePicture;