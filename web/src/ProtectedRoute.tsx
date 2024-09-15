import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import React from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return !user
    ? <Navigate to="/login" />
    : children;
}