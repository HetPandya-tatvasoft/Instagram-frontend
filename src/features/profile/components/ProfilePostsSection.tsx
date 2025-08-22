import { useCallback, useState } from "react";
import { IUserMedia } from "../types/profile.types";
import ProfilePostCard from "./ProfilePostCard";
import { usePostLike } from "../../home/hooks/usePostLike";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../common/constants/routes";
import { IProfilePostsProps } from "../types/props.types";

const ProfilePostsSection: React.FC<IProfilePostsProps> = ({ posts }) => {
  const [activeTab, setActiveTab] = useState("posts");

  const navigate = useNavigate();

  const { likePost } = usePostLike();

  const handleLikeClick = useCallback(
    (postId: number) => {
      likePost(postId);
    },
    [likePost]
  );

  const handlePostDetailsNavigation = useCallback(
    (postId: number) => {
      const route = routes.mainRoutes.postDetails.replace(
        ":postId",
        postId.toString()
      );
      navigate(route);
    },
    [navigate]
  );

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
        {posts?.userPosts?.map((post) => (
          <ProfilePostCard
            key={post.postId}
            post={post}
            handleLikeClick={handleLikeClick}
            handlePostDetailsNavigation={handlePostDetailsNavigation}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePostsSection;
