// components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

export const ProtectedRoute = (): React.JSX.Element => {
  const location = useLocation();
  const isAuthenticated = isTokenValid();

  if (!isAuthenticated) {
    // نمرر location عبر state لكي نعرف أين كان يريد الذهاب
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};