import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { pathnamePortion } from "../common/constants/routes";

interface IAuthFormPageProps {
  children: React.ReactNode;
}

const AuthFormPage: React.FC<IAuthFormPageProps> = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname.includes(pathnamePortion.loginPart);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>{children}</div>
    </div>
  );
};

export default AuthFormPage;
