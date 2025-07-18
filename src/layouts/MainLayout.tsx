import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Settings,
  Search,
  Home,
  Compass,
  PlaySquare,
  User,
  Plus,
  Menu,
} from "lucide-react";
import instaLogo from "../assets/images/henstagram-logo.png";
import { ROUTES } from "../common/constants/routes";
import { Link } from "react-router-dom";
import CreatePostModal from "../common/components/CreatePostModal";
import SearchPanel from "../common/components/SearchPanel";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  console.log("MainLayout re-rendered");

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const [caption, setCaption] = useState("");

  const [showSearch, setShowSearch] = useState(false);

  const handlePost = () => {
    if (files.length === 0) return;
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    formData.append("caption", caption);
    // formData.append("image", file);
    console.log("Post Submitted", formData);

    // TODO: Submit with mutation here
    // closeModal();
    setFiles([]);
    setCaption("");
  };

  // if (!isModalOpen) return null;

  const sidebarModules = [
    {
      icon: Home,
      label: "Home",
      active: false,
      linkTo: ROUTES.MAIN_ROUTES.HOME,
      shouldCreatePostModalOpen: false,
    },
    {
      icon: Search,
      label: "Search",
      active: false,
      linkTo: "",
      shouldCreatePostModalOpen: false,
      shouldSearchSidebarOpen: true,
    },
    {
      icon: Compass,
      label: "Explore",
      active: false,
      linkTo: "",
      shouldCreatePostModalOpen: false,
      shouldSearchSidebarOpen: false,
    },
    {
      icon: PlaySquare,
      label: "Reels",
      active: false,
      linkTo: "",
      shouldCreatePostModalOpen: false,
      shouldSearchSidebarOpen: false,
    },
    {
      icon: MessageCircle,
      label: "Messages",
      active: false,
      linkTo: "",
      shouldCreatePostModalOpen: false,
      shouldSearchSidebarOpen: false,
    },
    {
      icon: Heart,
      label: "Notifications",
      active: false,
      linkTo: ROUTES.MAIN_ROUTES.notifications,
      shouldCreatePostModalOpen: false,
      shouldSearchSidebarOpen: false,
    },
    {
      icon: Plus,
      label: "Create",
      active: false,
      linkTo: "",
      shouldCreatePostModalOpen: true,
      shouldSearchSidebarOpen: false,
    },
    {
      icon: User,
      label: "Profile",
      active: true,
      linkTo: ROUTES.MAIN_ROUTES.PROFILE,
      shouldCreatePostModalOpen: false,
      shouldSearchSidebarOpen: false,
    },
  ];

  const handleCreatePostButtonClick = () => {
    setIsCreatePostModalOpen((prev) => !prev);
  };

  console.log("The main layout component get called");

  return (
    <>
      <div className="main-instagram-container h-screen bg-white flex">
        {/* Sidebar */}
        <div className="main-instagram-sidebar hidden md:flex w-24 lg:w-60 flex-col justify-between ps-4 border-r border-gray-200 p-4 h-full">
          <div className="sidebar-top-instagram">
            <div className="instagram-sidebar-heading mb-6 flex justify-center">
              <img src={instaLogo} alt="Instagram" className=" h-4 lg:h-8" />
            </div>

            <nav className="space-y-2">
              {sidebarModules.map((item, index) => {
                if (item.shouldSearchSidebarOpen) {
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setShowSearch(true)}
                      className={`flex items-center space-x-3 p-3 w-full text-left rounded-lg cursor-pointer transition-all
          ${item.active ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}
        `}
                    >
                      <item.icon
                        size={24}
                        className={item.active ? "text-black" : "text-gray-700"}
                      />
                      <span
                        className={`text-base ${
                          item.active ? "text-black" : "text-gray-700"
                        } hidden lg:inline`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                }

                return item.shouldCreatePostModalOpen ? (
                  <button
                    key={index}
                    onClick={handleCreatePostButtonClick}
                    className={`flex items-center space-x-3 p-3 w-full text-left rounded-lg cursor-pointer transition-all
        ${item.active ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}
      `}
                  >
                    <item.icon
                      size={24}
                      className={item.active ? "text-black" : "text-gray-700"}
                    />
                    <span
                      className={`text-base ${
                        item.active ? "text-black" : "text-gray-700"
                      } hidden lg:inline`}
                    >
                      {item.label}
                    </span>
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.linkTo}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all
        ${item.active ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}
      `}
                  >
                    <item.icon
                      size={24}
                      className={item.active ? "text-black" : "text-gray-700"}
                    />
                    <span
                      className={`text-base ${
                        item.active ? "text-black" : "text-gray-700"
                      } hidden lg:inline`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Menu */}
          <div className="siderbar-bottom-instagram">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Menu size={24} className="text-gray-700" />
              <span className="text-base text-gray-700 hidden lg:inline">
                More
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Menu Icon (optional) */}
        <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-300 flex justify-around py-2 z-10">
          {sidebarModules.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
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

      {/* Create Post Modal */}
      {/* {
                isCreatePostModalOpen &&
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
                    <div className="bg-white rounded-xl w-full max-w-md mx-4 overflow-hidden">
                        <div className="border-b px-4 py-3 text-center font-semibold">
                            Create New Post
                        </div>

                        {!file ? (
                            <div className="p-6 text-center">
                                <label className="cursor-pointer block">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                    <div className="border border-dashed border-gray-400 p-10 rounded-lg">
                                        <p className="text-gray-600">Click to upload image</p>
                                    </div>
                                </label>
                            </div>
                        ) : (
                            <div className="p-4">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                    className="w-full h-64 object-cover rounded"
                                />
                                <textarea
                                    placeholder="Write a caption..."
                                    className="w-full mt-3 p-2 border rounded focus:outline-none"
                                    rows={3}
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                ></textarea>

                                <div className="mt-4 flex justify-between">
                                    <button
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handlePost}
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Share
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            } */}
      <SearchPanel isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        handlePost={handlePost}
      />
    </>
  );
};

export default MainLayout;
