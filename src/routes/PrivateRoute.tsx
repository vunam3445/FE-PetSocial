// routes/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const token = localStorage.getItem("access_token");

  return token ? <Outlet /> : <Navigate to="/login" />;
};
