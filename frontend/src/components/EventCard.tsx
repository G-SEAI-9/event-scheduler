// This file is yours to type. The marker names the requirement so the brief,
// issue, agent and source file all use the same words.

// FR012 - Event card with typed props
// Receive one event through props typed with the shared Event type, and make the
// card take users to the matching /events/:id page through React Router. The
// card's content and styling are your group's design decision.
import type { Event } from "../lib/types";
import { Link } from "react-router";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-cyan-500/10">
      <div className="relative h-52 overflow-hidden">
        <img
          src="/images/event-concert.png"
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-space/90 px-4 py-1 text-xs font-semibold text-primary backdrop-blur">
          Event
        </span>
      </div>
      <div className="p-6">
        <p className="mb-3 text-sm font-semibold text-gold">
          {new Date(event.date).toLocaleDateString("de-DE")}
        </p>
        <h3 className="mb-3 text-xl font-bold text-text-main">{event.title}</h3>
        <p className="mb-6 text-sm text-text-muted">📍 {event.location}</p>
        <Link
          to={`/events/${event.id}`}
          className="block w-full rounded-lg border border-primary/50 px-5 py-3 text-center font-semibold text-primary transition hover:bg-primary hover:text-space"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}
