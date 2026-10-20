// This file is yours to type. The markers name requirements so the brief,
// issues, agent and source file all use the same words.

// FR007 - Declarative React Router setup
// Define the complete route tree in Declarative Mode. Connect the main and
// protected layouts, page components, route parameters and nested outlets.

// FR028 - Show a Not Found page
// Add a fallback route for unknown app URLs. Missing event IDs must reach the
// same clear Not Found experience rather than leaving an empty or broken page.

import { Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* <Route index element={<HomePage />} /> */}
        {/* <Route path='events/details/:eventId' element={<EventDetailsPage />} /> */}

        {/* <Route path='signup' element={<SignUpPage />} /> */}
        {/* <Route path='signin' element={<SignInPage />} /> */}

        {/* Protected routes - require authentication token */}
        <Route element={<ProtectedLayout />}>
          <Route path="events/new" element={<CreateEventPage />} />
          <Route path="events/edit/:eventId" element={<EditEventPage />} />
        </Route>
      </Route>

      {/* <Route path='*' element={<NotFoundPage />} /> */}
      {/* </Route> */}
    </Routes>
  );
}
