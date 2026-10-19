import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import EventCardPreview from "./components/EventCardPreview";

import "./index.css";

// Temporary example events for our design preview
const previewEvents = [
  {
    id: 1,
    title: "Neon Nights Music Festival",
    date: "November 14, 2026",
    location: "Berlin, Germany",
    category: "Live Music",
    image: "/images/event-concert.png",
  },
  {
    id: 2,
    title: "Creative Future Workshop",
    date: "November 21, 2026",
    location: "Munich, Germany",
    category: "Workshop",
    image: "/images/event-workshop.png",
  },
  {
    id: 3,
    title: "Beyond Connections",
    date: "December 5, 2026",
    location: "Hamburg, Germany",
    category: "Networking",
    image: "/images/event-networking.png",
  },
];

function DesignPreview() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-space text-text-main">
        <Navbar />

        <main>
          <HeroSection />

          {/* Upcoming events */}
          <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                Discover What's Next
              </p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Upcoming <span className="text-primary">Events</span>
              </h2>

              <p className="mx-auto max-w-2xl text-text-muted">
                Explore extraordinary experiences, discover new passions, and
                connect with people who share your interests.
              </p>
            </div>

            {/* Event cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {previewEvents.map((event) => (
                <EventCardPreview
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  category={event.category}
                  image={event.image}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-surface px-6 py-8 text-center">
          <p className="text-sm text-text-muted">
            © 2026 EVENTHORIZON. Discover. Experience. Connect.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DesignPreview />
  </React.StrictMode>,
);
