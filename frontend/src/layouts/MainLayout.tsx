import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { getToken, saveToken, removeToken } from "../lib/auth";
import type { User } from "../lib/types";

export type AuthContext = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
};

export default function MainLayout() {
  const [token, setToken] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<User | null>(null);

  function signIn(newToken: string, newUser: User) {
    saveToken(newToken);
    setToken(newToken);
    setUser(newUser);
  }

  function signOut() {
    removeToken();
    setToken(null);
    setUser(null)
  }

  const authContext: AuthContext = {
    isAuthenticated: Boolean(token),
    user,
    signIn,
    signOut,
  };

  return (
    <div className="flex min-h-screen flex-col bg-space text-text-main">
      <Navbar
        isAuthenticated={authContext.isAuthenticated}
        user={authContext.user}
        onSignOut={signOut}
      />

      <main className="flex-1">
        <Outlet context={authContext} />
      </main>

      <footer className="border-t border-white/10 bg-surface px-6 py-6 text-center text-sm text-text-muted">
        © {new Date().getFullYear()} EVENTHORIZON. All rights reserved.
      </footer>
    </div>
  );
}
