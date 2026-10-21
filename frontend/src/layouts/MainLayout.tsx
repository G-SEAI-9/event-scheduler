import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { getToken, saveToken, removeToken } from "../lib/auth";
import type { User } from "../lib/types";

// FR024 - The signed-in user is kept here and passed to nested pages.
const USER_KEY ="eventhorizon_user";

function loadUser (): User | null {
  const stored = localStorage.getItem(USER_KEY)
  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export type AuthContext = {
  isAuthenticated: boolean;
  user : User | null;
  signIn: (token: string, user?: User) => void;
  signOut: () => void;
};

export default function MainLayout() {
  const [token, setToken] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<User | null>(() => loadUser());
  
  function signIn(newToken: string, newUser?: User) {
  saveToken(newToken);
  setToken(newToken);

  if (newUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
  }
}

  //FR029 - Signin-out clears the whole session (token and user)
  function signOut() {
    removeToken();
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
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
      user={user}
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
