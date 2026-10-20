// This file is yours to type. The marker names the requirement so the brief,
// issue, agent and source file all use the same words.

// FR022 - Edit an event
// Load the route's event into a prefilled form, keep edits in React state, send
// an authenticated update, handle failures, and show the saved event.
// FR022 - Edit an event
// Load the route's event into a prefilled form, keep edits in React state, send
// an authenticated update, handle failures, and show the saved event.

import React, { useState, useEffect } from "react";
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
          throw new Error("Error loading the event.");
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

  const handleSubmit = async (e: React.FormEvent) => {
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
        throw new Error(errData.message || "Error updating the event.");
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
      <div className="max-w-xl mx-auto p-6 text-center">
        <p className="text-gray-600">Loading event data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-6">Edit event</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-300">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titel
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beschreibung
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={submitting}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
            disabled={submitting}
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? "Save..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}