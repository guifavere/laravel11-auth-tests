import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

export const ProtectedRoutes = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated]);

  return <Outlet />;
}
