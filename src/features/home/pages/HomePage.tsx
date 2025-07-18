import MainLayout from "../../../layouts/MainLayout";
import HomePageStories from "../components/HomePageStories";
import PostCard from "../components/PostCard";
import { useHomeFeed } from "../hooks/useHomeFeedPosts";
import type { User, Post } from "../types/home.types";
import type { PostResponse } from "../types/home.types";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HubConnectionState } from "@microsoft/signalr";
import { postHubConnection } from "../../../utils/signalR.utils";

const HomePage: React.FC = () => {
  console.log("HomePage mounted");

  const { data: paginatedPosts, isLoading, error } = useHomeFeed();

  console.log(paginatedPosts);

  const queryClient = useQueryClient();


    useEffect(() => {
      const startConnection = async () => {
        if (postHubConnection.state === HubConnectionState.Disconnected) {
          try {
            await postHubConnection.start();
            console.log("✅ Connected to SignalR Hub");
            console.log("✅ Connected to SignalR Hub");
            console.log("✅ Connected to SignalR Hub");
  
            postHubConnection.on("ReceivedPosts", () => {
              console.log("📨 ReceivedPosts event triggered from backend!");
              queryClient.invalidateQueries({ queryKey: ["home-feed"] });
            });
          } catch (error) {
            console.error("❌ Error connecting to hub: ", error);
          }
        } else {
          console.warn("⚠️ Hub already connected or connecting...");
        }
      };
  
      startConnection();
  
      return () => {
        postHubConnection.stop();
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
