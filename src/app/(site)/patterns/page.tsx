import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Crown,
  FileText,
  Ruler,
  Scissors,
  Sparkles,
} from "lucide-react";

import { Container, Section } from "@/components/ui";
import PatternCard from "@/components/media/PatternCard";
import { getPublishedPatterns } from "@/lib/patterns";

export const metadata = {
  title: "Sewing Patterns & Pattern Drafting Guides | Cut And Sew Tribe",
  description:
    "Professional sewing patterns, bodice blocks, skirt blocks, menswear drafts, and pattern drafting tutorials designed to improve your garment construction skills.",
};

function getCategoryLabel(category: string) {
  return category
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function getLevelLabel(level: string) {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function getAccessLabel(access: string) {
  return access === "premium" ? "Premium Pattern" : "Free Pattern";
}

export default async function PatternsPage() {
  const patterns = await getPublishedPatterns();

  const featured = patterns.filter((pattern) => pattern.featured);
  const regular = patterns.filter((pattern) => !pattern.featured);

  const heroPattern = featured[0] ?? patterns[0];

  const heroImage =
    heroPattern?.thumbnail ??
    heroPattern?.hero_image ??
    "/images/backgrounds/fashion-hero.jpg";

  const totalPatterns = patterns.length;
  const featuredCount = featured.length;

  const categories = Array.from(
    new Set(patterns.map((pattern) => pattern.category))
  );

  return (
    <main className="overflow-hidden bg-[#faf8fc] text-neutral-900">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#100916]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: `url("${heroImage}")`,
          }}
          aria-label={
            heroPattern
              ? `${heroPattern.title} pattern drafting article`
              : "Pattern drafting"
          }
        />

        <div className="absolute inset-0 -z-10 bg-black/55" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#100916] via-[#100916]/85 to-[#100916]/25" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#100916] via-transparent to-black/20" />

        <Container>
          <div className="flex min-h-[680px] items-end py-20 sm:py-24 lg:items-center lg:py-28">
            <div className="max-w-4xl">
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                  Pattern Drafting Library
                </span>

                {heroPattern && (
                  <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-medium text-white/75 backdrop-blur-md">
                    Featured: {getCategoryLabel(heroPattern.category)}
                  </span>
                )}
              </div>

              <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
                Draft better.
                <br />
                <span className="text-[#D4AF37]">Fit with confidence.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                Practical sewing patterns and pattern-drafting guides
                designed to help you understand the structure behind
                great garments — not just copy the finished shape.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={
                    heroPattern
                      ? `/patterns/${heroPattern.slug}`
                      : "/patterns"
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#160c1b] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e3c45a]"
                >
                  Explore Featured Pattern
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Explore Courses
                </Link>
              </div>

              {heroPattern && (
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
                  <span className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#D4AF37]" />
                    {getCategoryLabel(heroPattern.category)}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-[#D4AF37]" />
                    {getLevelLabel(heroPattern.level)}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#D4AF37]" />
                    {getAccessLabel(heroPattern.access)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Container>

        {/* Decorative glow */}
        <div className="pointer-events-none absolute -bottom-40 right-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-[#661093]/30 blur-[120px]" />
      </section>

      {/* =========================================================
          QUICK VALUE STRIP
      ========================================================= */}
      <section className="border-b border-neutral-200 bg-white">
        <Container>
          <div className="grid divide-y divide-neutral-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-neutral-200">
            <div className="flex items-center gap-4 px-0 py-6 sm:px-6 lg:px-7">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#661093]/10 text-[#661093]">
                <Ruler className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-neutral-900">
                  Draft with clarity
                </p>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Understand the measurements behind the shape.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-0 py-6 sm:px-6 lg:px-7">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#9a7b12]">
                <Scissors className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-neutral-900">
                  Build real garments
                </p>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Move from paper pattern to finished piece.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-0 py-6 sm:px-6 lg:px-7">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#661093]/10 text-[#661093]">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-neutral-900">
                  Practical guides
                </p>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Learn the process, not just the final result.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-0 py-6 sm:px-6 lg:px-7">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#9a7b12]">
                <Crown className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-neutral-900">
                  Professional thinking
                </p>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Develop skills you can use beyond one pattern.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          LIBRARY INTRO
      ========================================================= */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#661093]">
                The pattern library
              </p>

              <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-[-0.035em] text-neutral-950 sm:text-5xl">
                Patterns built to help you understand the craft.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-600">
                Explore bodice blocks, skirts, menswear, bridal structures,
                and garment-specific drafting guides. Each resource is
                designed to help you make better decisions at the cutting
                table.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-3xl font-bold tracking-tight text-neutral-950">
                  {totalPatterns}
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  Published patterns
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-3xl font-bold tracking-tight text-neutral-950">
                  {featuredCount}
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  Featured guides
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          FEATURED PATTERNS
      ========================================================= */}
      {featured.length > 0 && (
        <Section className="pt-0">
          <Container>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#661093]">
                  Featured pattern drafting articles
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  Start with a guided draft
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-neutral-500">
                Our featured guides are selected to give you practical
                starting points for improving your drafting and garment
                construction skills.
              </p>
            </div>

            <div className="grid gap-7 lg:grid-cols-2">
              {featured.map((pattern, index) => (
                <Link
                  key={pattern.id}
                  href={`/patterns/${pattern.slug}`}
                  className="group relative overflow-hidden rounded-[2rem] bg-[#120b17] shadow-[0_24px_70px_rgba(17,8,24,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(17,8,24,0.2)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("${
                          pattern.thumbnail ??
                          pattern.hero_image ??
                          "/images/backgrounds/fashion-hero.jpg"
                        }")`,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#120b17] via-[#120b17]/25 to-transparent" />

                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-neutral-900 backdrop-blur">
                        {index === 0 ? "Editor’s Pick" : "Featured"}
                      </span>

                      <span className="rounded-full bg-[#D4AF37] px-3 py-1.5 text-xs font-bold text-[#160c1b]">
                        {getAccessLabel(pattern.access)}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/65">
                        <span>{getCategoryLabel(pattern.category)}</span>
                        <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                        <span>{getLevelLabel(pattern.level)}</span>
                      </div>

                      <h3 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                        {pattern.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 px-6 py-5">
                    <p className="line-clamp-2 text-sm leading-6 text-white/60">
                      {pattern.excerpt ??
                        "Explore this practical pattern drafting guide and develop a stronger understanding of garment construction."}
                    </p>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition group-hover:bg-[#D4AF37] group-hover:text-[#160c1b]">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* =========================================================
          CATEGORY EXPLORATION
      ========================================================= */}
      {categories.length > 0 && (
        <section className="bg-[#110914] py-20 text-white sm:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Explore by craft
                </p>

                <h2 className="mt-3 text-4xl font-bold tracking-[-0.035em] sm:text-5xl">
                  Find the kind of garment you want to master.
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-white/60">
                  Start with the area that matches what you are currently
                  learning, then use the guides to deepen your drafting
                  knowledge.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {categories.map((category) => {
                  const count = patterns.filter(
                    (pattern) => pattern.category === category
                  ).length;

                  return (
                    <div
                      key={category}
                      className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-200 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-white">
                            {getCategoryLabel(category)}
                          </p>

                          <p className="mt-1 text-sm text-white/45">
                            {count}{" "}
                            {count === 1 ? "pattern" : "patterns"}
                          </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition group-hover:border-[#D4AF37]/50 group-hover:text-[#D4AF37]">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================
          ALL PATTERN ARTICLES
      ========================================================= */}
      {regular.length > 0 && (
        <Section>
          <Container>
            <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#661093]">
                  Pattern drafting articles
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  Learn one garment at a time.
                </h2>

                <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
                  Explore practical drafting techniques across
                  dressmaking, bridal, menswear, and childrenswear.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-sm font-semibold text-neutral-400 md:flex">
                <span>{regular.length}</span>
                <span>more guides</span>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {regular.map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  title={pattern.title}
                  slug={pattern.slug}
                  excerpt={pattern.excerpt}
                  thumbnail={pattern.thumbnail}
                  category={pattern.category}
                  level={pattern.level}
                  access={pattern.access}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* =========================================================
          COURSE BRIDGE
      ========================================================= */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#661093] px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-black/20 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Go beyond the pattern
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                  Learn the complete garment-making process.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
                  Patterns are a powerful starting point. Our structured
                  courses take you further into drafting, fitting,
                  construction, finishing, and the professional skills
                  behind the garments you want to create.
                </p>
              </div>

              <Link
                href="/courses"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#661093] transition duration-200 hover:-translate-y-0.5 hover:bg-[#fffaf0]"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          EMPTY STATE
      ========================================================= */}
      {patterns.length === 0 && (
        <Section>
          <Container>
            <div className="rounded-[2rem] border border-dashed border-neutral-300 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#661093]/10 text-[#661093]">
                <FileText className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-neutral-950">
                Pattern guides are coming soon.
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-neutral-500">
                We&apos;re preparing practical pattern-drafting resources
                to help you build stronger garment construction skills.
              </p>

              <Link
                href="/courses"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#661093] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#520b76]"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}