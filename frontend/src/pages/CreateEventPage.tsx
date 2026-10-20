// This file is yours to type. The markers name requirements so the brief,
// issues, agent and source file all use the same words.

// FR017 - Create event page
// Collect event data with React state or a form action, attach the stored token,
// create the event through the API, and show success or failure.

// FR026 - Prevent duplicate event creation
// While creation is pending, show that work is in progress and disable the send
// button until the request finishes.

import { useState } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { getToken } from "../lib/auth";

const EVENTS_URL = "http://localhost:3001/api/events";

interface CreateEventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: string;
  longitude: string;
}

interface CreateEventPayload {
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
}

function validateForm(formData: CreateEventFormData): string | null {
  const title = formData.title.trim();
  const description = formData.description.trim();
  const location = formData.location.trim();

  // Titel prüfen
  if (!title) {
    return "Bitte gib einen Eventtitel ein.";
  }

  if (title.length < 3) {
    return "Der Eventtitel muss mindestens 3 Zeichen lang sein.";
  }

  if (title.length > 255) {
    return "Der Eventtitel darf höchstens 255 Zeichen lang sein.";
  }

  // Beschreibung prüfen
  if (description.length > 255) {
    return "Die Beschreibung darf höchstens 255 Zeichen lang sein.";
  }

  // Datum prüfen
  if (!formData.date.trim()) {
    return "Bitte gib Datum und Uhrzeit an.";
  }

  const selectedDate = new Date(formData.date);

  if (Number.isNaN(selectedDate.getTime())) {
    return "Bitte gib ein gültiges Datum mit Uhrzeit an.";
  }

  // Veranstaltungsort prüfen
  if (!location) {
    return "Bitte gib einen Veranstaltungsort ein.";
  }

  if (location.length > 255) {
    return "Der Veranstaltungsort darf höchstens 255 Zeichen lang sein.";
  }

  // Koordinaten prüfen
  const hasLatitude = formData.latitude.trim() !== "";
  const hasLongitude = formData.longitude.trim() !== "";

  if (hasLatitude !== hasLongitude) {
    return "Bitte gib Breitengrad und Längengrad gemeinsam an.";
  }

  if (hasLatitude && hasLongitude) {
    const latitude = Number(formData.latitude);
    const longitude = Number(formData.longitude);

    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
      return "Der Breitengrad muss eine Zahl zwischen -90 und 90 sein.";
    }
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      return "Der Längengrad muss eine Zahl zwischen -180 und 180 sein.";
    }
    const latitudeDecimals = formData.latitude.split(".")[1]?.length ?? 0;
    const longitudeDecimals = formData.longitude.split(".")[1]?.length ?? 0;
    if (latitudeDecimals > 8 || longitudeDecimals > 8) {
      return "Koordinaten dürfen höchstens 8 Nachkommastellen haben.";
    }
  }

  return null;
}

const emptyForm: CreateEventFormData = {
  title: "",
  description: "",
  date: "",
  location: "",
  latitude: "",
  longitude: "",
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-space px-4 py-3 text-text-main outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/30";

function CreateEventPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateEventFormData>(emptyForm);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage("");

    // 1. Formularwerte vor dem API-Aufruf validieren
    const validationError = validateForm(formData);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    // 2. Vorhandenen Token prüfen
    const token = getToken();

    if (!token) {
      setErrorMessage("Bitte melde dich an, um ein Event zu erstellen.");
      return;
    }

    // 3. Daten für die API vorbereiten
    const payload: CreateEventPayload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: new Date(formData.date).toISOString(),
      location: formData.location.trim(),
      organizerID: ,
      latitude: formData.latitude === "" ? null : Number(formData.latitude),
      longitude: formData.longitude === "" ? null : Number(formData.longitude),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(EVENTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let apiErrorMessage: string | null = null;

        try {
          const errorBody: unknown = await response.json();
          if (
            typeof errorBody === "object" &&
            errorBody !== null &&
            "error" in errorBody &&
            typeof errorBody.error === "string" &&
            errorBody.error.trim() !== ""
          ) {
            apiErrorMessage = errorBody.error.trim();
          } else if (
            typeof errorBody === "object" &&
            errorBody !== null &&
            "message" in errorBody &&
            typeof errorBody.message === "string" &&
            errorBody.message.trim() !== ""
          ) {
            apiErrorMessage = errorBody.message.trim();
          }
        } catch {
          // Die Antwort enthält kein gültiges JSON.
        }
        setErrorMessage(
          apiErrorMessage ??
            `Das Event konnte nicht erstellt werden (HTTP ${response.status}).`,
        );

        return;
      }

      setFormData(emptyForm);
      navigate("/");
    } catch {
      setErrorMessage(
        "Die Anfrage konnte nicht gesendet werden. Bitte prüfe deine Verbindung und versuche es erneut.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <section className="rounded-2xl border border-white/10 bg-space p-6 shadow-xl shadow-black/20 sm:p-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            EventHorizon
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            Event erstellen
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
            Teile die wichtigsten Informationen zu deiner Veranstaltung.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="event-title"
              className="mb-2 block text-sm font-medium text-text-main"
            >
              Eventtitel *
            </label>
            <input
              id="event-title"
              name="title"
              type="text"
              required
              minLength={3}
              maxLength={255}
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              placeholder="Zum Beispiel: Sommerkonzert im Park"
            />
          </div>

          <div>
            <label
              htmlFor="event-description"
              className="mb-2 block text-sm font-medium text-text-main"
            >
              Beschreibung *
            </label>
            <textarea
              id="event-description"
              name="description"
              rows={5}
              required
              maxLength={255}
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} resize-y`}
              placeholder="Worum geht es bei deiner Veranstaltung?"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="event-date"
                className="mb-2 block text-sm font-medium text-text-main"
              >
                Datum und Uhrzeit *
              </label>
              <input
                id="event-date"
                name="date"
                type="datetime-local"
                required
                value={formData.date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="event-location"
                className="mb-2 block text-sm font-medium text-text-main"
              >
                Veranstaltungsort *
              </label>
              <input
                id="event-location"
                name="location"
                type="text"
                required
                maxLength={255}
                value={formData.location}
                onChange={handleChange}
                className={inputClass}
                placeholder="Adresse oder Ort"
              />
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-medium text-text-main">
              Koordinaten (optional)
            </legend>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="event-latitude"
                  className="mb-2 block text-sm text-text-muted"
                >
                  Breitengrad
                </label>
                <input
                  id="event-latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  min="-90"
                  max="90"
                  value={formData.latitude}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="z. B. 52.5200"
                />
              </div>

              <div>
                <label
                  htmlFor="event-longitude"
                  className="mb-2 block text-sm text-text-muted"
                >
                  Längengrad
                </label>
                <input
                  id="event-longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  min="-180"
                  max="180"
                  value={formData.longitude}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="z. B. 13.4050"
                />
              </div>
            </div>
          </fieldset>

          {errorMessage && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/20 bg-red-900/10 p-4 text-center text-red-400"
            >
              {errorMessage}
            </div>
          )}

          <div className="border-t border-white/10 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary px-5 py-3 font-semibold text-space transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Wird erstellt …" : "Event erstellen"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateEventPage;
