"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();

  const reference =
    searchParams.get("reference") ??
    searchParams.get("trxref");

  const [status, setStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");

  const [message, setMessage] = useState(
    "Verifying your payment..."
  );

  useEffect(() => {
    if (!reference) {
      return;
    }

    const paymentReference = reference;

    let cancelled = false;

    async function verifyPayment() {
      try {
        const response = await fetch(
          `/api/payments/verify?reference=${encodeURIComponent(
            paymentReference
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.error ??
              "Payment verification failed."
          );
        }

        if (cancelled) {
          return;
        }

        const telegramInviteLink =
          data.telegramInviteLink ??
          data.telegram_invite_link ??
          data.course?.telegram_invite_link;

        if (
          typeof telegramInviteLink !== "string" ||
          telegramInviteLink.trim() === ""
        ) {
          throw new Error(
            "Payment was successful, but the Telegram group could not be identified."
          );
        }

        setStatus("success");

        setMessage(
          "Payment successful. Opening your course Telegram group..."
        );

        window.location.href = telegramInviteLink;
      } catch (error) {
        if (cancelled) {
          return;
        }

        setStatus("error");

        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to verify your payment."
        );
      }
    }

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  if (!reference) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-700">
            !
          </div>

          <h1 className="mt-6 text-3xl font-bold text-neutral-900">
            Payment Verification Failed
          </h1>

          <p className="mt-4 text-red-600">
            Payment reference was not found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
        {status === "verifying" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#661093]/10 text-3xl">
              ⏳
            </div>

            <h1 className="mt-6 text-3xl font-bold text-neutral-900">
              Verifying Payment
            </h1>

            <p className="mt-4 text-neutral-600">
              {message}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-bold text-neutral-900">
              Payment Successful
            </h1>

            <p className="mt-4 text-neutral-600">
              {message}
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-700">
              !
            </div>

            <h1 className="mt-6 text-3xl font-bold text-neutral-900">
              Payment Verification Failed
            </h1>

            <p className="mt-4 text-red-600">
              {message}
            </p>
          </>
        )}
      </div>
    </main>
  );
}