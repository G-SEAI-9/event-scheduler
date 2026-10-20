// FR011 - Home page event list
// Load events from the API when the page starts, keep the result in React state,
// handle failures, and display chronological event cards.

// FR025 - Paginate the event list
// Use the API's pagination data to load previous and next pages. Keep the
// controls, loading state and visible event list in sync with each request.

import { useState, useEffect } from "react";
import type { Event } from "../lib/types";
import EventCardPreview from "../components/EventCardPreview";

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch("/api/events/upcoming");

        if (!response.ok) {
          throw new Error("Failed to load events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events:", error);
        setError("Events could not be loaded. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  return (
    <main className="min-h-screen bg-space px-6 py-12 text-text-main md:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Discover What's Next
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Upcoming <span className="text-primary">Events</span>
          </h1>
        </header>
        {loading && (
          <p className="mb-8 text-center text-text-muted">Loading events...</p>
        )}
        {error && (
          <p role="alert" className="mb-8 text-center text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="mb-8 text-center text-text-muted">
            No upcoming events found.
          </p>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCardPreview
              key={event.id}
              title={event.title}
              date={new Date(event.date).toLocaleDateString("de-DE")}
              location={event.location}
              image="/images/event-concert.png"
              category="Event"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
