import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  GraduationCap,
  Play,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { Container, Section } from "@/components/ui";
import CourseMarketplaceCard from "@/components/courses/CourseMarketplaceCard";

import { getCurrentUser } from "@/lib/auth/get-user";
import { getCourseTelegramLink } from "@/lib/access/course-access";
import { getPublishedCourses } from "@/lib/lms/courses";

export default async function CoursesPage() {
  const courses = await getPublishedCourses();
  const user = await getCurrentUser();

  /*
   * Determine enrollment and Telegram access for every published course.
   *
   * This remains based on the course slug so existing courses and
   * future courses continue to use the same access behaviour.
   */
  const coursesWithAccess = await Promise.all(
    courses.map(async (course) => {
      if (!user) {
        return {
          course,
          enrolled: false,
          telegramInviteLink: null,
        };
      }

      const telegramInviteLink = await getCourseTelegramLink(course.slug);

      return {
        course,
        enrolled: Boolean(telegramInviteLink),
        telegramInviteLink,
      };
    })
  );

  /*
   * Preserve the existing featured-course logic.
   */
  const featuredCourse =
    coursesWithAccess.find((item) => item.course.featured) ??
    coursesWithAccess[0];

  const remainingCourses = featuredCourse
    ? coursesWithAccess.filter(
        (item) => item.course.id !== featuredCourse.course.id
      )
    : [];

  /*
   * Build useful marketplace facts from the actual published catalogue
   * instead of displaying invented statistics.
   */
  const categoryCount = new Set(
    courses.map((course) => course.category)
  ).size;

  const totalStudents = courses.reduce(
    (total, course) => total + (course.students || 0),
    0
  );

  const featuredDescription =
    featuredCourse?.course.subtitle ||
    featuredCourse?.course.description ||
    "A practical, structured learning experience designed to help you build real fashion skills with confidence.";

  return (
    <>
      {/* =========================================================
    HERO — FULL FASHION COMPOSITION
========================================================== */}
<section className="relative overflow-hidden bg-[#F7F3F8]">
  <div className="relative w-full">
    <Image
      src="/images/courses/hero-fashion-academy.jpg"
      alt="Cut and Sew Tribe fashion academy"
      width={1920}
      height={800}
      priority
      sizes="100vw"
      className="block h-auto w-full object-contain"
    />
  </div>
</section>

      {/* =========================================================
          INTRODUCTION
      ========================================================== */}
      <Section className="bg-white">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#661093]">
                <span className="h-px w-8 bg-[#D4AF37]" />
                The Cut & Sew Tribe Academy
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-neutral-950 sm:text-5xl lg:text-6xl">
                Learn the skills.
                <br />
                <span className="text-[#661093]">Create the garments.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
                Practical fashion education for people who want to move from
                simply loving fashion to confidently creating it. Explore
                structured courses covering sewing, garment construction,
                pattern work, bridal design and more.
              </p>
            </div>

            <div className="lg:pl-8">
              <div className="border-l border-neutral-200 pl-6">
                <p className="text-sm font-semibold text-neutral-900">
                  Your next skill is waiting.
                </p>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Choose a programme, learn at your pace, practise what you
                  learn, and build the confidence to create professionally.
                </p>

                <Link
                  href="#catalogue"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#661093] transition hover:gap-3"
                >
                  Explore the catalogue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          TRUST / CATALOGUE SNAPSHOT
      ========================================================== */}
      <section className="border-y border-neutral-200 bg-[#F8F6FA]">
        <Container className="py-8">
          <div className="grid divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex items-center gap-4 px-0 py-4 sm:px-8 sm:py-2 first:sm:pl-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#661093]/10 text-[#661093]">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xl font-semibold tracking-tight text-neutral-950">
                  {courses.length}
                </p>
                <p className="text-sm text-neutral-500">
                  published {courses.length === 1 ? "programme" : "programmes"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-0 py-4 sm:px-8 sm:py-2">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#8B6F00]">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xl font-semibold tracking-tight text-neutral-950">
                  {categoryCount}
                </p>
                <p className="text-sm text-neutral-500">
                  learning {categoryCount === 1 ? "focus" : "focuses"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-0 py-4 sm:px-8 sm:py-2 last:sm:pr-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#661093]/10 text-[#661093]">
                <Users className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xl font-semibold tracking-tight text-neutral-950">
                  {totalStudents > 0
                    ? totalStudents.toLocaleString()
                    : "Growing"}
                </p>
                <p className="text-sm text-neutral-500">
                  learners across our courses
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          FEATURED PROGRAMME
      ========================================================== */}
      <Section className="bg-[#F8F6FA]">
        <Container className="py-16 sm:py-20 lg:py-24">
          {featuredCourse ? (
            <>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#661093]">
                    Start here
                  </p>

                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                    A programme worth investing in
                  </h2>
                </div>

                <p className="max-w-md text-sm leading-6 text-neutral-500 sm:text-right">
                  One carefully selected programme to help you take the next
                  meaningful step in your fashion journey.
                </p>
              </div>

              <CourseMarketplaceCard
                course={featuredCourse.course}
                featured
                enrolled={featuredCourse.enrolled}
                telegramInviteLink={featuredCourse.telegramInviteLink}
              />
            </>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-neutral-300 bg-white p-12 text-center">
              <GraduationCap className="mx-auto h-10 w-10 text-[#661093]" />

              <h2 className="mt-5 text-2xl font-semibold text-neutral-950">
                Courses are coming soon
              </h2>

              <p className="mx-auto mt-3 max-w-md text-neutral-600">
                Published courses will automatically appear here when they are
                ready for students.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* =========================================================
          WHY BUY / WHY LEARN HERE
      ========================================================== */}
      <Section className="bg-[#120B16] text-white">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                More than a video library
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Learn fashion in a way that moves you forward.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/65">
                Our courses are built around practical skills and structured
                learning — so you are not just watching lessons, but developing
                the confidence to make, refine and create.
              </p>

              <Link
                href="#catalogue"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3.5 text-sm font-bold text-[#17110B] transition hover:-translate-y-0.5 hover:bg-[#E4C35A]"
              >
                Find your programme
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Learn at your pace",
                  text: "Build your skills around your schedule with structured, self-paced programmes.",
                },
                {
                  title: "Practical knowledge",
                  text: "Focus on techniques and processes you can take from the lesson to your sewing table.",
                },
                {
                  title: "Build real confidence",
                  text: "Progress from uncertainty to knowing what to do, why to do it and how to improve.",
                },
                {
                  title: "Keep growing",
                  text: "Return to your learning as you develop and use new skills across different projects.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:border-[#D4AF37]/30 hover:bg-white/[0.07]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37]">
                    0{index + 1}
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          COURSE CATALOGUE
      ========================================================== */}
      <section id="catalogue" className="scroll-mt-20 bg-white">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col gap-8 border-b border-neutral-200 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#661093]">
                <span className="h-px w-8 bg-[#D4AF37]" />
                The catalogue
              </div>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
                Choose where you want your fashion journey to go next.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
                Explore our published programmes and choose the one that best
                matches the skill you want to develop.
              </p>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center rounded-full border border-neutral-200 bg-[#F8F6FA] px-4 py-2 text-sm font-semibold text-neutral-700">
                {courses.length}{" "}
                {courses.length === 1 ? "course" : "courses"} available
              </span>
            </div>
          </div>

          {remainingCourses.length === 0 ? (
            <div className="mt-10 rounded-[2rem] border border-dashed border-neutral-300 bg-[#F8F6FA] p-12 text-center">
              <h3 className="text-2xl font-semibold text-neutral-950">
                More programmes are on the way
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-neutral-600">
                New published courses will automatically become part of the
                marketplace.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {remainingCourses.map(
                ({ course, enrolled, telegramInviteLink }) => (
                  <CourseMarketplaceCard
                    key={course.id}
                    course={course}
                    enrolled={enrolled}
                    telegramInviteLink={telegramInviteLink}
                  />
                )
              )}
            </div>
          )}
        </Container>
      </section>

      {/* =========================================================
          BUYER CONFIDENCE
      ========================================================== */}
      <Section className="bg-[#F8F6FA]">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#661093]">
                Before you enrol
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Choose with confidence.
              </h2>

              <p className="mt-4 max-w-md text-base leading-7 text-neutral-600">
                Every programme should feel like a meaningful investment in
                your craft. Explore the course details before you decide.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "See the programme details before enrolling",
                "Understand the level and learning focus",
                "Know the tuition before you commit",
                "Continue learning through your student access",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-neutral-200 bg-white p-5"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#661093]/10 text-[#661093]">
                    <Check className="h-3.5 w-3.5" />
                  </div>

                  <p className="text-sm font-medium leading-6 text-neutral-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          FEATURED COURSE CONVERSION CTA
      ========================================================== */}
      {featuredCourse && (
        <Section className="bg-white">
          <Container className="py-16 sm:py-20 lg:py-24">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#661093]">
              <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border-[60px] border-[#D4AF37]/20" />
              <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[50px] border-white/10" />

              <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Ready to begin?
                  </div>

                  <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                    Your next fashion skill could start today.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
                    {featuredDescription}
                  </p>
                </div>

                <Link
                  href={`/courses/${featuredCourse.course.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#661093] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#FDFBFF]"
                >
                  Explore this course
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}