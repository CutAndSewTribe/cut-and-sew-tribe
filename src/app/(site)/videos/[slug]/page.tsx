import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Eye,
  Play,
  Sparkles,
} from "lucide-react";

import { Container, Section } from "@/components/ui";
import ShareButtons from "@/components/shared/ShareButtons";

import {
  getPublishedVideos,
  getVideoBySlug,
} from "@/lib/instructor/videos";

export const dynamic = "force-dynamic";

function formatDuration(seconds: number | null): string {
  if (seconds === null || seconds < 0) {
    return "—";
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
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function getLevelLabel(level: string): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const video = await getVideoBySlug(slug);

  if (!video || !video.published) {
    return {
      title: "Video Not Found",
    };
  }

  const description =
    video.description ??
    "Watch practical fashion lessons from Cut and Sew Tribe.";

  const thumbnail =
    video.thumbnail_url ??
    "https://media.cutandsewtribe.com/videos/default-thumbnail.jpg";

  return {
    title: `${video.title} | Cut & Sew Tribe`,
    description,

    openGraph: {
      title: video.title,
      description,
      type: "article",
      images: [
        {
          url: thumbnail,
          width: 1200,
          height: 630,
          alt: video.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: video.title,
      description,
      images: [thumbnail],
    },
  };
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const [video, publishedVideos] = await Promise.all([
    getVideoBySlug(slug),
    getPublishedVideos(),
  ]);

  if (!video || !video.published) {
    notFound();
  }

  const duration = formatDuration(video.duration_seconds);
  const category = getCategoryLabel(video.category);
  const level = getLevelLabel(video.level);

  const thumbnail =
    video.thumbnail_url ??
    "https://media.cutandsewtribe.com/videos/default-thumbnail.jpg";

  const relatedVideos = publishedVideos
    .filter(
      (item) =>
        item.id !== video.id &&
        item.category === video.category
    )
    .slice(0, 3);

  const fallbackRelatedVideos = publishedVideos
    .filter((item) => item.id !== video.id)
    .slice(0, 3);

  const displayRelatedVideos =
    relatedVideos.length > 0
      ? relatedVideos
      : fallbackRelatedVideos;

  return (
    <main className="bg-white">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative isolate overflow-hidden bg-[#100914]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${thumbnail}")`,
          }}
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#100914] via-[#100914]/75 to-[#100914]/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#100914] via-transparent to-black/10" />

        <Container>
          <div className="relative flex min-h-[620px] items-end py-20 sm:min-h-[680px] sm:py-24 lg:min-h-[720px] lg:py-28">
            <div className="max-w-4xl">
              <Link
                href="/videos"
                className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to video library
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#F0CF5A] backdrop-blur-sm">
                  {category}
                </span>

                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm">
                  {level}
                </span>

                {video.featured && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#661093] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured lesson
                  </span>
                )}
              </div>

              <h1 className="mt-7 max-w-4xl font-serif text-5xl font-bold leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-8xl">
                {video.title}
              </h1>

              {video.description && (
                <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  {video.description}
                </p>
              )}

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#D4AF37]" />
                  {duration}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Eye className="h-4 w-4 text-[#D4AF37]" />
                  {video.views.toLocaleString()} views
                </span>

                <span className="h-1 w-1 rounded-full bg-white/30" />

                <span>Cut & Sew Tribe</span>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#watch"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#160d1b] transition hover:-translate-y-0.5 hover:bg-[#e3c34f]"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Watch lesson
                </a>

                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Explore courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          VIDEO PLAYER
      ========================================================== */}

      <section
        id="watch"
        className="relative bg-[#100914] pb-20 pt-0 sm:pb-24"
      >
        <Container>
          <div className="relative -mt-1 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:rounded-[2rem]">
            {video.video_url ? (
              <video
                className="aspect-video w-full bg-black"
                controls
                playsInline
                preload="metadata"
                poster={thumbnail}
              >
                <source
                  src={video.video_url}
                  type={
                    video.r2_key.endsWith(".webm")
                      ? "video/webm"
                      : video.r2_key.endsWith(".mov")
                        ? "video/quicktime"
                        : "video/mp4"
                  }
                />

                Your browser does not support the video player.
              </video>
            ) : (
              <div className="flex aspect-video items-center justify-center bg-[#17111a] px-6 text-center">
                <div>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                    <Play className="h-8 w-8" />
                  </div>

                  <p className="mt-5 text-lg font-semibold text-white">
                    This video is currently unavailable.
                  </p>

                  <p className="mt-2 text-sm text-white/50">
                    Please check back later.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* =========================================================
          LESSON INFORMATION
      ========================================================== */}

      <Section className="bg-white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
            <article>
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
                  Inside the lesson
                </p>

                <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
                  Learn something you can actually use.
                </h2>

                {video.description ? (
                  <p className="mt-6 whitespace-pre-line text-base leading-8 text-neutral-600 sm:text-lg">
                    {video.description}
                  </p>
                ) : (
                  <p className="mt-6 text-base leading-8 text-neutral-600 sm:text-lg">
                    Explore this practical fashion lesson and build
                    skills you can take directly to your sewing table.
                  </p>
                )}
              </div>

              {/* Metadata */}
              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
                <div className="bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Level
                  </p>
                  <p className="mt-2 font-semibold text-neutral-950">
                    {level}
                  </p>
                </div>

                <div className="bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Category
                  </p>
                  <p className="mt-2 font-semibold text-neutral-950">
                    {category}
                  </p>
                </div>

                <div className="bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Duration
                  </p>
                  <p className="mt-2 font-semibold text-neutral-950">
                    {duration}
                  </p>
                </div>
              </div>

              {/* Topics */}
              {video.tags.length > 0 && (
                <div className="mt-12 border-t border-neutral-200 pt-10">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#661093]">
                    Topics covered
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 border-t border-neutral-200 pt-8">
                <ShareButtons title={video.title} />
              </div>
            </article>

            {/* =====================================================
                COURSE CONVERSION CARD
            ====================================================== */}

            <aside className="lg:pt-1">
              <div className="sticky top-24 overflow-hidden rounded-[1.75rem] bg-[#100914] p-7 text-white shadow-xl sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#160d1b]">
                  <Play className="h-5 w-5 fill-current" />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                  Go further
                </p>

                <h2 className="mt-3 font-serif text-3xl font-bold leading-tight">
                  One lesson can start the journey.
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  Build deeper skills through structured fashion
                  programmes designed to help you move from learning
                  individual techniques to confidently creating
                  garments.
                </p>

                <Link
                  href="/courses"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#661093] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#7b13ad]"
                >
                  Explore the courses
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/videos"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
                >
                  Browse more free lessons
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          RELATED LESSONS
      ========================================================== */}

      {displayRelatedVideos.length > 0 && (
        <section className="border-t border-neutral-200 bg-[#f7f5f8] py-20 sm:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
                  Keep learning
                </p>

                <h2 className="mt-3 max-w-2xl font-serif text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
                  More lessons worth watching.
                </h2>
              </div>

              <Link
                href="/videos"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#661093] transition hover:text-[#520b76]"
              >
                View all videos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayRelatedVideos.map((relatedVideo) => {
                const relatedThumbnail =
                  relatedVideo.thumbnail_url ??
                  "https://media.cutandsewtribe.com/videos/default-thumbnail.jpg";

                return (
                  <Link
                    key={relatedVideo.id}
                    href={`/videos/${relatedVideo.slug}`}
                    className="group overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `url("${relatedThumbnail}")`,
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-medium text-white/80">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDuration(
                          relatedVideo.duration_seconds
                        )}
                      </div>

                      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#661093] shadow-lg transition group-hover:scale-110">
                        <Play className="h-4 w-4 fill-current" />
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#661093]">
                        {getCategoryLabel(
                          relatedVideo.category
                        )}
                      </p>

                      <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-tight text-neutral-950">
                        {relatedVideo.title}
                      </h3>

                      <div className="mt-5 flex items-center justify-between text-sm text-neutral-400">
                        <span>
                          {relatedVideo.views.toLocaleString()} views
                        </span>

                        <span className="inline-flex items-center gap-1 font-semibold text-[#661093]">
                          Watch
                          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="bg-[#661093] py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#100914] px-7 py-14 text-center sm:px-12 sm:py-20">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#661093]/40 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                From free lessons to mastery
              </p>

              <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Ready to make more than you watch?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
                Explore structured courses and take your fashion
                skills further with Cut & Sew Tribe.
              </p>

              <Link
                href="/courses"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-4 text-sm font-bold text-[#160d1b] transition hover:-translate-y-0.5 hover:bg-[#e3c34f]"
              >
                Explore courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}