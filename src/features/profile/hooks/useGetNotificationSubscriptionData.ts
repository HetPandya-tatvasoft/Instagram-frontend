import { useQueries } from "@tanstack/react-query";
import {
  getUserLikeNotificationSubscription,
  getUserStoryNotificationSubscription,
} from "../profileService";

export const useGetNotificationSubscriptionData = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["story-notification-subscription"],
        queryFn: () => getUserStoryNotificationSubscription(),
      },
      {
        queryKey: ["like-notification-subscription"],
        queryFn: () => getUserLikeNotificationSubscription(),
      },
    ],
  });

  return results;
};
