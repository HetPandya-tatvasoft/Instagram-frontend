import { logout as logoutUser } from "../features/authentication/slice/authSlice";
import { store } from "../app/redux/store";
import { routes } from "../common/constants/routes";

const performLogout = () => {
  store.dispatch(logoutUser());
  localStorage.removeItem("user");
  window.location.href = routes.login;
};

export default performLogout;
