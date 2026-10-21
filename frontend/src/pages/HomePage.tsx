// FR011 - Home page event list
// Load events from the API when the page starts, keep the result in React state,
// handle failures, and display chronological event cards.

// FR025 - Paginate the event list
// Frontend pagination agreed with Stephan: the upcoming endpoint returns the
// complete chronological list without pagination metadata.

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import type { Event } from "../lib/types";
import EventCard from "../components/EventCard";

const EVENTS_PER_PAGE = 9;

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const pageParam = searchParams.get("page");
  const parsedPage = pageParam !== null && /^\d+$/.test(pageParam)
    ? Number(pageParam)
    : 1;
  const requestedPage = Number.isSafeInteger(parsedPage) && parsedPage > 0
    ? parsedPage
    : 1;
  const currentPage = loading
    ? requestedPage
    : Math.min(requestedPage, Math.max(1, totalPages));
  const visibleEvents = events.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE,
  );

  function goToPage(page: number) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      next.set("page", String(page));
      return next;
    });
  }

  useEffect(() => {
    if (!loading && !error && pageParam !== null && pageParam !== String(currentPage)) {
      setSearchParams((previous) => {
        const next = new URLSearchParams(previous);
        next.set("page", String(currentPage));
        return next;
      }, { replace: true });
    }
  }, [loading, error, pageParam, currentPage, setSearchParams]);

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
          {visibleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        {!loading && !error && totalPages > 0 && (
          <nav
            aria-label="Event pagination"
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              className="rounded-lg border border-primary/50 px-5 py-3 font-semibold text-primary transition hover:bg-primary hover:text-space disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-primary"
            >
              Previous
            </button>
            <p aria-live="polite" className="text-sm text-text-muted">
              Page {currentPage} of {totalPages}
            </p>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                goToPage(Math.min(totalPages, currentPage + 1))
              }
              className="rounded-lg border border-primary/50 px-5 py-3 font-semibold text-primary transition hover:bg-primary hover:text-space disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-primary"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}
