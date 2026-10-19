// FR007 - Declarative React Router setup
// Define the complete route tree in Declarative Mode. Connect the main and
// protected layouts, page components, route parameters and nested outlets.

// FR028 - Show a Not Found page
// Add a fallback route for unknown app URLs. Missing event IDs must reach the
// same clear Not Found experience rather than leaving an empty or broken page.

import { Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import HomePage from ".pages/HomePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      {/* Main Layout and public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="events/details/:eventId" element={<EventDetailsPage />} />

        {/* Public authentication pages */}
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin" element={<SignInPage />} />

        {/* Protected routes - require authentication token */}
        <Route element={<ProtectedLayout />}>
          <Route path="events/new" element={<CreateEventPage />} />
          <Route path="events/edit/:eventId" element={<EditEventPage />} />
        </Route>
      </Route>

      {/* Fallback for unknown routes - FR028 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
