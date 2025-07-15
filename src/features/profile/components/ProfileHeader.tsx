import React, { useState, useCallback } from 'react';
import ProfilePicture from '../components/ProfilePicture';
import { Settings, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../common/constants/routes';
import useLogout from '../../../hooks/useLogout';


const ProfileHeader: React.FC = () => {

    const updateProfileRoute = ROUTES.MAIN_ROUTES.UPDATE_PROFILE;

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const navigate = useNavigate();

    const logout = useLogout();

    const handleLogout = useCallback(() => {
        logout();
    }, [logout])

    const handleEditProfileClick = useCallback(() => {
        navigate(updateProfileRoute);
    }, [navigate, updateProfileRoute])

    const settingsOptions = [
        'Apps and websites',
        'QR Code',
        'Notifications',
        'Settings and privacy',
        'Supervision',
        'Login Activity',
        'Log out',
    ];

    return (
        <>
            <div className="flex flex-row gap-3 sm:gap-16 flex-wrap sm:flex-nowrap">
                <div className="min-w-[80px]">
                    <ProfilePicture ProfilePictureUrl='https://plus.unsplash.com/premium_photo-1682089804117-cea5d901647f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGh1bWFufGVufDB8fDB8fHww' />
                </div>

                <div className="flex flex-col flex-1 gap-2 justify-center">

                    <div className='flex flex-col md:flex-row gap-3 lg:gap-8'>
                        <h2 className="text-lg sm:text-xl font-semibold">het_pandya</h2>

                        <div className="flex  flex-wrap gap-3 lg:gap-6">
                            <button onClick={handleEditProfileClick} className="bg-gray-100 hover:bg-gray-200 text-sm px-2 sm:px-4 py-1 rounded-md font-medium">
                                <span className="block sm:hidden flex items-center gap-2"><Pencil size={16} /> Profile </span>
                                <span className="hidden sm:block">Edit Profile</span>
                            </button>
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
                        <span><strong>52</strong> posts</span>
                        <span><strong>10k</strong> followers</span>
                        <span><strong>200</strong> following</span>
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
                            <button onClick={() => setIsSettingsOpen(false)} className="text-sm text-gray-500 hover:text-black">
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

}

export default ProfileHeader;