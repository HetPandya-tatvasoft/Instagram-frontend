import { useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import { useCallback } from "react";
import { routes } from "../../../common/constants/routes";

const SettingsAndPrivacy: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToNotificationSettings = useCallback(() => {
    navigate(routes.mainRoutes.notificationSettings);
  }, []);

  return (
    <MainLayout>
      <h2 className="px-8 py-6 text-2xl">Settings and Privacy</h2>

      <div className="w-full px-8 py-6">
        <div className="flex items-start space-x-3 flex-1">
          <button
            type="button"
            onClick={handleNavigateToNotificationSettings}
            className="px-5 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-full transition duration-300 ease-in-out"
          >
            Notification Settings
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsAndPrivacy;
