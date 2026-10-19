// This file is yours to type. The marker names the requirement so the brief,
// issue, agent and source file all use the same words.

// FR030 - Shared types for events and users
// Describe an event and a user as the Events API returns them, and export both
// types. Every page and component that handles events or users imports them
// from here. Check the API's Swagger docs for the exact fields.
// FR030 - Shared types for events and users

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  organizerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}