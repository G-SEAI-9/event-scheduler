import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import CreateEventPage from "./pages/CreateEventPage";
import { EditEventPage } from "./pages/EditEventPage";
import { EventDetailsPage } from "./pages/EventDetailsPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";

function PagePlaceholder({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-bold text-text-main">{title}</h1>
      <p className="mt-4 text-text-muted">
        This page is currently under development.
      </p>
    </section>
  );
}

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

        <Route path="*" element={<PagePlaceholder title="Page Not Found" />} />
      </Route>
    </Routes>
  );
}
