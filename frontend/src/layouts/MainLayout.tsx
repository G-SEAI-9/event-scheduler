import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { getToken, saveToken, removeToken } from "../lib/auth";

export type AuthContext = {
  isAuthenticated: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
};

export default function MainLayout() {
  const [token, setToken] = useState<string | null>(() => getToken());

  function signIn(newToken: string) {
    saveToken(newToken);
    setToken(newToken);
  }

  function signOut() {
    removeToken();
    setToken(null);
  }

  const authContext: AuthContext = {
    isAuthenticated: Boolean(token),
    signIn,
    signOut,
  };

  return (
    <div className="flex min-h-screen flex-col bg-space text-text-main">
      <Navbar />

      <main className="flex-1">
        <Outlet context={authContext} />
      </main>

      <footer className="border-t border-white/10 bg-surface px-6 py-6 text-center text-sm text-text-muted">
        © {new Date().getFullYear()} EVENTHORIZON. All rights reserved.
      </footer>
    </div>
  );
}
