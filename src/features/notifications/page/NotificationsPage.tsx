import type { NotificationResponse } from "../../../common/types/notificationResponse.type";
import MainLayout from "../../../layouts/MainLayout";
import { useGetNotifications } from "../hooks/useGetNotifications";
import { useAcceptRejectFollowRequest } from "../hooks/useAcceptRejectFollowRequest";
import { useEffect } from "react";
import NotificationCard from "../components/NotificationCard";

const NotificationsPage: React.FC = () => {
  // const notifications = mockNotifications;
  // const isLoading = false;

  const { getNotifications, notifications, isLoading, error } =
    useGetNotifications();

  const {
    respondToFollowRequest,
    isLoading: respondToFollowRequestLoading,
    error: respondToFollowRequestError,
  } = useAcceptRejectFollowRequest();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const handleRespondToFollowRequest = (
    senderId: number,
    isAccepted: boolean
  ) => {
    respondToFollowRequest({ senderId, isAccepted });
  };

  console.log(notifications);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-6 px-4">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : notifications?.length === 0 || !notifications ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.map((notification: NotificationResponse) =>
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
