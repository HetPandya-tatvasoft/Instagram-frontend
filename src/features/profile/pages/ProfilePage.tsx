import React, { useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { Settings, Pencil, Plus, Heart, MessageCircle } from 'lucide-react';
import useLogout from '../../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const navigate = useNavigate();

    const logout = useLogout();

    const settingsOptions = [
        'Apps and websites',
        'QR Code',
        'Notifications',
        'Settings and privacy',
        'Supervision',
        'Login Activity',
        'Log out',
    ];

    const [activeTab, setActiveTab] = useState('posts');

    const stories = [
        { id: 1, title: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop' },
        { id: 2, title: 'Travel', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop' },
        { id: 3, title: 'Nature', image: 'https://images.unsplash.com/photo-1620842493821-720e48a67852?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGh1bWFuJTIwYmVpbmd8ZW58MHx8MHx8fDA%3D' },
        { id: 4, title: 'Tandreams', image: 'https://plus.unsplash.com/premium_photo-1669842504837-ac6c1bad2bcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGh1bWFufGVufDB8fDB8fHwwhttps://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop' },
    ];

    const posts = [
        { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop', likes: 234, comments: 12 },
        { id: 2, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop', likes: 567, comments: 23 },
        { id: 3, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop', likes: 890, comments: 45 },
        { id: 4, image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=300&fit=crop', likes: 123, comments: 8 },
        { id: 5, image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop', likes: 456, comments: 34 },
        { id: 6, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop', likes: 789, comments: 56 },
    ];

    const tabs = ['posts', 'reels', 'tagged'];

    const handleLogout = () => {
        logout();
    }

    return (
        <MainLayout>
            {/* <h2>This will be the main profile page</h2> */}
            <div className='main-profile-container sm:max-w-2xl lg:max-w-6xl mx-auto h-screen  overflow-y-scroll scrollbar-hidden'>
                <div className='flex justify-center '>
                    <div className="sm:px-4 py-6 w-full">
                        {/* Top Section: Profile Image + Info */}
                        <div className="flex flex-row gap-3 sm:gap-16 flex-wrap sm:flex-nowrap">

                            {/* Profile Image */}
                            <div className="min-w-[80px]">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1682089804117-cea5d901647f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGh1bWFufGVufDB8fDB8fHww"
                                    alt="Profile"
                                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full object-cover"
                                />
                            </div>

                            {/* Right side content */}
                            <div className="flex flex-col flex-1 gap-2 justify-center">

                                <div className='flex flex-col md:flex-row gap-3 lg:gap-8'>
                                    {/* Username */}
                                    <h2 className="text-lg sm:text-xl font-semibold">het_pandya</h2>

                                    {/* Buttons */}
                                    <div className="flex  flex-wrap gap-3 lg:gap-6">
                                        <button className="bg-gray-100 hover:bg-gray-200 text-sm px-2 sm:px-4 py-1 rounded-md font-medium">
                                            <span className="block sm:hidden flex items-center gap-2"><Pencil size={16} /> Profile </span> {/* Visible below `sm` screens */}
                                            <span className="hidden sm:block">Edit Profile</span> {/* Visible above `sm` screens */}
                                        </button>
                                        <button className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-1 rounded-md font-medium">
                                            Archive
                                        </button>
                                        {/* Settings Button */}
                                        <button
                                            onClick={() => setIsSettingsOpen(true)}
                                            className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-1 rounded-md font-medium"
                                        >
                                            <Settings />
                                        </button>
                                    </div>
                                </div>
                                {/* Stats */}
                                <div className="flex gap-4 text-sm sm:text-base">
                                    <span><strong>52</strong> posts</span>
                                    <span><strong>10k</strong> followers</span>
                                    <span><strong>200</strong> following</span>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="mt-4 text-sm">
                            <p className="font-semibold">Het Pandya</p>
                            <p>Professional Procrastinator</p>
                            <p>Always working towards building a better life, Onto Next 💪.</p>
                        </div>

                        {/* Story Highlights */}
                        <div className="mt-6 w-[340px] sm:w-[480px] md:w-[680px] flex gap-6 px-1 overflow-x-auto scrollbar-hidden">
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <button className="flex justify-center items-center rounded-full w-16 h-16 border-2 border-dashed border-gray-300 cursor-pointer">
                                    <Plus size={36} color="#5e5e5e" absoluteStrokeWidth />
                                </button>
                                <span className="text-xs text-gray-600 truncate w-16 text-center">New</span>
                            </div>
                            {stories.map((story) => (
                                <div key={story.id} className="flex flex-col gap-2 justify-center items-center">
                                    <img src={story.image} alt={story.title} className="rounded-full w-16 h-16 border-gray-300 cursor-pointer object-cover" />
                                    <span className="text-xs text-gray-600 truncate w-16 text-center">{story.title}</span>
                                </div>
                            ))}
                        </div>

                        {/* Tab Navigation */}
                        <div className='border-t-2 border-gray-300 my-8'>
                            <div className="flex justify-center space-x-16" role="tablist">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        role="tab"
                                        aria-selected={activeTab === tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-3 px-1 border-t-2 font-medium text-sm ${activeTab === tab
                                            ? 'border-black text-black'
                                            : 'border-transparent text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {tab.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tabs Content */}
                        <div className='grid grid-cols-3 gap-5'>
                            {posts.map((post) => (
                                <div key={post.id}>
                                    <div className=' aspect-square relative group cursor-pointer'>
                                        <img src={post.image} alt={`Post ${post.id}`} className='w-full h-full object-cover' />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6">
                                            <div className='flex justify-center items-center'>
                                                <Heart size={28} fill='white' />
                                                <span className='font-semibold text-white'>{post.likes}</span>
                                            </div>
                                            <div className='flex justify-center items-center'>
                                                <MessageCircle size={28} fill='white' />
                                                <span className='font-semibold text-white'>{post.comments}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
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
            </div>
        </MainLayout >
    )
}

export default ProfilePage