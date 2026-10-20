// FR016 - Protected route layout
// Check the frontend authentication state before rendering nested protected
// pages. Signed-out users go to Sign-In instead of seeing protected content.

import { Navigate, Outlet } from "react-router";
import { getToken } from "../lib/auth";

function ProtectedLayout() {
  const token = getToken();

  // If no token exists, redirect user to sign-in page with replace to prevent back navigation
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
