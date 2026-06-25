import { Navigate } from "react-router-dom";
import { useAuthStore } from "@app/store/authStore";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  roles?: string[];
}

export const ProtectedRoute = ({ children, roles }: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return <>{children}</>;
};
