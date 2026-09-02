import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Eye,
  Play,
  Scissors,
  Sparkles,
} from "lucide-react";

import { Section } from "@/components/ui";
import { getPublishedVideos } from "@/lib/instructor/videos";

function formatDuration(seconds: number | null): string {
  if (seconds === null || seconds < 0) {
    return "Video";
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

function getCategoryLabel(category: string): string {
  return category
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
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

function getVideoThumbnail(
  thumbnailUrl: string | null,
): string {
  return (
    thumbnailUrl ??
    "/videos/thumbnails/beginner-sewing-tools.jpg"
  );
}

export default async function VideosPage() {
  const videos = await getPublishedVideos();

  const featuredVideo =
    videos.find((video) => video.featured) ?? videos[0] ?? null;

  const categories = Array.from(
    new Set(videos.map((video) => video.category)),
  ).slice(0, 5);

  return (
    <main className="overflow-hidden bg-[#08070a] text-white">
      {/* ─────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────── */}
      <section className="relative isolate min-h-[720px] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{
              backgroundImage: `url("${
                featuredVideo
                  ? getVideoThumbnail(featuredVideo.thumbnail_url)
                  : "/videos/thumbnails/beginner-sewing-tools.jpg"
              }")`,
            }}
          />

          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08070a] via-[#08070a]/85 to-[#08070a]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08070a] via-transparent to-[#08070a]/30" />

          <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-[#661093]/30 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Cut &amp; Sew Tribe Video Library
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Learn.
              <span className="text-[#D4AF37]"> Make.</span>
              <br />
              Master.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
              Practical sewing, pattern drafting, garment construction,
              and fashion lessons designed to help you turn knowledge
              into work you can actually wear, sell, and be proud of.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#661093] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(102,16,147,0.35)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#7815aa]"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>

              {featuredVideo && (
                <Link
                  href={`/videos/${featuredVideo.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:bg-white/15"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Watch Featured Lesson
                </Link>
              )}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/55">
              <span className="inline-flex items-center gap-2">
                <Play className="h-4 w-4 text-[#D4AF37]" />
                {videos.length} practical{" "}
                {videos.length === 1 ? "lesson" : "lessons"}
              </span>

              <span className="inline-flex items-center gap-2">
                <Scissors className="h-4 w-4 text-[#D4AF37]" />
                Sewing &amp; fashion skills
              </span>

              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#D4AF37]" />
                Learn at your pace
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08070a] to-transparent" />
      </section>

      {/* ─────────────────────────────────────────────
          LIBRARY INTRO
      ───────────────────────────────────────────── */}
      <Section>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#16121a] via-[#100d13] to-[#0b0a0d] p-7 sm:p-9 lg:p-12">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#661093]/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Explore the library
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Practical knowledge.
                <br />
                <span className="text-white/55">
                  Beautifully made.
                </span>
              </h2>

              <p className="mt-4 text-base leading-7 text-white/60">
                Start with a lesson that catches your eye, discover
                techniques from different areas of fashion, and build
                your skills one practical lesson at a time.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/65"
                >
                  {getCategoryLabel(category)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────
          EMPTY STATE
      ───────────────────────────────────────────── */}
      {videos.length === 0 ? (
        <Section>
          <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.03] px-6 py-24 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#661093]/15 text-[#D4AF37]">
              <Play className="h-8 w-8 fill-current" />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">
              New lessons are coming soon
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/55">
              We are preparing practical sewing, drafting, and fashion
              lessons for the Cut and Sew Tribe video library.
            </p>

            <Link
              href="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#661093] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#7815aa]"
            >
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      ) : (
        <>
          {/* ─────────────────────────────────────────
              FEATURED VIDEO
          ───────────────────────────────────────── */}
          {featuredVideo && (
            <Section>
              <div className="mb-7 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    Featured lesson
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Start here
                  </h2>
                </div>

                <span className="hidden text-sm text-white/40 sm:block">
                  Handpicked from the library
                </span>
              </div>

              <Link
                href={`/videos/${featuredVideo.slug}`}
                className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-[#121015]"
              >
                <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
                  <div className="relative aspect-video overflow-hidden bg-black lg:aspect-auto lg:min-h-[430px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("${getVideoThumbnail(
                          featuredVideo.thumbnail_url,
                        )}")`,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />

                    <div className="absolute left-6 top-6 rounded-full bg-[#D4AF37] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-black">
                      Featured
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#661093] shadow-2xl transition duration-300 group-hover:scale-110">
                        <Play className="ml-1 h-6 w-6 fill-current" />
                      </div>
                    </div>

                    <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs font-medium text-white/80">
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="h-3.5 w-3.5" />
                        {formatDuration(
                          featuredVideo.duration_seconds,
                        )}
                      </span>

                      <span className="rounded-full bg-black/45 px-3 py-1.5 backdrop-blur-md">
                        {getCategoryLabel(featuredVideo.category)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                      {getCategoryLabel(featuredVideo.category)}
                    </p>

                    <h3 className="mt-4 text-3xl font-bold leading-tight text-white transition group-hover:text-[#D4AF37] sm:text-4xl">
                      {featuredVideo.title}
                    </h3>

                    <p className="mt-5 line-clamp-4 text-base leading-7 text-white/55">
                      {featuredVideo.description ??
                        "Watch this practical fashion lesson from Cut and Sew Tribe."}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3 text-xs text-white/45">
                      <span className="inline-flex items-center gap-2">
                        <Eye className="h-3.5 w-3.5" />
                        {formatViews(featuredVideo.views)} views
                      </span>

                      <span>
                        {getCategoryLabel(featuredVideo.level)}
                      </span>
                    </div>

                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      Watch lesson
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </Section>
          )}

          {/* ─────────────────────────────────────────
              ALL VIDEOS
          ───────────────────────────────────────── */}
          <Section>
            <div className="mb-8 flex items-end justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Latest lessons
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Keep learning
                </h2>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/50">
                {videos.length}{" "}
                {videos.length === 1 ? "video" : "videos"}
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {videos.map((video) => (
                <Link
                  key={video.id}
                  href={`/videos/${video.slug}`}
                  className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#121015] transition duration-300 hover:-translate-y-1 hover:border-[#661093]/70 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("${getVideoThumbnail(
                          video.thumbnail_url,
                        )}")`,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

                    <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {getCategoryLabel(video.category)}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#661093] shadow-xl">
                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      {formatDuration(video.duration_seconds)}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 text-xl font-bold leading-snug text-white transition group-hover:text-[#D4AF37]">
                      {video.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/50">
                      {video.description ??
                        "A practical fashion lesson from Cut and Sew Tribe."}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/40">
                      <span className="capitalize">
                        {video.level}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5" />
                        {formatViews(video.views)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>

          {/* ─────────────────────────────────────────
              COURSE CONVERSION
          ───────────────────────────────────────── */}
          <Section>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#D4AF37]/25 bg-gradient-to-br from-[#24132d] via-[#150d1a] to-[#0d0a10] px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#661093]/30 blur-3xl" />
              <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    <BookOpen className="h-4 w-4" />
                    Go beyond individual lessons
                  </div>

                  <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                    Turn inspiration into a real fashion skill.
                  </h2>

                  <p className="mt-5 text-base leading-7 text-white/60 sm:text-lg">
                    Our structured courses take you beyond isolated
                    tutorials, giving you a clearer path from learning
                    the technique to confidently applying it.
                  </p>
                </div>

                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-7 py-4 text-sm font-bold text-black shadow-[0_15px_45px_rgba(212,175,55,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e4c45b]"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Section>
        </>
      )}
    </main>
  );
}