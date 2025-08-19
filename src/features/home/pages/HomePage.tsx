import MainLayout from "../../../layouts/MainLayout";
import HomePageStories from "../components/HomePageStories";
import PostCard from "../components/PostCard";
import { useHomeFeed } from "../hooks/useHomeFeedPosts";
import type { IPostResponse } from "../types/home.types";
import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HubConnectionState } from "@microsoft/signalr";
import { createPostHubConnection } from "../../../utils/signalR.utils";
import { useHomeStories } from "../hooks/useHomeStories";
import { HubMessages } from "../../../common/constants/keys";
import toast from "react-hot-toast";
import { useGetHomeFeedInfinite } from "../hooks/useGetHomeFeedInfinite";
import { ArrowDown } from "lucide-react";

const HomePage: React.FC = () => {
  const {
    data: followingStories,
    isLoading,
    isError,
    error,
    refetch,
  } = useHomeStories();

  // const { data: paginatedPosts } = useHomeFeed();

  const {
    data: paginatedPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetHomeFeedInfinite();

  // console.log("Hello het this is the data you need : ");
  console.log(paginatedPosts?.pages);
  // const posts = paginatedPosts?.pages.flatMap((page) => page.data.records) ?? [];
  const posts = useMemo(
    () => paginatedPosts?.pages.flatMap((page) => page.data.records) ?? [],
    [paginatedPosts?.pages]
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    const connection = createPostHubConnection();

    const startConnection = async () => {
      if (connection.state === HubConnectionState.Disconnected) {
        try {
          await connection.start();
        } catch (err) {
          console.error("Signal R error:", err, "Signal home error");
        }
      }

      // Change this to constants
      connection.on(HubMessages.postReceived, () => {
        toast.success("Signal R Post Received");
        queryClient.invalidateQueries({ queryKey: ["home-feed"] });
      });

      connection.on(HubMessages.postInteraction, (postId: number) => {
        toast.success("Signal R Interaction Received");
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
              {posts?.map((post: IPostResponse) => (
                <PostCard key={post.postId} post={post} />
              ))}
              {hasNextPage && (
                <div className="w-full flex justify-center my-6">
                  <button
                    className="flex flex-col border rounded px-4"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    <span>
                      {isFetchingNextPage ? "Loading..." : "Load More"}
                    </span>
                    <div className="flex justify-center">
                      <ArrowDown />
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
