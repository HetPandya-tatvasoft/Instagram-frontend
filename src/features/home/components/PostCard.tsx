import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import { useState } from "react";
import type { User, PostResponse } from "../types/home.types";
import { usePostLike } from "../hooks/usePostLike";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import CommentModal from "../../posts/components/CommentModal";

interface PostCardProps {
  post: PostResponse;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    likePost,
    isLoading: isLoadingLikePost,
    error: errorLikePost,
  } = usePostLike();

  const mediaList = post.mediaUrls || [];

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? mediaList.length - 1 : prev - 1
    );
  };

  const decodedToken = getUserIdFromToken();

  const hasLiked =
    post.like?.some((like) => like.likedByUserId === decodedToken) ?? false;

  // Or here that % logic you can apply like the logic we applied on creating a post in the modal, see it afterwards
  // I think that will be more good
  // Also handle button things like last then no next and if first then no prev button should be visible
  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === mediaList.length - 1 ? 0 : prev + 1
    );
  };

  const currentMedia = mediaList[currentImageIndex];

  const handleLikeClick = (postId: number) => {
    console.log("Post to be liked is of id : ", postId);
    likePost(postId);
  };

  const postImageSrc =
    currentMedia?.mediaUrlBase64?.base64String &&
    currentMedia?.mediaUrlBase64?.mimeType
      ? `data:${currentMedia.mediaUrlBase64.mimeType};base64,${currentMedia.mediaUrlBase64.base64String}`
      : "/src/assets/images/default_profile.webp";

  let imgSrc = "/src/assets/images/default_profile.webp";

  if (
    post.postedByUserProfilePictureBase64 &&
    post.postedByUserProfilePictureBase64.base64String &&
    post.postedByUserProfilePictureBase64.mimeType
  ) {
    const mimeType =
      post.postedByUserProfilePictureBase64.mimeType ===
      "application/octet-stream"
        ? "image/jpeg"
        : post.postedByUserProfilePictureBase64.mimeType;

    imgSrc = `data:${mimeType};base64,${post.postedByUserProfilePictureBase64.base64String}`;
  }

  const [isLiked, setIsLiked] = useState();

  const [isSaved, setIsSaved] = useState();

  const [likes, setLikes] = useState();

  const [openCommentModal, setOpenCommentModal] = useState(false);

  const handleCommentBtnClick = () => {
    setOpenCommentModal((prev) => !prev);
  }

  const [showAllComments, setShowAllComments] = useState(false);

  const [newComment, setNewComment] = useState("");

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div>
            <img
              src={imgSrc}
              alt={` ${post.postedByUserName}'s profile picture.`}
              className="w-8 h-8 rounded-full object-cover  "
            />
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-medium text-sm">{post.postedByUserName}</span>
            <div className="w-4 h-4 bg-blue-500 flex items-center justify-center rounded-full">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
          <span className="text-gray-500 text-sm">• 2h</span>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative flex w-full justify-center ">
        <img
          src={postImageSrc}
          alt={`post.`}
          className="w-[500px] h-[360px] object-cover relative"
        />
        {mediaList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLikeClick(post.postId)}
              className={`p-1 hover:bg-gray-100 rounded-full space-x-1 ${
                hasLiked ? "text-red-500" : "text-black"
              }`}
            >
              <Heart
                size={24}
                fill={hasLiked ? "currentColor" : "none"}
                stroke={hasLiked ? "currentColor" : "black"} 
              />
            </button>

            <button onClick={() => handleCommentBtnClick()} className="p-1 hover:bg-gray-100 rounded-full">
              <MessageCircle size={24} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Send size={24} />
            </button>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-fill">
            <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Likes Section */}
        <div>
          <span className="font-medium text-sm">
            {post.like?.length ?? 0} likes
          </span>
        </div>

        {/* Caption */}
        <div>
          <span className="font-medium text-sm mr-2">het_pandya</span>
          <span className="text-sm">
            Wandering for life that's a grateful as well as an ungrateful hobby.{" "}
          </span>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="space-y-1 mb-2">
            {!showAllComments && post.comments.length > 2 && (
              <button
                onClick={() => setShowAllComments(true)}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                View all {post.comments.length} comments
              </button>
            )}

            {(showAllComments ? post.comments : post.comments.slice(0, 2)).map(
              (comment) => (
                <div key={comment.commentId}>
                  {/* Render your comment here */}
                  <span className="text-sm">
                    <strong>{comment.commentedByUserUsername}</strong>{" "}
                    {comment.content}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <CommentModal isOpen={openCommentModal} onClose={() => setOpenCommentModal(false)} post={post} />
    </div>
  );
};

export default PostCard;
