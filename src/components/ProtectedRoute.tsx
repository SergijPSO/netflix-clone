import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to='/' />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
