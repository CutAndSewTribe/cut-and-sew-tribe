import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Star, PlayCircle, ArrowRight } from "lucide-react";

import type { LMSCourse } from "@/lib/lms/courses";

interface CourseMarketplaceCardProps {
  course: LMSCourse;
  featured?: boolean;
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

export default function CourseMarketplaceCard({
  course,
  featured = false,
}: CourseMarketplaceCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#661093]/30 hover:shadow-2xl ${
        featured ? "lg:flex lg:h-[420px]" : "h-full"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-linear-to-br from-[#661093] via-[#7A1FA2] to-[#D4AF37] ${
          featured ? "lg:w-[46%]" : "aspect-4/5"
        }`}
      >
        {course.thumbnail ? (
          <Image
            src={
              course.thumbnail.startsWith("http")
                ? course.thumbnail
                : `/${course.thumbnail}`
            }
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                Cut and Sew Tribe
              </p>
              <h3 className="mt-4 text-3xl font-bold leading-tight text-white">
                {course.title}
              </h3>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#661093]">
            {course.level}
          </span>
          {course.featured && (
            <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-semibold text-black">
              Featured
            </span>
          )}
        </div>

        {course.preview_video && (
          <div className="absolute bottom-5 right-5 rounded-full bg-white/95 p-3 text-[#661093] shadow-lg transition-transform group-hover:scale-110">
            <PlayCircle className="h-6 w-6" />
          </div>
        )}
      </div>

      <div
        className={`flex flex-1 flex-col p-6 ${
          featured ? "lg:p-8" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#661093]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#661093]">
            {course.category}
          </span>

          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
            <span>4.9</span>
          </div>
        </div>

        <div className="mt-5 flex-1">
          <h3
            className={`font-bold text-neutral-900 transition-colors group-hover:text-[#661093] ${
              featured ? "text-3xl leading-tight" : "text-2xl leading-tight"
            }`}
          >
            {course.title}
          </h3>

          <p className="mt-3 text-sm font-medium text-[#661093]">
            By Cut and Sew Tribe
          </p>

          <p className="mt-4 line-clamp-3 text-neutral-600">
            {course.subtitle ||
              course.description ||
              "Master professional garment construction, pattern interpretation, finishing techniques, and fashion business strategies through a structured, industry-focused learning experience."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#661093]" />
              <span>{course.duration || "Self-paced"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#661093]" />
              <span>
                {course.students > 0
                  ? `${course.students.toLocaleString()} students`
                  : "Open enrollment"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-neutral-100 pt-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              Tuition
            </p>
            <p className="text-2xl font-bold text-neutral-900">
              {formatPrice(course.price, course.currency)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-[#661093] hover:text-[#661093]"
            >
              View details
            </Link>

            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#661093] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#520C75]"
            >
              Enroll now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}