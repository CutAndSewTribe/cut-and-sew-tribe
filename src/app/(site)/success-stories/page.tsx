import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Quote,
  Sparkles,
} from "lucide-react";

import { Container, Section } from "@/components/ui";
import { studentStories } from "@/content/success-stories";

export default function SuccessStoriesPage() {
  const featuredStories = studentStories.filter(
    (story) => story.featured
  );

  const heroStory = featuredStories[0] ?? studentStories[0];

  return (
    <div className="bg-[#faf8fc] text-neutral-900">
      {/* HERO */}
      {heroStory && (
        <section className="relative isolate overflow-hidden bg-[#09060d]">
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{
              backgroundImage: `url("${heroStory.image}")`,
            }}
          />

          <div className="absolute inset-0 -z-10 bg-black/65" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#09060d] via-[#09060d]/80 to-[#09060d]/25" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#09060d] via-transparent to-black/20" />

          <Container className="relative flex min-h-[680px] items-end py-20 sm:min-h-[720px] sm:py-24 lg:items-center lg:py-28">
            <div className="grid w-full items-end gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
              {/* Hero copy */}
              <div className="max-w-3xl text-white">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                  Student Community
                </div>

                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Stories from the Tribe
                </p>

                <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-7xl">
                  Real skills.
                  <span className="block text-white/75">
                    Real creators.
                  </span>
                  <span className="block">
                    Real transformation.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                  Discover how Cut And Sew Tribe students turned
                  fashion skills into finished garments, businesses,
                  confidence, and new opportunities.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`/success-stories/${heroStory.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#17100a] transition hover:-translate-y-0.5 hover:bg-[#e1c45d]"
                  >
                    Read {heroStory.name}&apos;s Story
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/15"
                  >
                    Start Your Journey
                  </Link>
                </div>
              </div>

              {/* Featured story card */}
              <Link
                href={`/success-stories/${heroStory.slug}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:border-[#D4AF37]/50">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("${heroStory.image}")`,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="inline-flex rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#17100a]">
                        Featured Story
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-2 text-sm text-white/55">
                      <MapPin className="h-4 w-4" />
                      {heroStory.location}
                    </div>

                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                      {heroStory.name}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-[#D4AF37]">
                      {heroStory.course}
                    </p>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/65">
                      {heroStory.shortStory}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white">
                      Read full story
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* INTRO / TRUST */}
      <Section className="bg-[#09060d] py-10 sm:py-12">
        <Container>
          <div className="grid gap-4 border-y border-white/10 py-8 sm:grid-cols-3 sm:gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                Learn
              </p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Practical fashion education built around real
                skills and real garment construction.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                Create
              </p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Turn lessons into finished garments, collections,
                portfolios, and personal projects.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                Grow
              </p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Build the confidence and capability to pursue your
                next opportunity in fashion.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FEATURED STORIES */}
      {featuredStories.length > 0 && (
        <Section className="py-20 sm:py-24">
          <Container>
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#661093]">
                Featured creators
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                Meet the people building with their skills
              </h2>

              <p className="mt-4 text-base leading-8 text-neutral-600">
                These are not just testimonials. They are stories of
                people learning, practising, making, and moving
                forward in fashion.
              </p>
            </div>

            <div className="grid gap-7 md:grid-cols-2">
              {featuredStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/success-stories/${story.slug}`}
                  className="group"
                >
                  <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:border-[#661093]/20 hover:shadow-2xl">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url("${story.image}")`,
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                      <div className="absolute bottom-5 left-5">
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#661093]">
                          Featured
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">
                        <span>{story.course}</span>

                        <span className="text-neutral-300">
                          •
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {story.location}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold tracking-tight text-neutral-950">
                        {story.name}
                      </h3>

                      <p className="mt-2 font-semibold text-[#661093]">
                        {story.achievement}
                      </p>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-neutral-600">
                        {story.shortStory}
                      </p>

                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#661093]">
                        Read their story
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ALL STORIES */}
      <Section className="border-y border-neutral-200 bg-white py-20 sm:py-24">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#661093]">
                The Tribe
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                More stories from our community
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-neutral-500">
              Explore the experiences, milestones, and journeys of
              creators learning fashion through Cut And Sew Tribe.
            </p>
          </div>

          {studentStories.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studentStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/success-stories/${story.slug}`}
                  className="group"
                >
                  <article className="h-full overflow-hidden rounded-3xl border border-neutral-200 bg-[#faf8fc] transition duration-500 hover:-translate-y-1 hover:border-[#661093]/25 hover:bg-white hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url("${story.image}")`,
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#661093]">
                          {story.course}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {story.location}
                      </div>

                      <h3 className="mt-3 text-xl font-bold text-neutral-950">
                        {story.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm font-semibold text-[#661093]">
                        {story.achievement}
                      </p>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                        {story.shortStory}
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-neutral-900">
                        Read story
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-neutral-900">
                Student stories are coming soon.
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                Check back as more members of the Tribe share their
                journeys.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* QUOTE / CONVERSION */}
      <Section className="bg-[#09060d] py-20 sm:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#661093] via-[#4b0b6c] to-[#190b21] px-7 py-14 text-center shadow-2xl sm:px-12 sm:py-20">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#661093]/40 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <Quote className="mx-auto h-10 w-10 text-[#D4AF37]" />

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your story could be next.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Learn the skills. Make the garments. Build your
                confidence. Then create the fashion journey you want
                to be known for.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#17100a] transition hover:-translate-y-0.5 hover:bg-[#e1c45d]"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/videos"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Watch Free Lessons
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}