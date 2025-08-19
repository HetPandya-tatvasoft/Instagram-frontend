import { generateNotificationMessage } from "../../../utils/notification.utils";
import { notificationType } from "../../../common/enums/notification.enum";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { INotificationCardProps } from "../types/notificationProps.types";

const NotificationCard: React.FC<INotificationCardProps> = ({
  notification,
  onRespond,
}) => {

  const {
    senderUsername,
    senderProfilePicture,
    senderProfilePictureBase64,
    sentDate,
    notificationTypeId,
    senderId,
    postId,
    storyId,
    commentId,
    thumbnail,
  } = notification;

  const showActions = notificationTypeId === notificationType.followRequest;

  return (
    <div className="bg-white shadow rounded p-4 flex items-start gap-4">
      <img
        src={getBase64ImageUrl(senderProfilePictureBase64)}
        alt={senderUsername}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="text-sm font-medium">
          {/* This split thing and all is for comment like message */}
          {(() => {
            const message = generateNotificationMessage(notification);
            const [beforeContent, commentContent] = message.split(":-");

            return (
              <>
                {beforeContent}
                {commentContent && (
                  <span className="text-gray-500"> :-{commentContent}</span>
                )}
              </>
            );
          })()}
        </p>

        <p className="text-xs text-gray-500">
          {new Date(sentDate).toLocaleString()}
        </p>

        {showActions && onRespond && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onRespond(senderId, true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Accept
            </button>
            <button
              onClick={() => onRespond(senderId, false)}
              className="px-3 py-1 text-sm bg-gray-300 rounded"
            >
              Decline
            </button>
          </div>
        )}

        {/* Optional preview for post/story/comment if available */}
        {(thumbnail || postId || storyId || commentId) && (
          <div className="mt-2">
            {thumbnail ? (
              <img
                src={getBase64ImageUrl(thumbnail)}
                alt="Thumbnail"
                className="w-20 h-20 object-cover rounded"
              />
            ) : (
              <span className="text-xs italic text-gray-400">
                No preview available
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;