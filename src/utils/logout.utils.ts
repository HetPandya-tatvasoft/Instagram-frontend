import { logout as logoutUser } from "../features/authentication/slice/authSlice";
import { store } from "../app/redux/store";
import toast from "react-hot-toast";
import { ERROR_CODES } from "../common/constants/error";
import { ROUTES } from "../common/constants/routes";
import AuthInitializer from '../common/components/AuthInitializer';

const PerformLogout = () => {
  store.dispatch(logoutUser());
  localStorage.removeItem("user");
  // toast.error(ERROR_CODES.sessionExpired.sessionExpired);
  window.location.href = ROUTES.LOGIN;
  // setTimeout(function () {
  // }, 1000);
};

// const PerformLogout: React.FC = () => {
//   return (
//     <>
//       <AuthInitializer />
//     </>
//   );
// };

export default PerformLogout;
