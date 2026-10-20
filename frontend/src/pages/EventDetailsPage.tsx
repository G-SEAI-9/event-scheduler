// This file is yours to type. The markers name requirements so the brief,
// issues, agent and source file all use the same words.


// This page also renders the DeleteEventButton for FR027. Agree with its owner
// on the props it takes.
// FR013 - Event details page
// Read the event ID from the route, fetch that event when the ID changes, keep
// it in React state, and give the user useful loading and failure feedback.

// FR023 - Keep event details current
// Cancel or ignore an older in-flight request when the route changes so its
// response cannot replace the event selected by the current URL.

// FR027 - Delete an event
// This page also renders the DeleteEventButton.

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { DeleteEventButton } from "../components/DeleteEventButton";

interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image?: string;
}

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/events/${id}`, { signal });
        if (!response.ok) {
          throw new Error("Failed to load event details.");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "An error occurred while loading the event.");
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchEventDetails();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl p-12 text-center text-text-muted">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="mx-auto max-w-3xl p-12 text-center">
        <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
          {error || "Event not found."}
        </div>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-lg bg-primary px-6 py-3 font-bold text-space transition hover:bg-cyan-300"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 text-text-main">
      <div className="mb-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-text-muted transition hover:text-primary"
        >
          ← Back
        </button>

        <div className="flex items-center gap-4">
          <Link
            to={`/events/${event.id}/edit`}
            className="rounded-lg border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20"
          >
            Edit Event
          </Link>
          <DeleteEventButton eventId={event.id} onDeleted={() => navigate("/")} />
        </div>
      </div>

      <article className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl">
        {event.image && (
          <div className="relative h-80 w-full overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />
            <span className="absolute left-6 top-6 rounded-full border border-primary/30 bg-space/90 px-4 py-1 text-xs font-semibold text-primary backdrop-blur">
              {event.category}
            </span>
          </div>
        )}

        <div className="p-8">
          <p className="mb-3 text-sm font-semibold text-gold">{event.date}</p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-text-main">
            {event.title}
          </h1>
          <p className="mb-6 text-sm text-text-muted">📍 {event.location}</p>

          <div className="border-t border-white/10 pt-6">
            <h2 className="mb-3 text-lg font-bold text-text-main">About this event</h2>
            <p className="leading-relaxed text-slate-300 whitespace-pre-line">
              {event.description || "No description provided."}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}