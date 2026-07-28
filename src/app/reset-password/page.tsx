"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [ready, setReady] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function initializeRecovery() {
      const hash = window.location.hash.substring(1);

      const params = new URLSearchParams(hash);

      const accessToken =
        params.get("access_token");

      const refreshToken =
        params.get("refresh_token");

      if (accessToken && refreshToken) {
        const { error } =
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

        if (error) {
          setMessage(error.message);
          return;
        }
      }

      setReady(true);
    }

    initializeRecovery();
  }, [supabase]);

  async function handleReset() {
    setMessage("");

    if (!password) {
      setMessage("Please enter a new password.");
      return;
    }

    if (password.length < 8) {
      setMessage(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Password updated successfully. Redirecting..."
    );

    setTimeout(() => {
      router.replace("/login");
    }, 1500);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-6">
      <div className="w-full rounded-3xl bg-white p-10 shadow-lg">
        <h1 className="text-3xl font-bold text-[#661093]">
          Reset Password
        </h1>

        <p className="mt-3 text-neutral-600">
          Enter your new password below.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              New Password
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

          <div>
            <label className="mb-2 block font-medium text-neutral-800">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 outline-none focus:border-[#661093]"
            />
          </div>

          {message && (
            <p className="text-sm text-[#661093]">
              {message}
            </p>
          )}

          <button
            onClick={handleReset}
            disabled={loading || !ready}
            className="w-full rounded-xl bg-[#661093] py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {!ready
              ? "Preparing..."
              : loading
              ? "Updating Password..."
              : "Update Password"}
          </button>
        </div>
      </div>
    </main>
  );
}