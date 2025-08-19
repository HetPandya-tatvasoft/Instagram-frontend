import { useState, useCallback } from "react";
import { useUnfollowUser } from "../hooks/useUnfollowUser";
import { useSendFollowRequest } from "../hooks/useSendFollowRequest";
import { followStatus as FollowStatus } from "../../../common/enums/followStatus.enum";
import { useQueryClient } from "@tanstack/react-query";
import { IConnectionBtnProps } from "../../posts/types/postProps.types";

const ConnectionButton: React.FC<IConnectionBtnProps> = ({
  userId,
  followStatus,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const queryClient = useQueryClient();

  queryClient.invalidateQueries({queryKey : ["follow-status"]})

  const { unfollow } = useUnfollowUser();

  const { follow } = useSendFollowRequest();

  const handleToggleFollow = useCallback(
    (userId: number, followStatus: string) => {
      if (
        followStatus == FollowStatus.follow ||
        followStatus == FollowStatus.followBack
      ) {
        follow(userId);
      } else if (followStatus == FollowStatus.following) {
        unfollow(userId);
      }
      setIsFollowing((prev) => !prev);
    },
    [follow, unfollow]
  );

  return (
    <button
      onClick={() => handleToggleFollow(userId, followStatus)}
      className={`px-4 py-1 rounded-md font-medium text-sm transition-all duration-200 
        ${
          isFollowing
            ? "bg-gray-200 text-black"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
    >
      {followStatus}
    </button>
  );
};

export default ConnectionButton;
