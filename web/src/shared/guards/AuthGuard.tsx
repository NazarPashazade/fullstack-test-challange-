import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { NameOfRoutes } from "../constants";

import { useAuthContext } from "@shared/providers";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={NameOfRoutes.AUTH_LOGIN} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
