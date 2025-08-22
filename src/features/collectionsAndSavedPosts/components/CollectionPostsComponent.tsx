import { useNavigate, useParams } from "react-router-dom";
import { useGetCollectionDetails } from "../hooks/useGetCollectionDetails";
import { IPostResponse } from "../../home/types/home.types";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { useCallback, useMemo } from "react";
import { routes } from "../../../common/constants/routes";
import { X } from "lucide-react";
import { useRemovePostFromCollection } from "../../home/hooks/useRemovePostFromCollection";

const CollectionPostsComponent = () => {
  const { collectionId } = useParams();

  const navigate = useNavigate();

  const { data: collectionDetails } = useGetCollectionDetails(
    parseInt(collectionId ?? "0")
  );

  const { removePostsFromCollection } = useRemovePostFromCollection();

  const posts = useMemo(() => {
    return collectionDetails?.data.records?.[0]?.savedPostsCollection ?? [];
  }, [collectionDetails]);

  const handlePostDetailsNavigation = useCallback(
    (postId: number) => {
      const route = routes.mainRoutes.postDetails.replace(
        ":postId",
        postId.toString()
      );
      navigate(route);
    },
    [navigate]
  );

  const handleRemovePostsFromCollection = useCallback(
    (postId: number) => {
      const removePostFromCollectionPayload = {
        postId: [postId],
        collectionId: Number(collectionId),
      };

      removePostsFromCollection(removePostFromCollectionPayload);
    },
    [removePostsFromCollection, collectionId]
  );

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mb-6">
        {collectionDetails?.data.records?.[0]?.title || "Collection"}
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {posts.map((post: IPostResponse) => (
          <div
            key={post.postId}
            className="relative group aspect-square overflow-hidden cursor-pointer"
            onClick={() => handlePostDetailsNavigation(post.postId)}
          >
            <img
              src={getBase64ImageUrl(post.mediaUrls[0].mediaUrlBase64)}
              alt={post.caption || ""}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
              <p className="text-white text-sm font-semibold">
                {post.postedByUserName}
              </p>
              <button
                className="cursor-pointer"
                onClick={() => handleRemovePostsFromCollection(post.postId)}
              >
                <X />
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg">No posts saved in this collection yet.</p>
        </div>
      )}
    </div>
  );
};

export default CollectionPostsComponent;
