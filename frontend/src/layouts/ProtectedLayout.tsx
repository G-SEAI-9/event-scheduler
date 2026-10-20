import { Navigate, Outlet } from "react-router";
import { getToken } from "../lib/auth";

// FR016 - Protected route layout
export default function ProtectedLayout() {
  const token = getToken();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
