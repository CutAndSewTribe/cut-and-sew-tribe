import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Eye,
  MessageCircle,
  Play,
  Scissors,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { Container, Section } from "@/components/ui";
import CourseCard from "@/features/courses/components/CourseCard";

import {
  getFeaturedCourses,
  getHomepageStats,
} from "@/lib/instructor/courses";
import {
  getPublishedVideos,
} from "@/lib/instructor/videos";

import { patterns } from "@/content/patterns";
import { resources } from "@/content/resources";
import { studentStories } from "@/content/success-stories";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cut & Sew Tribe | Learn Fashion. Make Better Garments.",
  description:
    "Learn fashion design, sewing, pattern drafting, garment construction, and fashion business through practical courses, free video lessons, patterns, resources, and creative community.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cut & Sew Tribe | Learn Fashion. Make Better Garments.",
    description:
      "Practical fashion education through structured courses, free lessons, patterns, resources, and community.",
    url: "https://www.cutandsewtribe.com/",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cut & Sew Tribe Fashion Academy",
      },
    ],
  },
};

function formatDuration(seconds: number | null): string {
  if (seconds === null || seconds < 0) {
    return "Lesson";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      remainingSeconds.toString().padStart(2, "0"),
    ].join(":");
  }

  return [
    minutes.toString().padStart(2, "0"),
    remainingSeconds.toString().padStart(2, "0"),
  ].join(":");
}

function formatViews(views: number): string {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M`;
  }

  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K`;
  }

  return views.toString();
}

function getCategoryLabel(category: string): string {
  return category
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

function getImage(
  value: string | null | undefined,
  fallback: string,
): string {
  return value && value.trim() !== "" ? value : fallback;
}

export default async function Home() {
  const [featuredCourses, stats, publishedVideos] =
    await Promise.all([
      getFeaturedCourses(),
      getHomepageStats(),
      getPublishedVideos(),
    ]);

  const courses = featuredCourses.slice(0, 4);
  const heroCourse = courses[0] ?? null;

  const videos = publishedVideos.slice(0, 6);
  const featuredVideo =
    publishedVideos.find((video) => video.featured) ??
    publishedVideos[0] ??
    null;

  const featuredPatterns = patterns
    .filter((pattern) => pattern.featured)
    .slice(0, 4);

  const featuredResources = resources
    .filter((resource) => resource.featured)
    .slice(0, 3);

  const featuredStories = studentStories
    .filter((story) => story.featured)
    .slice(0, 3);

  const heroImage = getImage(
    heroCourse?.hero_image,
    "/images/backgrounds/fashion-hero.jpg",
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Cut & Sew Tribe",
    url: "https://www.cutandsewtribe.com",
    logo: "https://www.cutandsewtribe.com/brand/logo.png",
    description:
      "Online fashion design, sewing, pattern drafting, garment construction, and fashion business academy.",
    sameAs: [
      "https://www.instagram.com/cutandsewtribelimited",
      "https://www.tiktok.com/@cutandsewtribe",
      "https://youtube.com/@cutandsewtribe",
      "https://www.facebook.com/divinebridal.babiesworld",
    ],
  };

  return (
    <main className="overflow-hidden bg-white text-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0b0710] text-white">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-cover object-center opacity-25"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0710] via-[#321044]/95 to-[#661093]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0710] via-transparent to-[#0b0710]/30" />

          <div className="absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full bg-[#661093]/35 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#D4AF37]/10 blur-3xl" />
        </div>

        <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                Practical fashion education
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
                Learn fashion.
                <br />
                <span className="text-[#D4AF37]">
                  Make better garments.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                Learn sewing, pattern drafting, garment construction,
                and fashion business through practical lessons designed
                to move you from watching to actually making.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-4 text-sm font-bold text-black shadow-[0_18px_50px_rgba(212,175,55,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e4c45b]"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/videos"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:bg-white/15"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Watch Free Lessons
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/50">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                  Beginner friendly
                </span>

                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                  Learn at your pace
                </span>

                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                  Practical skills
                </span>
              </div>
            </div>

            {/* Featured course visual */}
            {heroCourse && (
              <div className="relative lg:pl-8">
                <div className="absolute -inset-5 rounded-[2.5rem] bg-[#661093]/25 blur-2xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-md">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={heroImage}
                      alt={heroCourse.title}
                      fill
                      className="object-cover transition duration-700 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                    <div className="absolute left-5 top-5 rounded-full bg-[#D4AF37] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-black">
                      Featured course
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                        {getCategoryLabel(heroCourse.category)}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
                        {heroCourse.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="line-clamp-2 text-sm leading-6 text-white/60">
                      {heroCourse.description ??
                        "A structured practical fashion course designed to help you build real garment-making skills."}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/40">
                          {heroCourse.level}
                          {heroCourse.duration
                            ? ` · ${heroCourse.duration}`
                            : ""}
                        </p>

                        <p className="mt-1 text-2xl font-bold text-[#D4AF37]">
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency:
                              heroCourse.currency || "NGN",
                            maximumFractionDigits: 0,
                          }).format(heroCourse.price)}
                        </p>
                      </div>

                      <Link
                        href={`/courses/${heroCourse.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#661093] transition hover:bg-[#D4AF37] hover:text-black"
                      >
                        View course
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* =====================================================
          TRUST BAND
      ====================================================== */}
      <section className="border-b border-neutral-200 bg-white">
        <Container className="py-7">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <Users className="h-7 w-7 shrink-0 text-[#661093]" />
              <div>
                <p className="text-sm font-bold text-neutral-950">
                  1,000+ learners
                </p>
                <p className="text-xs text-neutral-500">
                  Learning across Nigeria and beyond
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Scissors className="h-7 w-7 shrink-0 text-[#661093]" />
              <div>
                <p className="text-sm font-bold text-neutral-950">
                  Practical training
                </p>
                <p className="text-xs text-neutral-500">
                  Skills you can apply immediately
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 shrink-0 text-[#661093]" />
              <div>
                <p className="text-sm font-bold text-neutral-950">
                  Secure checkout
                </p>
                <p className="text-xs text-neutral-500">
                  Paystack-powered payments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageCircle className="h-7 w-7 shrink-0 text-[#661093]" />
              <div>
                <p className="text-sm font-bold text-neutral-950">
                  Creative community
                </p>
                <p className="text-xs text-neutral-500">
                  Support and accountability
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          LEARNING PATHS
      ====================================================== */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
              Find your direction
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
              Start where you are.
              <br />
              <span className="text-neutral-400">
                Build from there.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-neutral-600">
              Whether you are learning your first stitch, improving your
              pattern drafting, or building a fashion business, there is
              a practical path for your next step.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Sewing & Garment Making",
                text: "Learn construction techniques and turn fabric into finished garments.",
                href: "/courses?category=dressmaking",
              },
              {
                number: "02",
                title: "Pattern Drafting",
                text: "Understand the foundations behind fit, shape, proportion, and design.",
                href: "/courses?category=pattern-drafting",
              },
              {
                number: "03",
                title: "Bridal & Special Occasion",
                text: "Explore techniques for elevated garments and statement pieces.",
                href: "/courses?category=bridal",
              },
              {
                number: "04",
                title: "Fashion Business",
                text: "Develop the practical knowledge needed to turn your craft into income.",
                href: "/courses?category=fashion-business",
              },
            ].map((path) => (
              <Link
                key={path.number}
                href={path.href}
                className="group relative overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-[#661093]/30 hover:bg-[#661093] hover:shadow-[0_20px_50px_rgba(102,16,147,0.16)]"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-[#661093] transition group-hover:text-[#D4AF37]">
                  {path.number}
                </span>

                <h3 className="mt-12 text-xl font-bold leading-tight text-neutral-950 transition group-hover:text-white">
                  {path.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500 transition group-hover:text-white/65">
                  {path.text}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#661093] transition group-hover:text-[#D4AF37]">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* =====================================================
          LIVE PLATFORM STATS
      ====================================================== */}
      <section className="bg-[#f7f5f8]">
        <Container className="py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BookOpen,
                value: stats.publishedCourses,
                label: "Published courses",
              },
              {
                icon: Award,
                value: stats.featuredCourses,
                label: "Featured programs",
              },
              {
                icon: Play,
                value: publishedVideos.length,
                label: "Free video lessons",
              },
              {
                icon: Users,
                value: "1,000+",
                label: "Creative community members",
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-neutral-200 bg-white p-6"
                >
                  <Icon className="h-6 w-6 text-[#661093]" />

                  <p className="mt-5 text-3xl font-bold tracking-tight text-neutral-950">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================
          FEATURED COURSES
      ====================================================== */}
      <Section className="bg-white">
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
                Learn with structure
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
                Courses built for making.
              </h2>

              <p className="mt-4 text-base leading-7 text-neutral-600">
                Go beyond scattered tutorials with structured training
                designed to help you understand the process and actually
                produce better work.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#661093]"
            >
              View all courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  slug={course.slug}
                  description={course.description}
                  thumbnail={getImage(
                    course.thumbnail,
                    getImage(
                      course.hero_image,
                      "/images/courses/beginner-fashion-design.jpg",
                    ),
                  )}
                  category={course.category}
                  level={course.level}
                  price={course.price}
                  currency={course.currency}
                  duration={course.duration}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-neutral-300 px-6 py-16 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-[#661093]" />
              <p className="mt-4 font-semibold text-neutral-900">
                New courses are coming soon.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* =====================================================
          FREE VIDEO LEARNING
      ====================================================== */}
      {featuredVideo && (
        <section className="bg-[#0b0710] text-white">
          <Container className="py-20 lg:py-24">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Learn something today
                </p>

                <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                  Free lessons.
                  <br />
                  Real techniques.
                </h2>

                <p className="mt-5 text-base leading-7 text-white/55">
                  Explore practical fashion lessons before committing to
                  a course. Learn something useful, then choose the path
                  that takes you further.
                </p>
              </div>

              <Link
                href="/videos"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#D4AF37]"
              >
                Browse video library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {videos.slice(0, 6).map((video) => (
                <Link
                  key={video.id}
                  href={`/videos/${video.slug}`}
                  className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-[#661093]"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    {video.thumbnail_url ? (
                      <Image
                        src={video.thumbnail_url}
                        alt={video.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#661093] to-[#24132d]" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                    <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {getCategoryLabel(video.category)}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#661093] shadow-xl transition duration-300 group-hover:scale-110">
                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/75">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        {formatDuration(video.duration_seconds)}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5" />
                        {formatViews(video.views)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 text-lg font-bold leading-snug transition group-hover:text-[#D4AF37]">
                      {video.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/45">
                      {video.description ??
                        "A practical fashion lesson from Cut & Sew Tribe."}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/70">
                      Watch lesson
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* =====================================================
          PATTERNS + RESOURCES
      ====================================================== */}
      {(featuredPatterns.length > 0 ||
        featuredResources.length > 0) && (
        <Section className="bg-[#f7f5f8]">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
                  Your learning toolkit
                </p>

                <h2 className="mt-3 text-4xl font-bold tracking-tight text-neutral-950">
                  More than courses.
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600">
                  Build your practice with patterns, guides, checklists,
                  and other resources that help turn lessons into action.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/patterns"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#661093] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7815aa]"
                  >
                    Explore Patterns
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:border-[#661093]/30"
                  >
                    Browse Resources
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {featuredPatterns.slice(0, 2).map((pattern) => (
                  <Link
                    key={pattern.id}
                    href={`/patterns/${pattern.slug}`}
                    className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <Scissors className="h-6 w-6 text-[#661093]" />
                      <ArrowRight className="h-4 w-4 text-neutral-300 transition group-hover:translate-x-1 group-hover:text-[#661093]" />
                    </div>

                    <h3 className="mt-8 font-bold text-neutral-950">
                      {pattern.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">
                      {pattern.excerpt}
                    </p>
                  </Link>
                ))}

                {featuredResources.slice(0, 2).map((resource) => (
                  <Link
                    key={resource.id}
                    href={`/resources/${resource.slug}`}
                    className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <BookOpen className="h-6 w-6 text-[#661093]" />
                      <ArrowRight className="h-4 w-4 text-neutral-300 transition group-hover:translate-x-1 group-hover:text-[#661093]" />
                    </div>

                    <h3 className="mt-8 font-bold text-neutral-950">
                      {resource.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">
                      {resource.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* =====================================================
          COMMUNITY / OUTCOME
      ====================================================== */}
      <Section className="bg-white">
        <Container>
          <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-[#0b0710] text-white">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-8 sm:p-10 lg:p-14">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Learn with people
                </p>

                <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                  You do not have to build your fashion skills alone.
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
                  Join a creative community where learning continues
                  beyond the lesson — with support, accountability,
                  questions, shared progress, and people working toward
                  the same craft.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Practical guidance",
                    "Creative accountability",
                    "Support when you get stuck",
                    "A community of makers",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-white/75"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  href="/community"
                  className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-black transition hover:bg-[#e4c45b]"
                >
                  Discover the community
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative min-h-[320px] overflow-hidden bg-[#661093]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#661093] via-[#4b0b6d] to-[#17091e]" />

                <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-[#9a2bc9]/30 blur-3xl" />

                <div className="relative flex h-full flex-col justify-end p-8 sm:p-10">
                  <MessageCircle className="h-12 w-12 text-[#D4AF37]" />

                  <p className="mt-8 max-w-sm text-2xl font-bold leading-tight">
                    Learn the technique. Practice the skill. Build the
                    confidence.
                  </p>

                  <div className="mt-5 flex items-center gap-3 text-sm text-white/55">
                    <Users className="h-4 w-4" />
                    1,000+ creative community members
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          STUDENT STORIES
      ====================================================== */}
      {featuredStories.length > 0 && (
        <Section className="bg-[#f7f5f8]">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
                  Learner stories
                </p>

                <h2 className="mt-3 text-4xl font-bold tracking-tight text-neutral-950">
                  The work speaks.
                </h2>
              </div>

              <Link
                href="/success-stories"
                className="hidden items-center gap-2 text-sm font-bold text-[#661093] sm:inline-flex"
              >
                See more stories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {featuredStories.map((story) => (
                <div
                  key={story.id}
                  className="rounded-2xl border border-neutral-200 bg-white p-6"
                >
                  <p className="text-lg leading-8 text-neutral-700">
                    “{story.shortStory}”
                  </p>

                  <div className="mt-7 border-t border-neutral-100 pt-5">
                    <p className="font-bold text-neutral-950">
                      {story.name}
                    </p>

                    {story.achievement && (
                      <p className="mt-1 text-sm text-neutral-500">
                        {story.achievement}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* =====================================================
          FINAL CONVERSION
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#661093] text-white">
        <div className="absolute inset-0">
          <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#D4AF37]/15 blur-3xl" />
        </div>

        <Container className="relative py-20 text-center sm:py-24 lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Your next step
          </p>

          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Your next garment could start here.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Explore the courses, watch a free lesson, find a useful
            resource, and start building the fashion skill you have been
            thinking about.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-7 py-4 text-sm font-bold text-black transition hover:bg-[#e4c45b]"
            >
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/videos"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              <Play className="h-4 w-4 fill-current" />
              Start with a Free Lesson
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
