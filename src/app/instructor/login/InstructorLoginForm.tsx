"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function InstructorLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const supabase = createClient();

    const {
      error: loginError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    router.replace("/instructor/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-neutral-800"
        >
          Email address
        </label>

        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="instructor@example.com"
          className="
            w-full
            rounded-xl
            border
            border-neutral-300
            px-4
            py-3
            outline-none
            transition
            focus:border-[#661093]
            focus:ring-2
            focus:ring-[#661093]/20
          "
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-neutral-800"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="••••••••"
          className="
            w-full
            rounded-xl
            border
            border-neutral-300
            px-4
            py-3
            outline-none
            transition
            focus:border-[#661093]
            focus:ring-2
            focus:ring-[#661093]/20
          "
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-[#661093]
          px-5
          py-3
          font-semibold
          text-white
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

