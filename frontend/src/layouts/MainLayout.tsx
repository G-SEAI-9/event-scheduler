import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-space text-text-main">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-surface px-6 py-6 text-center text-sm text-text-muted">
        © {new Date().getFullYear()} EVENTHORIZON. All rights reserved.
      </footer>
    </div>
  );
}
