import { notFound } from "next/navigation";
import {
  Award,
  Clock3,
  Users,
  CheckCircle2,
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
   *
   * Unenrolled visitors receive null and therefore continue to
   * see the normal Enroll Now / Checkout flow.
   */
  const telegramInviteLink = enrolled
    ? await getCourseTelegramLink(course.slug)
    : null;

  return (
    <>
      {/* Cinematic Hero */}
      <Section className="relative overflow-hidden bg-black p-0">
        <CourseHeroMedia
          title={course.title}
          heroImage={course.hero_image}
          previewVideo={course.previewVideo}
        >
          <Container className="relative z-10">
            <div className="flex min-h-[80vh] items-center">
              <div className="max-w-3xl text-white">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                  {course.level} • {course.category}
                </div>

                <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight lg:text-7xl">
                  {course.title}
                </h1>

                {course.subtitle && (
                  <p className="mt-4 text-2xl font-semibold text-[#D4AF37] lg:text-3xl">
                    {course.subtitle}
                  </p>
                )}

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 lg:text-xl">
                  {course.description ??
                    "Build professional garment construction skills through a structured, practical fashion curriculum designed by Cut and Sew Tribe tutors."}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    {
                      icon: Users,
                      label: `${course.students}+ students`,
                    },
                    {
                      icon: Clock3,
                      label:
                        course.duration ?? "Self-paced learning",
                    },
                    {
                      icon: Award,
                      label: "Certificate included",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur"
                    >
                      <item.icon className="h-4 w-4 text-[#D4AF37]" />
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  {enrolled && telegramInviteLink ? (
                    <a
                      href={telegramInviteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-[#661093] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#55107d]"
                    >
                      Join Course on Telegram
                    </a>
                  ) : (
                    <CheckoutButton slug={course.slug} />
                  )}

                  {course.previewVideo && (
                    <span className="inline-flex items-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-medium text-white backdrop-blur">
                      ▶ Preview available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </CourseHeroMedia>
      </Section>

      {/* Main content */}
      <Section className="bg-neutral-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-10">
              {/* Curriculum */}
              <CourseCurriculum modules={course.modules} />

              {/* Outcomes */}
              <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#661093]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#661093]">
                  What you&apos;ll achieve
                </div>

                <h2 className="mt-4 text-3xl font-bold text-neutral-900">
                  Skills you can use immediately
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    "Draft and interpret garment patterns confidently",
                    "Take accurate body measurements",
                    "Cut and prepare fabric professionally",
                    "Construct garments with clean finishing techniques",
                    "Work faster with efficient sewing workflows",
                    "Price and present garments for paying clients",
                    "Build a professional fashion portfolio",
                    "Launch or grow a fashion business with confidence",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-neutral-200 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#661093]" />
                      <span className="text-neutral-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Telegram community */}
              {enrolled && telegramInviteLink && (
                <section className="rounded-3xl border border-[#229ED9]/20 bg-[#229ED9]/5 p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#229ED9]">
                        Student community
                      </div>

                      <h2 className="mt-2 text-2xl font-bold text-neutral-900">
                        Learn alongside other fashion students
                      </h2>

                      <p className="mt-3 max-w-2xl text-neutral-700">
                        Get feedback on your garments, ask questions,
                        share your progress, and receive course updates
                        through our private Telegram community.
                      </p>
                    </div>

                    <a
                      href={telegramInviteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#229ED9] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                      Join Telegram
                    </a>
                  </div>
                </section>
              )}

              {/* FAQ */}
              <CourseFAQ />

              {/* Final CTA */}
              <EnrollmentCTA
                courseSlug={course.slug}
                enrolled={enrolled}
                telegramInviteLink={telegramInviteLink}
              />
            </div>

            {/* Sticky pricing */}
            <div id="pricing">
              <PricingCard
                price={course.price}
                currency={course.currency}
                courseSlug={course.slug}
                enrolled={enrolled}
                telegramInviteLink={telegramInviteLink}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}