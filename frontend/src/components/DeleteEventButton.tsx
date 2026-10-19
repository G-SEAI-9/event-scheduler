// This file is yours to type. The marker names the requirement so the brief,
// issue, agent and source file all use the same words.

// FR027 - Delete an event
// Receive the event's ID through typed props, ask for confirmation, send an
// authenticated delete request, handle failure, and return to an event list
// that no longer shows the deleted event.

import { useState } from "react";
import { getToken } from "../lib/auth";

interface DeleteEventButtonProps {
  eventId: number;
  onDeleted?: () => void;
}

export function DeleteEventButton({ eventId, onDeleted }: DeleteEventButtonProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!window.confirm("Do you really want to delete this event?")) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const token = getToken();
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the event.");
      }

      if (onDeleted) {
        onDeleted();
      } else {
        window.location.href = "/";
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting.");
      setDeleting(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete Event"}
      </button>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}