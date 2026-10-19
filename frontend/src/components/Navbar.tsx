import { useState } from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Events", path: "/" },
    { label: "Create Event", path: "/events/new" },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-space/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        <NavLink to="/" onClick={closeMenu} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary text-xl text-gold">
            ✦
          </span>

          <span className="text-lg font-bold tracking-wider text-text-main sm:text-xl">
            EVENT<span className="text-primary">HORIZON</span>
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-text-muted"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop account buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <NavLink
            to="/signin"
            className="rounded-lg border border-white/20 px-5 py-2 text-sm font-semibold text-text-main transition hover:border-primary hover:text-primary"
          >
            Log In
          </NavLink>

          <NavLink
            to="/signup"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-space transition hover:bg-cyan-300"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="rounded-lg border border-white/20 p-3 text-primary md:hidden"
        >
          <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-surface px-6 py-6 md:hidden"
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className="text-sm font-medium text-text-main hover:text-primary"
              >
                {link.label}
              </NavLink>
            ))}

            <div className="my-1 border-t border-white/10" />

            <NavLink
              to="/signin"
              onClick={closeMenu}
              className="rounded-lg border border-white/20 px-5 py-3 text-center font-semibold text-text-main"
            >
              Log In
            </NavLink>

            <NavLink
              to="/signup"
              onClick={closeMenu}
              className="rounded-lg bg-primary px-5 py-3 text-center font-bold text-space"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
