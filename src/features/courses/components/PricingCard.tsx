import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Download,
  Users,
  Award,
  Infinity,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import CheckoutButton from "@/components/checkout/CheckoutButton";
interface Props {
  price: number;
  currency: string;
  courseSlug: string;
  enrolled?: boolean;
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PricingCard({
  price,
  currency,
  courseSlug,
  enrolled = false,
}: Props) {
  return (
    <aside className="sticky top-24 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl">
      <div className="bg-linear-to-r from-[#661093] to-[#8B3CB8] p-6 text-white">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
          <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
          Premium enrollment
        </div>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-5xl font-bold leading-none">
            {formatPrice(price, currency)}
          </span>
        </div>

        <p className="mt-3 text-sm text-purple-100">
          One-time payment • Lifetime access • No recurring subscription
        </p>
      </div>

      <div className="p-6">
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-4">
          <div className="text-sm font-semibold text-[#7A5A00]">
            Everything included
          </div>
          <p className="mt-1 text-sm text-[#6B5A1A]">
            Patterns, resources, community access, and future updates are included
            with your enrollment.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {[
            {
              icon: Infinity,
              title: "Lifetime access",
              text: "Rewatch every lesson anytime with no expiration date.",
            },
            {
              icon: Download,
              title: "Downloadable resources",
              text: "Patterns, measurement guides, templates, and checklists.",
            },
            {
              icon: Users,
              title: "Telegram community access",
              text: "Join our private student community for support and feedback.",
            },
            {
              icon: Award,
              title: "Certificate of completion",
              text: "Showcase your achievement after completing the program.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-2xl border border-neutral-200 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#661093]/10 text-[#661093]">
                <item.icon className="h-5 w-5" />
              </div>

              <div>
                <div className="font-semibold text-neutral-900">
                  {item.title}
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-neutral-50 p-4">
          <div className="text-sm font-semibold text-neutral-900">
            Your enrollment includes
          </div>

          <ul className="mt-3 space-y-2 text-sm text-neutral-700">
            {[
              "Full video curriculum",
              "Step-by-step garment construction",
              "Pattern drafting resources",
              "Business and pricing guidance",
              "Mobile and desktop access",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-[#661093]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          {enrolled ? (
  <Link
    href={`/learn/${courseSlug}`}
    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#661093] px-6 py-4 text-lg font-semibold text-white transition hover:bg-[#4E0C70]"
  >
    Continue Learning
    <ArrowRight className="h-5 w-5" />
  </Link>
) : (
  <CheckoutButton slug={courseSlug} />
)}

          <p className="mt-3 text-center text-sm text-neutral-500">
            Secure checkout powered by Paystack
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2 font-semibold text-green-700">
            <ShieldCheck className="h-5 w-5" />
            Confidence guarantee
          </div>

          <p className="mt-2 text-sm text-green-700">
            Join thousands of fashion students who have transformed their sewing
            skills through structured, practical training from Cut and Sew Tribe.
          </p>
        </div>
      </div>
    </aside>
  );
}