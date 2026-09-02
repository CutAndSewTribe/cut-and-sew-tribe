"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Users,
} from "lucide-react";

import CheckoutButton from "@/components/checkout/CheckoutButton";

interface Props {
  courseSlug: string;
  enrolled?: boolean;
  telegramInviteLink?: string | null;
}

export default function EnrollmentCTA({
  courseSlug,
  enrolled = false,
  telegramInviteLink = null,
}: Props) {
  const hasTelegramAccess =
    enrolled &&
    typeof telegramInviteLink === "string" &&
    telegramInviteLink.trim() !== "";

  return (
    <section className="overflow-hidden rounded-3xl bg-linear-to-r from-[#661093] via-[#7A1FA2] to-[#8B3CB8] text-white shadow-2xl">
      <div className="grid gap-10 p-8 lg:grid-cols-[1.4fr_0.8fr] lg:p-12">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            Enrollment open
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight lg:text-5xl">
            Your fashion career can start with the next lesson.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
            Stop watching random tutorials and start following a structured
            curriculum designed by professional fashion tutors. Learn the exact
            techniques used to create garments clients are willing to pay for.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Lifetime access to every lesson",
              "Downloadable patterns and resources",
              "Private student community support",
              "Certificate of completion",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
              >
                <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              <Users className="h-4 w-4" />
              Join the tribe
            </div>

            <p className="mt-4 text-sm leading-7 text-white/80">
              Join thousands of fashion students who are building professional
              sewing skills, creating client-ready garments, and launching
              profitable fashion businesses through Cut and Sew Tribe.
            </p>
          </div>

          <div className="mt-8">
            {hasTelegramAccess ? (
              <a
                href={telegramInviteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-lg font-semibold text-[#661093] transition hover:bg-neutral-100"
              >
                Join Course on Telegram
                <ArrowRight className="h-5 w-5" />
              </a>
            ) : (
              <CheckoutButton slug={courseSlug} />
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80">
              <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
              Secure checkout powered by Paystack
            </div>

            <p className="mt-3 text-center text-xs leading-6 text-white/60">
              Instant access after payment • Learn on mobile or desktop • No
              recurring subscription
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}