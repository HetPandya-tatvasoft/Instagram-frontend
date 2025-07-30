import MainLayout from "../../../layouts/MainLayout";
import HomePageStories from "../components/HomePageStories";
import PostCard from "../components/PostCard";
import { useHomeFeed } from "../hooks/useHomeFeedPosts";
import type { IPostResponse } from "../types/home.types";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HubConnectionState } from "@microsoft/signalr";
import { createPostHubConnection } from "../../../utils/signalR.utils";
import { useHomeStories } from "../hooks/useHomeStories";
import { HubMessages } from "../../../common/constants/keys";

const HomePage: React.FC = () => {
  const {
    data: followingStories,
    isLoading,
    isError,
    error,
    refetch,
  } = useHomeStories();

  console.log(followingStories);

  const { data: paginatedPosts } = useHomeFeed();

  const queryClient = useQueryClient();

  useEffect(() => {
    const connection = createPostHubConnection();

    const startConnection = async () => {
      if (connection.state === HubConnectionState.Disconnected) {
        try {
          await connection.start();
          console.log("Signal Home connected");
        } catch (err) {
          console.error("Signal R error:", err, "Signal home error");
        }
      }

      // Change this to constants
      connection.on(HubMessages.postReceived, () => {
        console.log("ReceivedPosts triggered");
        queryClient.invalidateQueries({ queryKey: ["home-feed"] });
      });

      connection.on(HubMessages.postInteraction, (postId: number) => {
        console.log("PostInteraction for:", postId);
        queryClient.invalidateQueries({ queryKey: ["home-feed"] });
      });
    };

    startConnection();

    return () => {
      connection.off(HubMessages.postReceived);
      connection.off(HubMessages.postInteraction);
    };
  }, [queryClient]);

  return (
    <>
      <MainLayout>
        <div className="h-screen overflow-y-scroll scrollbar-hidden">
          {/* Home Page Stories Section */}
          {followingStories?.data && (
            <HomePageStories stories={followingStories.data.records} />
          )}

          {/* Home Page Pages */}
          <div className="w-full flex justify-center px-2 sm:px-4">
            <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl space-y-4">
              {paginatedPosts?.data.records.map((post: IPostResponse) => (
                <PostCard key={post.postId} post={post} />
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
