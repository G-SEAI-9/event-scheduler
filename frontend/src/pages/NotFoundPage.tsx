// This file is yours to type. App.tsx carries the FR028 marker because the fallback
// route is the sign-off anchor. Build the shared unknown-route and missing-event
// experience here without starting from a supplied component signature.
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-4xl font-bold text-primary">Page not found</h1>
      <p className="mt-4 text-lg text-text-muted">This page does not exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-space hover:opacity-80"
      >
        Back to Home
      </Link>
    </main>
  );
}
