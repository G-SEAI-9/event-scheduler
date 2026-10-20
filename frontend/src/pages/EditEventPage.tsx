// This file is yours to type. The marker names the requirement so the brief,
// issue, agent and source file all use the same words.

// FR022 - Edit an event
// Load the route's event into a prefilled form, keep edits in React state, send
// an authenticated update, handle failures, and show the saved event.

import { useState, useEffect, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router";
import { getToken } from "../lib/auth";

export function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Failed to load event data.");
        }
        const data = await response.json();
        setTitle(data.title || "");
        setDescription(data.description || "");
      } catch (err: any) {
        setError(err.message || "Unknown error during loading.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = getToken();
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update the event.");
      }

      setSuccessMessage("Event successfully updated!");
      
      setTimeout(() => {
        navigate(`/events/${id}`);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "An error has occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-xl p-6 text-center text-text-muted">
        <p>Loading event data...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-surface p-8 shadow-xl mt-12 text-text-main">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        Edit <span className="text-primary">Event</span>
      </h1>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm text-primary">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-text-main">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-space px-4 py-3 text-text-main placeholder-text-muted transition focus:border-primary focus:outline-none"
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-text-main">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-white/10 bg-space px-4 py-3 text-text-main placeholder-text-muted transition focus:border-primary focus:outline-none"
            disabled={submitting}
          />
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-text-main transition hover:bg-white/10"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-3 font-bold text-space shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}