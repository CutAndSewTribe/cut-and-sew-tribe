import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock3,
  PlayCircle,
} from "lucide-react";

import { Container, Section } from "@/components/ui";

import { getCurrentUser } from "@/lib/auth/get-user";
import {
  getCourseTelegramLink,
  hasCourseAccess,
} from "@/lib/access/course-access";
import { getCourseLandingPageData } from "@/lib/lms/courses";

import CourseCurriculum from "@/features/courses/components/CourseCurriculum";
import PricingCard from "@/features/courses/components/PricingCard";
import CourseFAQ from "@/features/courses/components/CourseFAQ";
import EnrollmentCTA from "@/features/courses/components/EnrollmentCTA";
import CourseHeroMedia from "@/features/courses/components/CourseHeroMedia";
import CheckoutButton from "@/components/checkout/CheckoutButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await getCourseLandingPageData(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} | Cut and Sew Tribe`,
    description:
      course.description ??
      `Master ${course.title} with Cut and Sew Tribe's premium fashion training program.`,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await getCourseLandingPageData(slug);

  if (!course) {
    notFound();
  }

  const user = await getCurrentUser();

  const enrolled = user
    ? await hasCourseAccess(course.slug)
    : false;

  /*
   * Telegram access is private.
   *
   * Only retrieve the Telegram invite link for an authenticated
   * student who has an active enrollment.
   */
  const telegramInviteLink = enrolled
    ? await getCourseTelegramLink(course.slug)
    : null;

  const courseImage =
    course.thumbnail ??
    course.hero_image ??
    "/images/courses/hero-fashion-academy.jpg";

  return (
    <>
      {/* =========================================================
          COURSE HERO
         ========================================================= */}
      <Section className="bg-[#f7f6f3] py-8 md:py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-6xl">
            {/* Main course image */}
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.10)]">
              <div className="relative aspect-[16/8] overflow-hidden">
                <img
                  src={courseImage}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                {course.previewVideo && (
                  <div className="absolute bottom-5 left-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                      <PlayCircle className="h-4 w-4" />
                      Course preview available
                    </div>
                  </div>
                )}
              </div>

              {/* Hero information */}
              <div className="p-6 md:p-8 lg:p-10">
                {/* CTA comes first */}
                <div className="flex flex-wrap items-center gap-3">
                  {enrolled && telegramInviteLink ? (
                    <a
                      href={telegramInviteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#661093] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#661093]/20 transition hover:bg-[#55107d]"
                    >
                      Continue learning
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <CheckoutButton slug={course.slug} />
                  )}
                </div>

                {/* Category / level */}
                <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#661093]">
                  <span>{course.category}</span>
                  <span className="text-neutral-300">•</span>
                  <span>{course.level}</span>
                </div>

                {/* Title */}
                <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
                  {course.title}
                </h1>

                {course.subtitle && (
                  <p className="mt-4 max-w-3xl text-lg font-medium leading-7 text-neutral-600 md:text-xl">
                    {course.subtitle}
                  </p>
                )}

                {/* Small course facts */}
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-600">
                  {course.duration && (
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-[#661093]" />
                      <span>{course.duration}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#661093]" />
                    <span>Certificate included</span>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                DESCRIPTION
               ===================================================== */}
            <div className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8 lg:p-10">
              <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
                  About this course
                </p>

                <div className="mt-5 whitespace-pre-wrap text-base leading-8 text-neutral-800 md:text-lg">
                  {course.description ??
                    "Build professional garment construction skills through a structured, practical fashion curriculum designed by Cut and Sew Tribe tutors."}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          COURSE CONTENT
         ========================================================= */}
      <Section className="bg-white py-12 md:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
              {/* Main column */}
              <div className="space-y-10">
                {/* What you'll achieve */}
                <section>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
                    What you&apos;ll achieve
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">
                    Practical skills you can use
                  </h2>

                  <div className="mt-7 grid gap-3 md:grid-cols-2">
                    {[
                      "Draft and interpret garment patterns confidently",
                      "Take accurate body measurements",
                      "Cut and prepare fabric professionally",
                      "Construct garments with clean finishing techniques",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-[#fafafa] p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#661093]" />

                        <span className="text-sm leading-6 text-neutral-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Curriculum */}
                {course.modules.length > 0 && (
                  <section>
                    <div className="mb-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
                        Course curriculum
                      </p>

                      <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">
                        What&apos;s inside
                      </h2>
                    </div>

                    <CourseCurriculum modules={course.modules} />
                  </section>
                )}

                {/* Telegram community */}
                {enrolled && telegramInviteLink && (
                  <section className="rounded-[2rem] border border-[#229ED9]/15 bg-[#229ED9]/5 p-6 md:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#229ED9]">
                          Student community
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-neutral-950">
                          Learn with other students
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700">
                          Ask questions, share your progress, receive
                          feedback, and stay connected through the private
                          course community.
                        </p>
                      </div>

                      <a
                        href={telegramInviteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#229ED9] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                      >
                        Join Telegram
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </section>
                )}

                {/* FAQ */}
                <section>
                  <CourseFAQ />
                </section>

                {/* Final CTA */}
                <EnrollmentCTA
                  courseSlug={course.slug}
                  enrolled={enrolled}
                  telegramInviteLink={telegramInviteLink}
                />
              </div>

              {/* Pricing */}
              <aside>
                <div className="lg:sticky lg:top-24" id="pricing">
                  <PricingCard
                    price={course.price}
                    currency={course.currency}
                    courseSlug={course.slug}
                    enrolled={enrolled}
                    telegramInviteLink={telegramInviteLink}
                  />
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}