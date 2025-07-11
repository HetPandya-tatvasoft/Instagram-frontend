import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Settings, Search, Home, Compass, PlaySquare, User, Plus, Menu } from 'lucide-react';
import instaLogo from "../assets/images/henstagram-logo.png";

interface MainLayoutProps {
    children : React.ReactNode,
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {

    const sidebarModules = [
        { icon: Home, label: 'Home', active: false },
        { icon: Search, label: 'Search', active: false },
        { icon: Compass, label: 'Explore', active: false },
        { icon: PlaySquare, label: 'Reels', active: false },
        { icon: MessageCircle, label: 'Messages', active: false },
        { icon: Heart, label: 'Notifications', active: false },
        { icon: Plus, label: 'Create', active: false },
        { icon: User, label: 'Profile', active: true },
    ];

    console.log("The main layout component get called")

    return (
        <>
            <div className="main-instagram-container h-screen bg-white flex">
                {/* Sidebar */}
                <div className="main-instagram-sidebar hidden md:flex w-24 lg:w-60 flex-col justify-between ps-4 border-r border-gray-200 p-4 h-full">
                    <div className="sidebar-top-instagram">
                        <div className="instagram-sidebar-heading mb-6 flex justify-center">
                            <img src={instaLogo} alt="Instagram" className=" h-8 lg:h-8" />
                        </div>

                        <nav className="space-y-2">
                            {sidebarModules.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all
                        ${item.active ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'}
                    `}
                                >
                                    <item.icon size={24} className={item.active ? 'text-black' : 'text-gray-700'} />
                                    <span className={`text-base ${item.active ? 'text-black' : 'text-gray-700'} hidden lg:inline`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Bottom Menu */}
                    <div className="siderbar-bottom-instagram">
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <Menu size={24} className="text-gray-700" />
                            <span className="text-base text-gray-700 hidden lg:inline">More</span>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Icon (optional) */}
                <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-300 flex justify-around py-2 z-10">
                    {sidebarModules.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex flex-col items-center justify-center">
                            <item.icon size={24} className="text-gray-700" />
                        </div>
                    ))}
                </div>

                {/* Main content */}
                <div className="flex-1">
                    {/* All the home pages, messages, profile, explore will be feeded here */}
                    {children}
                </div>
            </div>
        </>
    )
}

export default MainLayout