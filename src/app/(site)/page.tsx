import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Users,
  Award,
  MessageCircle,
  Play,
  BookOpen,
} from "lucide-react";

import { Button, Container, Section } from "@/components/ui";
import CourseCard from "@/features/courses/components/CourseCard";
import VideoCard from "@/components/media/VideoCard";
import PatternCard from "@/components/media/PatternCard";
import ResourceCard from "@/components/media/ResourceCard";
import StudentStoryCard from "@/components/media/StudentStoryCard";

import {
  getFeaturedCourses,
  getHomepageStats,
} from "@/lib/instructor/courses";

import { videos } from "@/content/videos";
import { patterns } from "@/content/patterns";
import { resources } from "@/content/resources";
import { studentStories } from "@/content/success-stories";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cut & Sew Tribe | Online Fashion Design & Sewing Academy",
  description:
    "Learn fashion design, sewing, pattern drafting, garment construction, and fashion business from beginner to professional level. Join Nigeria's practical online fashion school.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cut & Sew Tribe | Online Fashion Design & Sewing Academy",
    description:
      "Practical fashion design and sewing education with courses, tutorials, downloadable patterns, and a thriving creative community.",
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

function getYouTubeEmbedUrl(url: string | null | undefined) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}?rel=0`;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) {
        return `https://www.youtube.com/embed/${id}?rel=0`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const [featuredCourses, stats] = await Promise.all([
    getFeaturedCourses(),
    getHomepageStats(),
  ]);

  const courses = featuredCourses.slice(0, 4);

  const heroCourse = courses[0];

  const featuredVideos = videos
    .filter((video) => video.featured)
    .slice(0, 3);

  const featuredPatterns = patterns
    .filter((pattern) => pattern.featured)
    .slice(0, 6);

  const featuredResources = resources
    .filter((resource) => resource.featured)
    .slice(0, 3);

  const featuredStories = studentStories
    .filter((story) => story.featured)
    .slice(0, 3);

  const heroImage =
    heroCourse?.hero_image && heroCourse.hero_image.trim() !== ""
      ? heroCourse.hero_image
      : "/images/backgrounds/fashion-hero.jpg";

  const previewEmbed = getYouTubeEmbedUrl(heroCourse?.preview_video);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Cut & Sew Tribe",
    url: "https://www.cutandsewtribe.com",
    logo: "https://www.cutandsewtribe.com/brand/logo.png",
    description:
      "Online fashion design, sewing, and pattern drafting academy for beginners and professionals.",
    sameAs: [
      "https://www.instagram.com/cutandsewtribelimited",
      "https://www.tiktok.com/@cutandsewtribe",
      "https://youtube.com/@cutandsewtribe",
      "https://www.facebook.com/divinebridal.babiesworld",
    ],
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Featured course hero */}
      <section className="relative overflow-hidden bg-[#661093]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#661093] via-[#661093]/90 to-[#661093]/70" />

        <Container className="relative py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Featured Course
              </p>

              <h1 className="mt-4 text-5xl font-bold leading-tight lg:text-7xl">
                {heroCourse?.title ??
                  "Learn fashion design, sewing, and pattern drafting from anywhere."}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
                {heroCourse?.description ??
                  "Join thousands of aspiring fashion designers, tailors, and entrepreneurs learning practical garment construction, pattern making, and fashion business skills through structured online training."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={heroCourse ? `/courses/${heroCourse.slug}` : "/courses"}>
                  Enroll Now
                </Button>

                {heroCourse?.preview_video ? (
                  <Button href={`/courses/${heroCourse.slug}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Watch Preview
                  </Button>
                ) : (
                  <Button href="/videos">
                    Watch Free Tutorials
                  </Button>
                )}
              </div>
            </div>

            {heroCourse && (
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur">
                {previewEmbed ? (
                  <div className="aspect-video overflow-hidden rounded-2xl">
                    <iframe
                      src={previewEmbed}
                      title={`${heroCourse.title} preview`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white/10">
                    <img
                      src={heroImage}
                      alt={heroCourse.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="mt-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                    {heroCourse.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">
                    {heroCourse.title}
                  </h3>
                  <p className="mt-2 text-white/80">
                    {heroCourse.level}
                    {heroCourse.duration ? ` • ${heroCourse.duration}` : ""}
                  </p>
                  <p className="mt-4 text-3xl font-bold text-[#D4AF37]">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: heroCourse.currency || "NGN",
                      maximumFractionDigits: 0,
                    }).format(heroCourse.price)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Trust strip */}
      <Section className="border-b border-neutral-200 bg-white py-8">
        <Container>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-[#661093]" />
              <div>
                <p className="font-semibold text-neutral-900">
                  1,000+ Students
                </p>
                <p className="text-sm text-neutral-600">
                  Learning across Nigeria and beyond
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-[#661093]" />
              <div>
                <p className="font-semibold text-neutral-900">
                  Practical Fashion Training
                </p>
                <p className="text-sm text-neutral-600">
                  Real garment construction skills
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-[#661093]" />
              <div>
                <p className="font-semibold text-neutral-900">
                  Secure Payments
                </p>
                <p className="text-sm text-neutral-600">
                  Paystack-powered checkout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-[#661093]" />
              <div>
                <p className="font-semibold text-neutral-900">
                  Telegram Community
                </p>
                <p className="text-sm text-neutral-600">
                  Support and accountability
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Live stats */}
      <Section className="bg-neutral-50">
        <Container>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-neutral-900">
                {stats.publishedCourses}
              </div>
              <p className="mt-2 text-neutral-600">
                Published courses
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-8">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
                <Award className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-neutral-900">
                {stats.featuredCourses}
              </div>
              <p className="mt-2 text-neutral-600">
                Featured programs
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-8">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
                <Play className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-neutral-900">
                {featuredVideos.length}
              </div>
              <p className="mt-2 text-neutral-600">
                Free video tutorials
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-8">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-neutral-900">
                1,000+
              </div>
              <p className="mt-2 text-neutral-600">
                Creative community members
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured courses */}
      <Section className="bg-neutral-50">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
                Learn
              </p>
              <h2 className="mt-2 text-4xl font-bold text-neutral-900">
                Featured Courses
              </h2>
            </div>

            <Link href="/courses" className="font-semibold text-[#661093]">
              View all courses
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                slug={course.slug}
                description={course.description}
                thumbnail={
                  course.thumbnail && course.thumbnail.trim() !== ""
                    ? course.thumbnail
                    : course.hero_image && course.hero_image.trim() !== ""
                      ? course.hero_image
                      : "/images/courses/beginner-fashion-design.jpg"
                }
                category={course.category}
                level={course.level}
                price={course.price}
                currency={course.currency}
                duration={course.duration}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Keep the rest of your existing homepage sections exactly as they are */}
    </div>
  );
}