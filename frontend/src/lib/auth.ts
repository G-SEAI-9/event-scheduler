// This file is yours to type. The marker names the requirement so the brief,
// issue, agent and source file all use the same words.

// FR009 - Authentication token persistence
// Store the token returned by Sign-In and retrieve it when the app starts or an
// authenticated request needs it. Signing out must remove the stored token.



const TOKEN_KEY = "eventhorizon_token";


export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}


export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}


export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}