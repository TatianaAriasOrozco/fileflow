// src/components/PrivateRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = localStorage.getItem("user-role");

  return user === "admin" ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
