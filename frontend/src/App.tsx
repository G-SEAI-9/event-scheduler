import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import CreateEventPage from "./pages/CreateEventPage";
import { EditEventPage } from "./pages/EditEventPage";
import { EventDetailsPage } from "./pages/EventDetailsPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="events/:id" element={<EventDetailsPage />} />

        <Route path="signup" element={<SignUpPage />} />

        <Route path="signin" element={<SignInPage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="events/new" element={<CreateEventPage />} />

          <Route path="events/:id/edit" element={<EditEventPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
