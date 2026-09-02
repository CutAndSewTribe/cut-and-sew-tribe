import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, MapPin, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui";
import ShareButtons from "@/components/shared/ShareButtons";

import { studentStories } from "@/content/success-stories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const story = studentStories.find(
    (item) => item.slug === slug
  );

  if (!story) {
    return {
      title: "Story Not Found",
    };
  }

  return {
    title: `${story.name} | Student Success Story | Cut And Sew Tribe`,
    description: story.shortStory,

    openGraph: {
      title: story.name,
      description: story.shortStory,
      type: "article",
      images: [
        {
          url: story.image,
          width: 1200,
          height: 630,
          alt: story.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: story.name,
      description: story.shortStory,
      images: [story.image],
    },
  };
}

export function generateStaticParams() {
  return studentStories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function SuccessStoryDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const story = studentStories.find(
    (item) => item.slug === slug
  );

  if (!story) {
    notFound();
  }

  return (
    <main className="bg-[#faf8fc]">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative isolate min-h-[620px] overflow-hidden bg-[#120b16]">
        <Image
          src={story.image}
          alt={story.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Image treatment */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/15" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Purple brand glow */}
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[#661093]/30 blur-3xl" />

        <Container className="relative z-10 flex min-h-[620px] items-end pb-16 pt-32 sm:pb-20 lg:items-center lg:pb-16">
          <div className="max-w-4xl text-white">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                Student Success Story
              </span>

              <span className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-md">
                {story.course}
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {story.name}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85 sm:text-xl">
              {story.shortStory}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-white/75">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D4AF37]" />
                {story.location}
              </span>

              <span className="h-1 w-1 rounded-full bg-white/40" />

              <span>{story.course}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          STORY INTRO / ACHIEVEMENT
      ========================================================= */}

      <Section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
            {/* Main story */}
            <article>
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
                  The journey
                </p>

                <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  From learning the craft to creating something of their own.
                </h2>
              </div>

              <div className="rounded-[2rem] border border-neutral-200/80 bg-white p-7 shadow-[0_20px_70px_rgba(31,15,38,0.07)] sm:p-10">
                <div className="prose prose-neutral max-w-none">
                  <p className="whitespace-pre-line text-base leading-8 text-neutral-700 sm:text-lg sm:leading-9">
                    {story.story}
                  </p>
                </div>
              </div>
            </article>

            {/* Achievement card */}
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-[#171019] text-white shadow-[0_24px_70px_rgba(31,15,38,0.18)]">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#171019] via-[#171019]/30 to-transparent" />

                  <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#171019] shadow-lg">
                    <Award className="h-6 w-6" />
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                    Achievement
                  </p>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight">
                    What changed
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {story.achievement}
                  </p>

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                      Course
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      {story.course}
                    </p>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                      Location
                    </p>

                    <p className="mt-2 font-semibold text-white">
                      {story.location}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          FEATURED QUOTE / STATEMENT
      ========================================================= */}

      <section className="border-y border-[#661093]/10 bg-white">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
              <Sparkles className="h-6 w-6" />
            </div>

            <blockquote className="mt-7 text-3xl font-semibold leading-tight tracking-[-0.025em] text-neutral-950 sm:text-4xl lg:text-5xl">
              “{story.shortStory}”
            </blockquote>

            <div className="mt-7">
              <p className="font-semibold text-neutral-950">
                {story.name}
              </p>

              <p className="mt-1 text-sm text-neutral-500">
                {story.course} · {story.location}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <Section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#661093] px-7 py-12 text-white shadow-[0_25px_80px_rgba(102,16,147,0.22)] sm:px-12 sm:py-16 lg:px-16">
            {/* Decorative shapes */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Your turn
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Your fashion journey could be the next story we tell.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                  Learn practical fashion design, pattern drafting,
                  sewing, garment construction, and the skills you need
                  to turn your creativity into real work.
                </p>
              </div>

              <div>
                <Link
                  href="/courses"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#661093] transition hover:-translate-y-0.5 hover:bg-neutral-100 sm:w-auto"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          SHARE
      ========================================================= */}

      <section className="border-t border-neutral-200 bg-white">
        <Container className="py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-neutral-950">
                Enjoyed this story?
              </p>

              <p className="mt-1 text-sm text-neutral-500">
                Share this journey with another fashion creator.
              </p>
            </div>

            <ShareButtons title={story.name} />
          </div>
        </Container>
      </section>
    </main>
  );
}