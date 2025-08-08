import React, { useState } from "react";
import {
  Bell,
  BellOff,
  Image,
  Heart,
  MessageCircle,
  UserPlus,
  Camera,
} from "lucide-react";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    all: true,
    stories: true,
    likes: true,
    comments: true,
    follows: true,
    posts: true,
  });

  const handleToggle = (type) => {
    if (type === "all") {
      const newValue = !notifications.all;
      setNotifications({
        all: newValue,
        stories: newValue,
        likes: newValue,
        comments: newValue,
        follows: newValue,
        posts: newValue,
      });
    } else {
      const newNotifications = {
        ...notifications,
        [type]: !notifications[type],
      };

      // Check if all individual notifications are enabled
      const individualNotifications = [
        "stories",
        "likes",
        "comments",
        "follows",
        "posts",
      ];
      const allEnabled = individualNotifications.every(
        (key) => newNotifications[key]
      );

      newNotifications.all = allEnabled;
      setNotifications(newNotifications);
    }
  };

  const NotificationToggle = ({
    icon: Icon,
    title,
    description,
    type,
    enabled,
  }) => (
    <div className="flex items-center justify-between py-4 px-1">
      <div className="flex items-start space-x-3 flex-1">
        <div className="p-2 bg-gray-100 rounded-full">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      <button
        onClick={() => handleToggle(type)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
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
            <h1 className="text-lg font-semibold text-gray-900">
              Notifications
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto bg-white">
        <div className="px-4 py-6">
          {/* Main Toggle */}
          <div className="mb-8">
            <NotificationToggle
              icon={notifications.all ? Bell : BellOff}
              title="All Notifications"
              description="Receive all app notifications"
              type="all"
              enabled={notifications.all}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* Individual Settings */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
              Notification Types
            </h2>

            <NotificationToggle
              icon={Camera}
              title="Story Notifications"
              description="Get notified when people you follow post stories"
              type="stories"
              enabled={notifications.stories}
            />

            <NotificationToggle
              icon={Heart}
              title="Likes"
              description="Someone liked your post or story"
              type="likes"
              enabled={notifications.likes}
            />

            <NotificationToggle
              icon={MessageCircle}
              title="Comments"
              description="Someone commented on your post"
              type="comments"
              enabled={notifications.comments}
            />

            <NotificationToggle
              icon={UserPlus}
              title="New Followers"
              description="Someone started following you"
              type="follows"
              enabled={notifications.follows}
            />

            <NotificationToggle
              icon={Image}
              title="Posts"
              description="People you follow shared new posts"
              type="posts"
              enabled={notifications.posts}
            />
          </div>

          {/* Status Message */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800">
                  {notifications.all
                    ? "You'll receive all notifications"
                    : "Some notifications are disabled"}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  You can change these settings anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-20"></div>
    </div>
  );
}
