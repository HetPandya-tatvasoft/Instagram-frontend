import type { NotificationResponse } from "../../../common/types/notificationResponse.type";
import MainLayout from "../../../layouts/MainLayout";
import { useGetNotifications } from "../hooks/useGetNotifications";
import { useAcceptRejectFollowRequest } from "../hooks/useAcceptRejectFollowRequest";
import { useEffect } from "react";

const mockNotifications = [
  {
    notificationId: 1,
    fromUser: {
      username: "alex_23",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    timestamp: new Date().toISOString(),
  },
  {
    notificationId: 2,
    fromUser: {
      username: "jane_doe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
];

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
          <div className="flex flex-col gap-4">
            {notifications.map((notification: NotificationResponse) => (
              <div
                key={notification.notificationId}
                className="bg-white shadow rounded p-4 flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>{notification.senderUsername}</strong> sent you a
                    follow request.
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.sendDate).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleRespondToFollowRequest(notification.senderId, true)
                    }
                    type="button"
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleRespondToFollowRequest(notification.senderId, false)
                    }
                    type="button"
                    className="px-3 py-1 text-sm bg-gray-300 rounded"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
