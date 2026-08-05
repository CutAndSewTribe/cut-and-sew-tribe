"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  async function login() {
    setLoading(true);
    setMessage("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setLoading(false);
      setMessage(error.message);
      return;
    }

    /**
     * Refresh the App Router.
     * This allows the middleware/server components
     * to receive the new authenticated cookies.
     */
    router.refresh();

    /**
     * Small delay so the refreshed auth cookies
     * are available before navigating.
     */
    setTimeout(() => {
      router.replace("/dashboard");
    }, 150);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6">
      <div className="w-full rounded-3xl bg-white p-10 shadow-lg">
        <h1 className="text-4xl font-bold text-[#661093]">
          Student Login
        </h1>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 outline-none focus:border-[#661093]"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 outline-none focus:border-[#661093]"
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/reset-password"
              className="text-sm font-medium text-[#661093] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {message && (
            <p className="text-sm text-red-600">
              {message}
            </p>
          )}

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-xl bg-[#661093] py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          <p className="text-center text-sm text-neutral-600">
            New student?

            <Link
              href="/signup"
              className="ml-2 font-semibold text-[#661093]"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}