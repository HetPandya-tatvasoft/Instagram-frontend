import { useState } from "react";
import { useUnfollowUser } from "../hooks/useUnfollowUser";
import { useSendFollowRequest } from "../hooks/useSendFollowRequest";
import { FollowStatus } from "../../../common/enums/followStatus.enum";

interface ConnectionBtnProps {
  userId: number;
  followStatus: string;
}

const ConnectionButton: React.FC<ConnectionBtnProps> = ({
  userId,
  followStatus,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const {
    unfollow,
    isLoading: isLoadingUnfollow,
    error: errorUnfollow,
  } = useUnfollowUser();

  const {
    follow,
    isLoading: isLoadingFollowRequest,
    error: errorFollow,
  } = useSendFollowRequest();

  const handleToggleFollow = (userId: number, followStatus: string) => {
    if (followStatus == FollowStatus.follow) {
      follow(userId);
    } else if (followStatus == FollowStatus.following) {
      unfollow(userId);
    }
    setIsFollowing((prev) => !prev);
    // Call your follow/unfollow API here
  };

  return (
    <button
      onClick={() => handleToggleFollow(userId, followStatus)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`px-4 py-1 rounded-md font-medium text-sm transition-all duration-200 
        ${
          isFollowing
            ? "bg-gray-200 text-black"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
    >
        {followStatus}
      {/* {followStatus == "Follow"
        ? followStatus
        : isHovered
        ? "Unfollow"
        : "Following"} */}
      {/* {isFollowing ? (isHovered ? "Unfollow" : "Following") : "Follow"} */}
    </button>
  );
};

export default ConnectionButton;
