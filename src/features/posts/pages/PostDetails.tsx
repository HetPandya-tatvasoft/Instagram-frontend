import { useParams } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import { useFetchPost } from "../hooks/useFetchPost";
import PostCard from "../../home/components/PostCard";

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const { post, isLoading, isError } = useFetchPost(Number(postId));

  if (isLoading) return <div>Loading...</div>;
  
  if (isError || !post) return <div>Error loading post</div>;

  return (
    <MainLayout>
      <div className="w-full flex justify-center">
        <div className="md:w-2xl lg:w-3xl mt-12">
          <PostCard post={post} />
        </div>
      </div>
    </MainLayout>
  );
};

export default PostDetails;
