import { useNavigate } from "react-router-dom";
import { useGetCollections } from "../../home/hooks/useGetCollections";
import { ICollectionResponse } from "../../home/types/home.types";
import { useCallback } from "react";
import { routes } from "../../../common/constants/routes";
import { Trash } from "lucide-react";
import { useDeleteCollection } from "../hooks/useDeleteCollection";

const CollectionsList = () => {
  const { data: userCollections } = useGetCollections();

  const { deleteCollection } = useDeleteCollection();

  const navigate = useNavigate();

  const navigateToCollectionPosts = useCallback(
    (collectionId: number) => {
      const route = routes.mainRoutes.collectionPosts.replace(
        ":collectionId",
        collectionId.toString()
      );
      navigate(route);
    },
    [navigate]
  );

  const deleteCollectionFunction = useCallback(
    (collectionId: number) => {
      deleteCollection(collectionId);
    },
    [deleteCollection]
  );

  return (
    <div className="mt-4">
      {userCollections?.data.records &&
        userCollections.data.records.map((collection: ICollectionResponse) => (
          <div
            key={collection.collectionId}
            className="cursor-pointer border mb-2 mx-2"
            onClick={() => navigateToCollectionPosts(collection.collectionId)}
          >
            <div className="w-full p-2">
              <div className="flex items-center justify-between px-2">
                <div>
                  <p className="font-medium">{collection.title}</p>
                  <p className="text-sm">
                    {collection.savedPostsCollection.length} posts
                  </p>
                </div>
                <div>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      deleteCollectionFunction(collection.collectionId)
                    }
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CollectionsList;
