// This file is yours to type. The marker names the requirement so the brief,
// issue, agent and source file all use the same words.

// FR027 - Delete an event
// Receive the event's ID through typed props, ask for confirmation, send an
// authenticated delete request, handle failure, and return to an event list
// that no longer shows the deleted event.
import React from "react";
import { getToken } from "../lib/auth";

interface DeleteEventButtonProps {
  eventId: number;
  onDeleted?: () => void;
}

export function DeleteEventButton({ eventId, onDeleted }: DeleteEventButtonProps) {
  const handleDelete = async () => {
    if (!window.confirm("Möchtest du wirklich löschen?")) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error("Fehler beim Löschen");
      }

      if (onDeleted) {
        onDeleted();
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Konnte nicht gelöscht werden.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Löschen
    </button>
  );
}