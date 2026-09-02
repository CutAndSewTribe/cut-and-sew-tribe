import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Play,
  Star,
  Users,
} from "lucide-react";

import type { PublicLMSCourse } from "@/lib/lms/courses";

interface CourseMarketplaceCardProps {
  course: PublicLMSCourse;
  featured?: boolean;
  enrolled?: boolean;
  telegramInviteLink?: string | null;
}

function formatPrice(price: number, currency: string) {
  if (currency === "NGN") {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatCategory(category: string) {
  return category
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function CourseMarketplaceCard({
  course,
  featured = false,
  enrolled = false,
  telegramInviteLink = null,
}: CourseMarketplaceCardProps) {
  const hasTelegramAccess =
    enrolled &&
    typeof telegramInviteLink === "string" &&
    telegramInviteLink.trim() !== "";

  const imageSrc = course.thumbnail
    ? course.thumbnail.startsWith("http")
      ? course.thumbnail
      : `/${course.thumbnail}`
    : null;

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white",
        "shadow-[0_10px_40px_rgba(0,0,0,0.06)]",
        "transition-all duration-500",
        "hover:-translate-y-1.5 hover:border-[#661093]/20",
        "hover:shadow-[0_24px_70px_rgba(31,10,42,0.14)]",
        featured
          ? "lg:grid lg:grid-cols-[1.08fr_0.92fr]"
          : "flex h-full flex-col",
      ].join(" ")}
    >
      {/* =========================================================
          IMAGE
      ========================================================== */}
      <div
        className={[
          "relative overflow-hidden bg-[#17111B]",
          featured
            ? "min-h-[360px] lg:min-h-[500px]"
            : "aspect-[4/5]",
        ].join(" ")}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={course.title}
            fill
            priority={featured}
            sizes={
              featured
                ? "(max-width: 1023px) 100vw, 55vw"
                : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.22),transparent_35%),linear-gradient(135deg,#661093,#24102d)] p-8">
            <div className="max-w-sm text-center text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">
                Cut & Sew Tribe
              </p>

              <h3 className="mt-4 text-3xl font-semibold leading-tight">
                {course.title}
              </h3>
            </div>
          </div>
        )}

        {/* Soft image treatment — intentionally NOT a dark overlay. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Category */}
        <div className="absolute left-5 top-5">
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/90 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#661093] shadow-sm backdrop-blur">
            {formatCategory(course.category)}
          </span>
        </div>

        {/* Featured */}
        {course.featured && (
          <div className="absolute right-5 top-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#17110B] shadow-lg">
              <Star className="h-3.5 w-3.5 fill-current" />
              Featured
            </span>
          </div>
        )}

        {/* Preview indicator */}
        {course.preview_video && (
          <div className="absolute bottom-5 left-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md">
              <Play className="h-3.5 w-3.5 fill-current" />
              Preview available
            </span>
          </div>
        )}
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <div
        className={[
          "flex min-w-0 flex-1 flex-col",
          featured ? "p-7 sm:p-9 lg:p-11" : "p-6",
        ].join(" ")}
      >
        {/* Eyebrow / rating */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#661093]/70">
            Fashion education
          </span>

          <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-neutral-700">
            <Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
            <span>4.9</span>
          </div>
        </div>

        {/* Title */}
        <div className={featured ? "mt-5" : "mt-4"}>
          <h2
            className={[
              "font-semibold tracking-tight text-neutral-950",
              "transition-colors duration-300 group-hover:text-[#661093]",
              featured
                ? "max-w-2xl text-3xl leading-[1.08] sm:text-4xl lg:text-[2.7rem]"
                : "text-[1.55rem] leading-[1.12]",
            ].join(" ")}
          >
            {course.title}
          </h2>

          <p className="mt-3 text-sm font-medium text-[#661093]">
            Learn with Cut & Sew Tribe
          </p>
        </div>

        {/* Description */}
        <p
          className={[
            "text-neutral-600",
            featured
              ? "mt-5 max-w-2xl text-base leading-7"
              : "mt-4 line-clamp-3 text-sm leading-6",
          ].join(" ")}
        >
          {course.subtitle ||
            course.description ||
            "Build practical fashion skills through structured lessons designed to help you create with confidence."}
        </p>

        {/* Course facts */}
        <div
          className={[
            "flex flex-wrap border-y border-neutral-100",
            featured
              ? "mt-7 gap-x-7 gap-y-3 py-5"
              : "mt-6 gap-x-5 gap-y-3 py-4",
          ].join(" ")}
        >
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Clock3 className="h-4 w-4 text-[#661093]" />
            <span>{course.duration || "Self-paced"}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Users className="h-4 w-4 text-[#661093]" />

            <span>
              {course.students > 0
                ? `${course.students.toLocaleString()} students`
                : "Open enrollment"}
            </span>
          </div>

          <div className="text-sm font-medium capitalize text-neutral-600">
            {course.level}
          </div>
        </div>

        {/* =======================================================
            PURCHASE AREA
        ======================================================== */}
        <div
          className={[
            "mt-auto flex gap-5",
            featured
              ? "flex-col pt-7 sm:flex-row sm:items-end sm:justify-between"
              : "flex-col pt-6",
          ].join(" ")}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              Course tuition
            </p>

            <p
              className={[
                "mt-1 font-semibold tracking-tight text-neutral-950",
                featured ? "text-3xl" : "text-2xl",
              ].join(" ")}
            >
              {formatPrice(course.price, course.currency)}
            </p>
          </div>

          <div
            className={[
              "flex gap-2.5",
              featured
                ? "sm:min-w-[270px] sm:justify-end"
                : "w-full",
            ].join(" ")}
          >
            <Link
              href={`/courses/${course.slug}`}
              className={[
                "inline-flex items-center justify-center rounded-xl border border-neutral-200",
                "font-semibold text-neutral-800",
                "transition-all duration-300",
                "hover:border-[#661093] hover:text-[#661093] hover:bg-[#661093]/[0.03]",
                featured
                  ? "px-5 py-3.5 text-sm"
                  : "flex-1 px-4 py-3 text-sm",
              ].join(" ")}
            >
              View details
            </Link>

            {hasTelegramAccess ? (
              <a
                href={telegramInviteLink}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "inline-flex items-center justify-center gap-2 rounded-xl",
                  "bg-[#661093] font-semibold text-white",
                  "shadow-[0_10px_25px_rgba(102,16,147,0.18)]",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5 hover:bg-[#520C75] hover:shadow-[0_14px_30px_rgba(102,16,147,0.25)]",
                  featured
                    ? "px-5 py-3.5 text-sm"
                    : "flex-1 px-4 py-3 text-sm",
                ].join(" ")}
              >
                Continue learning
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            ) : (
              <Link
                href={`/courses/${course.slug}`}
                className={[
                  "inline-flex items-center justify-center gap-2 rounded-xl",
                  "bg-[#661093] font-semibold text-white",
                  "shadow-[0_10px_25px_rgba(102,16,147,0.18)]",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5 hover:bg-[#520C75] hover:shadow-[0_14px_30px_rgba(102,16,147,0.25)]",
                  featured
                    ? "px-5 py-3.5 text-sm"
                    : "flex-1 px-4 py-3 text-sm",
                ].join(" ")}
              >
                Enroll now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}