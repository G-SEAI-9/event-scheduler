import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-space">
      {/* Space background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-space.png')",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-space via-space/80 to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Events Beyond Borders
          </p>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-text-main md:text-7xl">
            EVENT
            <span className="text-primary">HORIZON</span>
          </h1>

          <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">
            Discover. Experience. Connect.
          </h2>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-slate-300">
            Your gateway to unforgettable experiences. Discover exciting events,
            meet amazing people, and create memories that last a lifetime.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="rounded-lg bg-primary px-7 py-3 font-bold text-space shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
            >
              Explore Events →
            </Link>

            <Link
              to="/signup"
              className="rounded-lg border border-gold px-7 py-3 font-bold text-gold transition hover:bg-gold hover:text-space"
            >
              Join EVENTHORIZON
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-space to-transparent" />
    </section>
  );
}
