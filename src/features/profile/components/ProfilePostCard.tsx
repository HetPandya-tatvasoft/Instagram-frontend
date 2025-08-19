import { Heart, MessageCircle, Trash } from "lucide-react";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import type { IPostLike } from "../../home/types/home.types";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { useCallback, useMemo, useState } from "react";
import { IProfilePostCardProps } from "../types/props.types";
import { useDeletePost } from "../../posts/hooks/useDeletePost";
import { DeleteConfirmationModal } from "../../../common/components/DeleteConfirmationModel";
import { deleteItemEnum } from "../../../common/enums/deleteItem.enum";

const ProfilePostCard: React.FC<IProfilePostCardProps> = ({
  post,
  handleLikeClick,
  handlePostDetailsNavigation,
}) => {
  const loggedInUserId = getUserIdFromToken();

  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const { deletePost } = useDeletePost();

  const hasUserLiked = useMemo(() => {
    return (
      post.like?.some(
        (like: IPostLike) => like.likedByUserId === loggedInUserId
      ) ?? false
    );
  }, [post.like, loggedInUserId]);

  const handleCloseDeleteConfirmationModal = useCallback(() => {
    setOpenDeleteConfirmationModal(false);
  }, []);

  const handleDeletePost = useCallback((postId: number) => {
    // deletePost(postId);
    setOpenDeleteConfirmationModal(true);
  }, []);

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
          <div className="flex justify-center items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteConfirmationModal(true);
              }}
            >
              <Trash size={28} stroke="red" fill="white" />
            </button>
          </div>
        </div>
      </div>

      {openDeleteConfirmationModal && (
        <DeleteConfirmationModal
          onClose={handleCloseDeleteConfirmationModal}
          id={post.postId}
          deleteItem={deleteItemEnum.deletePost}
        />
      )}
    </div>
  );
};

export default ProfilePostCard;
