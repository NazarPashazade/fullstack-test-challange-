import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { NameOfRoutes } from "../constants";

import { useAuthContext } from "@shared/providers";

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Navigate to={NameOfRoutes.APP} /> : <>{children}</>;
};

export default GuestGuard;
