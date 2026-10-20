import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 409) {
        throw new Error(
          "This email address is already registered. Please sign in.",
        );
      }

      if (response.status === 400) {
        throw new Error(
          "Invalid registration details. Please check your email and password.",
        );
      }

      if (!response.ok) {
        throw new Error("Registration failed. Please try again later.");
      }

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Join EVENTHORIZON
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Create your account and discover amazing events.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block">
              Email
            </label>

            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block">
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              minLength={8}
              maxLength={50}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p role="alert" className="text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-green-400">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-cyan-600 p-3 font-semibold transition hover:bg-cyan-500 disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="text-cyan-400 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </main>
  );
}