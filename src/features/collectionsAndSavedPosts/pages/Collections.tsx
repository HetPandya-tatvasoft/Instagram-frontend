import { useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import { useGetCollections } from "../../home/hooks/useGetCollections";
import { ICollectionResponse } from "../../home/types/home.types";
import { useCallback } from "react";
import { routes } from "../../../common/constants/routes";

const CollectionsList = () => {
  const { data: userCollections } = useGetCollections();

  const navigate = useNavigate();

  console.log(userCollections?.data.records);

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

  return (
    <MainLayout>
      <div className="mt-4">
        {userCollections?.data.records &&
          userCollections.data.records.map(
            (collection: ICollectionResponse) => (
              <div
                key={collection.collectionId}
                className="cursor-pointer border mb-2 mx-2"
                onClick={() =>
                  navigateToCollectionPosts(collection.collectionId)
                }
              >
                {/* <img
              src={collection.title}
              alt={collection.title}
              className="w-full h-40 object-cover rounded-md"
            /> */}
                <div className="w-full p-2">
                  <p className="font-medium">{collection.title}</p>
                  <p className="text-sm">
                    {collection.savedPostsCollection.length} posts
                  </p>
                </div>
              </div>
            )
          )}
      </div>
    </MainLayout>
  );
};

export default CollectionsList;
