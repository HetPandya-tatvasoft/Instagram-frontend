import { Heart, MessageCircle } from "lucide-react";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import type { PostResponse } from "../../home/types/home.types";
import type { PostLike } from "../../home/types/home.types";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { usePostLike } from "../../home/hooks/usePostLike";
import { useCallback } from "react";

interface ProfilePostCardProps {
  post: PostResponse;
  handleLikeClick: (postId: number) => void;
  handlePostDetailsNavigation: (postId: number) => void;
}

const ProfilePostCard: React.FC<ProfilePostCardProps> = ({
  post,
  handleLikeClick,
  handlePostDetailsNavigation,
}) => {
  const loggedInUserId = getUserIdFromToken();

  const { likePost } = usePostLike();

  const hasUserLiked = post.like?.some(
    (like: PostLike) => like.likedByUserId === loggedInUserId
  );

  //   const handleLikeClick = useCallback(() => {
  //     likePost(post.postId);
  //   }, [likePost, post.postId]);

  return (
    <div
      key={post.postId}
      onClick={() => handlePostDetailsNavigation(post.postId)}
    >
      <div className=" aspect-square relative group cursor-pointer">
        <img
          src={getBase64ImageUrl(post.mediaUrls[0].mediaUrlBase64)}
          alt={`Post ${post.postId}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6">
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); 
                handleLikeClick(post.postId);
              }}
            >
              <Heart size={28} fill={hasUserLiked ? "red" : "white"} />
            </button>
            <span className="font-semibold text-white">
              {post.like?.length}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <MessageCircle size={28} fill="white" />
            <span className="font-semibold text-white">
              {post.comments?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;
