import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

const ProfilePostsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const posts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      likes: 234,
      comments: 12,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
      likes: 567,
      comments: 23,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop",
      likes: 890,
      comments: 45,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=300&fit=crop",
      likes: 123,
      comments: 8,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
      likes: 456,
      comments: 34,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      likes: 789,
      comments: 56,
    },
  ];

  const tabs = ["posts", "reels", "tagged"];

  return (
    <div>
      <div className="border-t-2 border-gray-300 my-8">
        <div className="flex justify-center space-x-16" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-t-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="grid grid-cols-3 gap-5">
        {posts.map((post) => (
          <div key={post.id}>
            <div className=" aspect-square relative group cursor-pointer">
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6">
                <div className="flex justify-center items-center">
                  <Heart size={28} fill="white" />
                  <span className="font-semibold text-white">{post.likes}</span>
                </div>
                <div className="flex justify-center items-center">
                  <MessageCircle size={28} fill="white" />
                  <span className="font-semibold text-white">
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePostsSection;
