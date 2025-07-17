import MainLayout from "../../../layouts/MainLayout";
import HomePageStories from "../components/HomePageStories";
import PostCard from "../components/PostCard";
import { useHomeFeed } from "../hooks/useHomeFeedPosts";
import type { User, Post } from "../types/home.types";
import type { PostResponse } from "../types/home.types";

const HomePage: React.FC = () => {
  const mockPosts: Post[] = [
    {
      id: "1",
      user: {
        id: "2",
        username: "travel_vibes",
        profilePicture:
          "https://images.unsplash.com/photo-1706447022157-5db1b0da7d10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
        isVerified: true,
      },
      image:
        "https://images.unsplash.com/photo-1706447022157-5db1b0da7d10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
      caption: "Amazing sunset at the beach! 🌅 #travel #sunset #beach",
      likes: 1234,
      comments: [
        {
          id: "1",
          user: {
            id: "3",
            username: "food_lover",
            profilePicture:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          },
          text: "Absolutely stunning! 😍",
          timestamp: "2h",
        },
        {
          id: "2",
          user: {
            id: "4",
            username: "nature_shots",
            profilePicture:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          },
          text: "Where is this place?",
          timestamp: "1h",
        },
      ],
      timestamp: "3h",
      isLiked: false,
      isSaved: false,
    },
    {
      id: "2",
      user: {
        id: "3",
        username: "food_lover",
        profilePicture:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      image:
        "https://plus.unsplash.com/premium_photo-1678112180593-4da6ed5c9625?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM3fHx1cmx8ZW58MHx8MHx8fDA%3D",
      caption:
        "Homemade pasta for dinner tonight! 🍝 #cooking #homemade #pasta",
      likes: 856,
      comments: [
        {
          id: "3",
          user: {
            id: "2",
            username: "travel_vibes",
            profilePicture:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          },
          text: "Recipe please! 🙏",
          timestamp: "30m",
        },
      ],
      timestamp: "5h",
      isLiked: true,
      isSaved: true,
    },
    {
      id: "3",
      user: {
        id: "5",
        username: "city_lights",
        profilePicture:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      },
      image:
        "https://images.unsplash.com/photo-1519601373797-1f3df54d60b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjU5fHx1cmx8ZW58MHx8MHx8fDA%3D",
      caption: "Late night city walk 🚶‍♂️ #citylife #nightvibes",
      likes: 432,
      comments: [],
      timestamp: "6h",
      isLiked: false,
      isSaved: false,
    },
    {
      id: "4",
      user: {
        id: "6",
        username: "mountain_explorer",
        profilePicture:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
      },
      image:
        "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&auto=format&fit=crop",
      caption: "Conquered the peak today! 🏔️💪 #mountains #hiking",
      likes: 1001,
      comments: [
        {
          id: "4",
          user: {
            id: "7",
            username: "adventure_girl",
            profilePicture:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
          },
          text: "Respect! Looks awesome 😍",
          timestamp: "1h",
        },
      ],
      timestamp: "9h",
      isLiked: true,
      isSaved: false,
    },
    {
      id: "5",
      user: {
        id: "8",
        username: "coffee_addict",
        profilePicture:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
      },
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop",
      caption: "Best way to start the day ☕ #coffee #morningroutine",
      likes: 678,
      comments: [],
      timestamp: "12h",
      isLiked: false,
      isSaved: true,
    },
    {
      id: "6",
      user: {
        id: "9",
        username: "bookworm_life",
        profilePicture:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      },
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop",
      caption: "Lost in a good book 📖 #reading #relaxing",
      likes: 311,
      comments: [
        {
          id: "5",
          user: {
            id: "8",
            username: "coffee_addict",
            profilePicture:
              "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
          },
          text: "That looks cozy!",
          timestamp: "15m",
        },
      ],
      timestamp: "15h",
      isLiked: true,
      isSaved: true,
    },
  ];

  console.log("HomePage mounted");

  const { data: paginatedPosts, isLoading, error } = useHomeFeed();

  console.log(paginatedPosts);

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
