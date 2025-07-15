import { logout as logoutUser } from "../features/authentication/slice/authSlice";
import { ROUTES } from "../common/constants/routes";
import { store } from "../app/redux/store";
import toast from "react-hot-toast";
import { createBrowserHistory } from "history";
import { ERROR_CODES } from "../common/constants/error";

const PerformLogout = () => {
  store.dispatch(logoutUser());
  localStorage.removeItem("user");
  window.location.href = ROUTES.LOGIN;
  toast.error(ERROR_CODES.sessionExpired.sessionExpired);
};

export default PerformLogout;
