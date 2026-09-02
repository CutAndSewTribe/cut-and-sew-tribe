import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  Layers3,
  Share2,
  Sparkles,
} from "lucide-react";

import { Container, Section } from "@/components/ui";
import ShareButtons from "@/components/shared/ShareButtons";
import PatternArticleRenderer from "@/components/media/PatternArticleRenderer";

import {
  getPatternBySlug,
  getPublishedPatterns,
} from "@/lib/patterns";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pattern = await getPatternBySlug(slug);

  if (!pattern) {
    return {
      title: "Pattern Not Found",
    };
  }

  const title = pattern.seo_title ?? pattern.title;
  const description =
    pattern.seo_description ??
    pattern.excerpt ??
    "Learn practical pattern drafting techniques with Cut And Sew Tribe.";

  const images = pattern.thumbnail
    ? [
        {
          url: pattern.thumbnail,
          width: 1200,
          height: 630,
          alt: pattern.title,
        },
      ]
    : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: pattern.thumbnail ? [pattern.thumbnail] : [],
    },
  };
}

export async function generateStaticParams() {
  const patterns = await getPublishedPatterns();

  return patterns.map((pattern) => ({
    slug: pattern.slug,
  }));
}

function formatLabel(value: string): string {
  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export default async function PatternDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pattern = await getPatternBySlug(slug);

  if (!pattern) {
    notFound();
  }

  const level = formatLabel(pattern.level);
  const category = formatLabel(pattern.category);
  const access = formatLabel(pattern.access);

  return (
    <div className="min-h-screen bg-[#faf8fc] text-neutral-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#120719]">
        <div className="absolute inset-0">
          {pattern.thumbnail ? (
            <Image
              src={pattern.thumbnail}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#661093] via-[#351047] to-black" />
          )}

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
        </div>

        <Container className="relative flex min-h-[620px] items-end py-16 sm:min-h-[680px] sm:py-20 lg:min-h-[720px] lg:py-24">
          <div className="max-w-5xl">
            {/* Breadcrumb */}
            <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/65">
              <Link
                href="/patterns"
                className="transition hover:text-white"
              >
                Pattern Drafting
              </Link>

              <span className="text-white/30">/</span>

              <span className="text-white/85">
                {category}
              </span>
            </div>

            {/* Metadata */}
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                {level}
              </span>

              <span className="inline-flex items-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f4d879] backdrop-blur-md">
                {category}
              </span>

              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                {access}
              </span>
            </div>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
              {pattern.title}
            </h1>

            {pattern.excerpt && (
              <p className="mt-7 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 lg:text-xl">
                {pattern.excerpt}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-4">
              {pattern.download_url && (
                <a
                  href={pattern.download_url}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#661093] shadow-xl transition hover:-translate-y-0.5 hover:bg-neutral-100"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  Download Pattern
                </a>
              )}

              <Link
                href={
                  pattern.related_course_slug
                    ? `/courses/${pattern.related_course_slug}`
                    : "/courses"
                }
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Learn the Full Method
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ARTICLE INTRO */}
      <Section className="pt-12 sm:pt-16 lg:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-14">
            {/* MAIN ARTICLE */}
            <main className="min-w-0">
              <article className="overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white shadow-[0_20px_70px_rgba(24,10,31,0.08)]">
                <div className="border-b border-neutral-200/80 px-6 py-6 sm:px-10 sm:py-8">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-500">
                    <span className="inline-flex items-center gap-2">
                      <Layers3 className="h-4 w-4 text-[#661093]" />
                      {category}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#661093]" />
                      {level}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#661093]" />
                      {pattern.file_format.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
                  {pattern.content ? (
                    <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-[#661093] prose-strong:text-neutral-900">
                      <PatternArticleRenderer
                        content={pattern.content}
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
                        <BookOpen className="h-6 w-6" />
                      </div>

                      <h2 className="mt-5 text-2xl font-semibold text-neutral-900">
                        This article is coming soon
                      </h2>

                      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-neutral-600">
                        The pattern is available, but the full drafting
                        guide is still being prepared.
                      </p>
                    </div>
                  )}
                </div>

                {/* DOWNLOAD */}
                {pattern.download_url && (
                  <div className="mx-6 mb-6 overflow-hidden rounded-2xl border border-[#661093]/15 bg-[#661093]/5 sm:mx-10 sm:mb-10 lg:mx-14">
                    <div className="p-6 sm:p-7">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-[#661093]">
                            <ArrowDownToLine className="h-4 w-4" />
                            Pattern download
                          </div>

                          <h3 className="mt-2 text-xl font-bold text-neutral-900">
                            Take the pattern with you
                          </h3>

                          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-600">
                            Download the printable{" "}
                            {pattern.file_format.toUpperCase()} version
                            and use it alongside the drafting guide.
                          </p>
                        </div>

                        <a
                          href={pattern.download_url}
                          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#661093] px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#520b76]"
                        >
                          Download
                          <ArrowDownToLine className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* SHARE */}
                <div className="border-t border-neutral-200/80 px-6 py-6 sm:px-10 lg:px-14">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                        <Share2 className="h-4 w-4 text-[#661093]" />
                        Share this guide
                      </div>

                      <p className="mt-1 text-sm text-neutral-500">
                        Help another fashion designer discover it.
                      </p>
                    </div>

                    <ShareButtons title={pattern.title} />
                  </div>
                </div>
              </article>
            </main>

            {/* SIDEBAR */}
            <aside className="space-y-5 lg:sticky lg:top-24">
              {/* QUICK INFO */}
              <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-[0_15px_45px_rgba(24,10,31,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#661093]/10 text-[#661093]">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#661093]">
                      Pattern guide
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-neutral-900">
                      What &apos; learn
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    "Understand the garment structure",
                    "Follow the drafting process",
                    "Improve your fitting decisions",
                    "Build with professional techniques",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#661093]" />

                      <span className="text-sm leading-6 text-neutral-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COURSE CTA */}
              <div className="relative overflow-hidden rounded-[1.75rem] bg-[#16091c] p-7 text-white shadow-[0_20px_55px_rgba(22,9,28,0.18)]">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#661093]/40 blur-3xl" />
                <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[#D4AF37]/20 blur-3xl" />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                    Go beyond the pattern
                  </p>

                  <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
                    Learn the complete garment-making method.
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-white/65">
                    Move from one drafting exercise to a structured
                    learning path covering measurements, drafting,
                    fitting, sewing and professional garment
                    construction.
                  </p>

                  <Link
                    href={
                      pattern.related_course_slug
                        ? `/courses/${pattern.related_course_slug}`
                        : "/courses"
                    }
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#661093] transition hover:-translate-y-0.5 hover:bg-neutral-100"
                  >
                    Explore the Course
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* BACK LINK */}
              <Link
                href="/patterns"
                className="group flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-700 transition hover:border-[#661093]/30 hover:text-[#661093]"
              >
                <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                Back to Pattern Library
              </Link>
            </aside>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <section className="px-4 pb-20 pt-4 sm:px-6 lg:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#661093] via-[#56107c] to-[#1b0a22] px-7 py-12 text-white sm:px-10 sm:py-14 lg:px-14">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#a83bd3]/20 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                  Keep learning
                </p>

                <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  One pattern can teach you a technique. A course can teach
                  you the craft.
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                  Explore the Cut And Sew Tribe course library and build
                  practical fashion skills through structured lessons.
                </p>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-[#661093] shadow-xl transition hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}