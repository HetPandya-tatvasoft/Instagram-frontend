import MainLayout from "../../../layouts/MainLayout";
import HomePageStories from "../components/HomePageStories";
import PostCard from "../components/PostCard";
import { useHomeFeed } from "../hooks/useHomeFeedPosts";
import type { PostResponse } from "../types/home.types";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HubConnectionState } from "@microsoft/signalr";
import { createPostHubConnection } from "../../../utils/signalR.utils";

const HomePage: React.FC = () => {
  console.log("HomePage mounted");

  const { data: paginatedPosts, isLoading, error } = useHomeFeed();

  console.log(paginatedPosts);

  const queryClient = useQueryClient();

  useEffect(() => {
    const connection = createPostHubConnection();

    const startConnection = async () => {
      if (connection.state === HubConnectionState.Disconnected) {
        try {
          await connection.start();
          console.log("Signal R connected");
        } catch (err) {
          console.error("Signal R error:", err);
        }
      }

      connection.on("ReceivedPosts", () => {
        console.log("📨 ReceivedPosts triggered");
        queryClient.invalidateQueries({ queryKey: ["home-feed"] });
      });

      connection.on("PostInteraction", (postId: number) => {
        console.log("🔁 PostInteraction for:", postId);
        queryClient.invalidateQueries({ queryKey: ["home-feed"] });
      });
    };

    startConnection();

    return () => {
      connection.off("ReceivedPosts");
      connection.off("PostInteraction");
    };
  }, [queryClient]);

  return (
    <>
      <MainLayout>
        <div className="h-screen overflow-y-scroll scrollbar-hidden">
          {/* Home Page Stories Section */}
          <HomePageStories />

          {/* Home Page Stories */}
          <div className="max-w-2xl w-full flex justify-center">
            <div className="space-y-4">
              {paginatedPosts?.data.records.map((post: PostResponse) => (
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
