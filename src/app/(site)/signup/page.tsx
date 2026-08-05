"use client";

import { useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();

  const [firstName, setFirstName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [signupComplete, setSignupComplete] =
    useState(false);

  async function signup() {
    setLoading(true);
    setMessage("");

    const {
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          `${window.location.origin}/auth/callback`,

        data: {
          first_name: firstName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setSignupComplete(true);
  }

  if (signupComplete) {
    return (
      <main className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#661093]/10 text-2xl">
            ✉️
          </div>

          <h1 className="text-3xl font-bold text-neutral-900">
            Check your email
          </h1>

          <p className="mt-4 text-neutral-600">
            We sent a confirmation link to:
          </p>

          <p className="mt-2 break-words font-semibold text-[#661093]">
            {email}
          </p>

          <p className="mt-6 text-neutral-600">
            Open your email and click the confirmation
            link to activate your Cut and Sew Tribe
            account.
          </p>

          <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">
            <p className="font-semibold text-neutral-800">
              Didn&apos;t receive the email?
            </p>

            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Check your spam or junk folder.</li>
              <li>Make sure the email address is correct.</li>
              <li>Wait a few minutes and try again.</li>
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              I&apos;ve confirmed my email — Log in
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-4xl font-bold text-[#661093]">
        Create Student Account
      </h1>

      <p className="mt-3 text-neutral-600">
        Start your fashion design journey today.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            First Name
          </label>

          <input
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
            placeholder="e.g. Kolawole"
            value={firstName}
            onChange={(event) =>
              setFirstName(event.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Email Address
          </label>

          <input
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Password
          </label>

          <input
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
            placeholder="Create a secure password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </div>

        {message && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {message}
          </div>
        )}

        <button
          onClick={signup}
          disabled={
            loading ||
            !firstName.trim() ||
            !email.trim() ||
            !password.trim()
          }
          className="w-full rounded-xl bg-[#661093] py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        <p className="text-sm text-neutral-700">
          Already have an account?

          <Link
            href="/login"
            className="ml-2 font-medium text-[#661093]"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}