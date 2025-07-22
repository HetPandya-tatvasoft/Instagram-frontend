import type { NotificationResponse } from "../../../common/types/notificationResponse.type";
import MainLayout from "../../../layouts/MainLayout";
import {
  useGetNotifications,
  useGetNotificationsQuery,
} from "../hooks/useGetNotifications";
import { useAcceptRejectFollowRequest } from "../hooks/useAcceptRejectFollowRequest";
import { useEffect } from "react";
import NotificationCard from "../components/NotificationCard";
import { useQueryClient } from "@tanstack/react-query";

const NotificationsPage: React.FC = () => {
  // const { getNotifications, notifications, isLoading } = useGetNotifications();

  const { data: notifications, isLoading } = useGetNotificationsQuery();

  const { respondToFollowRequest } = useAcceptRejectFollowRequest();

  const queryClient = useQueryClient();

  const handleRespondToFollowRequest = (
    senderId: number,
    isAccepted: boolean
  ) => {
    respondToFollowRequest({ senderId, isAccepted });
    queryClient.invalidateQueries({ queryKey: ["notifications-list-forPage"]});
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-6 px-4">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : notifications?.data.records.length === 0 || !notifications ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.data.records.map((notification: NotificationResponse) =>
            notification ? (
              <NotificationCard
                key={notification.notificationId}
                notification={notification}
                onRespond={handleRespondToFollowRequest}
              />
            ) : null
          )
        )}
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
