import { INotificationToggleProps } from "../types/props.types";

const NotificationToggle: React.FC<INotificationToggleProps> = ({
  icon: Icon,
  title,
  description,
  type,
  enabled,
  handleToggle,
}) => {
  return (
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
};

export default NotificationToggle;
