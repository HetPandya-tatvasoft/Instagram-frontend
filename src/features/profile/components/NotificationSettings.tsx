import { useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import NotificationToggle from "./NotificationToggle";
import { useCallback, useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { NotificationType } from "../../../common/enums/notificationType.enum";
import { useGetNotificationSubscriptionData } from "../hooks/useGetNotificationSubscriptionData";
import { useSubscribeUpdateStoryNotification } from "../hooks/useSubscribeUpdateStoryNotification";
import { useSubscribeToLikeNotifications } from "../hooks/useSubscribeToLikeNotifications";

const NotificationSettings: React.FC = () => {
  const [
    storyNotificationSubscriptionStatus,
    likeNotificationSubscriptionStatus,
  ] = useGetNotificationSubscriptionData();

  const { mutate: updateStoryNotificationSubscription } =
    useSubscribeUpdateStoryNotification();

  const { mutate: updateLikeNotificationSubscription } =
    useSubscribeToLikeNotifications();

  console.log(
    `the story notification subscription for this user is ${storyNotificationSubscriptionStatus.data}`
  );

  console.log(
    `the like subscription for this belowed user is ${likeNotificationSubscriptionStatus.data}`
  );

  const navigate = useNavigate();

  const [settings, setSettings] = useState<Record<NotificationType, boolean>>({
    [NotificationType.follow]: false,
    [NotificationType.like]: false,
    [NotificationType.comment]: false,
    [NotificationType.story]: false,
    [NotificationType.mention]: false,
    [NotificationType.all]: false,
  });

  useEffect(() => {
    if (
      !storyNotificationSubscriptionStatus.isLoading &&
      !likeNotificationSubscriptionStatus.isLoading
    ) {
      setSettings((prev) => ({
        ...prev,
        [NotificationType.story]:
          storyNotificationSubscriptionStatus.data ?? false,
        [NotificationType.like]:
          likeNotificationSubscriptionStatus.data ?? false,
      }));
    }
  }, [
    storyNotificationSubscriptionStatus.data,
    likeNotificationSubscriptionStatus.data,
  ]);

  const handleToggle = useCallback(
    (type: NotificationType) => {
      setSettings((prev) => {
        const newValue = !prev[type];

        if (type === NotificationType.story) {
          updateStoryNotificationSubscription(newValue);
        } else if (type === NotificationType.like) {
          updateLikeNotificationSubscription(newValue);
        }

        return {
          ...prev,
          [type]: newValue,
        };
      });
    },
    [updateLikeNotificationSubscription, updateStoryNotificationSubscription]
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h2 className="px-8 py-6 text-2xl">Notification Settings</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-md mx-auto bg-white">
          <div className="px-4 py-6 space-y-4">
            {/* All Notifications */}
            <NotificationToggle
              icon={settings.All ? Bell : BellOff}
              title="All Notifications"
              description="Receive all app notifications"
              type={NotificationType.all}
              enabled={settings.All}
              handleToggle={handleToggle}
            />

            {/* Story Notifications */}
            <NotificationToggle
              icon={settings.Story ? Bell : BellOff}
              title="Story Notifications"
              description="Get notified when someone posts a story"
              type={NotificationType.story}
              enabled={settings.Story}
              handleToggle={handleToggle}
            />

            {/* Like Notifications */}
            <NotificationToggle
              icon={settings.Like ? Bell : BellOff}
              title="Like Notifications"
              description="Be notified when someone likes your post"
              type={NotificationType.like}
              enabled={settings.Like}
              handleToggle={handleToggle}
            />

            {/* Comment Notifications */}
            <NotificationToggle
              icon={settings.Comment ? Bell : BellOff}
              title="Comment Notifications"
              description="Get alerts when someone comments"
              type={NotificationType.comment}
              enabled={settings.Comment}
              handleToggle={handleToggle}
            />

            {/* Mention Notifications */}
            <NotificationToggle
              icon={settings.Mention ? Bell : BellOff}
              title="Mention Notifications"
              description="Know when someone mentions you"
              type={NotificationType.mention}
              enabled={settings.Mention}
              handleToggle={handleToggle}
            />

            {/* Follow Notifications */}
            <NotificationToggle
              icon={settings.Follow ? Bell : BellOff}
              title="Follow Notifications"
              description="Alerts when someone follows you"
              type={NotificationType.follow}
              enabled={settings.Follow}
              handleToggle={handleToggle}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotificationSettings;
