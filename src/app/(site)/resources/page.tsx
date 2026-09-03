import Link from "next/link";
import {
  ArrowRight,
  Download,
  FileText,
  Sparkles,
} from "lucide-react";

import { Container, Section } from "@/components/ui";

import { resources } from "@/content/resources";

export const metadata = {
  title: "Fashion Resources & Guides | Cut And Sew Tribe",
  description:
    "Access practical fashion guides, templates, checklists, and professional resources designed to help you learn, create, and build your fashion career.",
};

function formatLabel(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ResourcesPage() {
  const featuredResources = resources.filter(
    (resource) => resource.featured
  );

  const featuredResource =
    featuredResources[0] ?? resources[0] ?? null;

  const libraryResources = featuredResource
    ? resources.filter(
        (resource) => resource.id !== featuredResource.id
      )
    : resources;

  if (!featuredResource) {
    return (
      <div className="min-h-screen bg-[#faf8fc]">
        <section className="relative overflow-hidden bg-[#120719]">
          <Container>
            <div className="flex min-h-[520px] items-center py-20">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Learning Resources
                </p>

                <h1 className="mt-5 font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  Tools to build your fashion career.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                  Practical guides, templates, checklists, and
                  resources designed to help you become more
                  confident in fashion.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
              <FileText className="mx-auto h-10 w-10 text-[#661093]" />

              <h2 className="mt-5 text-2xl font-bold text-neutral-900">
                Resources are coming soon
              </h2>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-neutral-600">
                We are preparing practical resources to help you
                learn, create, and grow.
              </p>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8fc]">
      {/* HERO */}
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#100614]">
        {featuredResource.thumbnail && (
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{
              backgroundImage: `url("${featuredResource.thumbnail}")`,
            }}
          />
        )}

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,4,14,0.96)_0%,rgba(15,5,21,0.86)_42%,rgba(15,5,21,0.48)_72%,rgba(15,5,21,0.62)_100%)]" />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(10,4,14,0.05)_45%,rgba(10,4,14,0.75)_100%)]" />

        <Container>
          <div className="flex min-h-[680px] items-center py-24">
            <div className="grid w-full gap-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                  Featured learning resource
                </div>

                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                  {formatLabel(featuredResource.fileType)}
                </p>

                <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  {featuredResource.title}
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
                  {featuredResource.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur">
                    {formatLabel(featuredResource.access)}
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur">
                    {formatLabel(featuredResource.fileType)}
                  </span>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href={`/resources/${featuredResource.slug}`}
                    className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-[#661093] shadow-xl transition duration-200 hover:-translate-y-0.5 hover:bg-[#f8f5fa]"
                  >
                    Explore Resource
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {featuredResource.access === "free" &&
  featuredResource.fileUrl && (
                      <a
                        href={featuredResource.fileUrl}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    )}
                </div>
              </div>

              <Link
                href={`/resources/${featuredResource.slug}`}
                className="group hidden lg:block"
              >
                <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md transition duration-300 group-hover:-translate-y-2">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-neutral-900">
                    {featuredResource.thumbnail ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url("${featuredResource.thumbnail}")`,
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-white/20" />
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                        Featured
                      </p>

                      <p className="mt-2 text-xl font-semibold leading-tight text-white">
                        {featuredResource.title}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* INTRO */}
      <Section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
                The resource library
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
                Learn smarter.
                <br />
                Create with confidence.
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-neutral-600">
              Fashion becomes easier when you have the right tools
              beside you. Explore practical resources created to
              help you understand techniques, organize your work,
              and move from learning to making.
            </p>
          </div>
        </Container>
      </Section>

      {/* FEATURED RESOURCE */}
      <Section className="pt-0">
        <Container>
          <Link
            href={`/resources/${featuredResource.slug}`}
            className="group block overflow-hidden rounded-[2rem] bg-[#15091b] shadow-2xl"
          >
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
                {featuredResource.thumbnail ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url("${featuredResource.thumbnail}")`,
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#26102f]">
                    <FileText className="h-20 w-20 text-white/20" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  Featured resource
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {formatLabel(featuredResource.fileType)}
                </p>

                <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {featuredResource.title}
                </h2>

                <p className="mt-5 leading-8 text-white/65">
                  {featuredResource.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/75">
                    {formatLabel(featuredResource.access)}
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/75">
                    {formatLabel(featuredResource.fileType)}
                  </span>
                </div>

                <div className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Open this resource
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </Section>

      {/* RESOURCE LIBRARY */}
      <Section className="py-20 sm:py-24">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
                Explore the library
              </p>

              <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-neutral-950">
                More tools for your journey
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-neutral-500">
              Guides, templates, checklists, and practical materials
              designed for real fashion work.
            </p>
          </div>

          {libraryResources.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {libraryResources.map((resource) => (
                <Link
                  key={resource.id}
                  href={`/resources/${resource.slug}`}
                  className="group"
                >
                  <article className="h-full overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#661093]/30 hover:shadow-xl">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#eee8f1]">
                      {resource.thumbnail ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: `url("${resource.thumbnail}")`,
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="h-12 w-12 text-[#661093]/30" />
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#661093] shadow-sm backdrop-blur">
                        {formatLabel(resource.fileType)}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#661093]">
                          {formatLabel(resource.access)}
                        </span>

                        <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-[#661093]" />
                      </div>

                      <h3 className="mt-3 text-xl font-bold leading-snug text-neutral-950">
                        {resource.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                        {resource.description}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                        <FileText className="h-4 w-4 text-[#661093]" />
                        View resource
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center">
              <p className="text-neutral-600">
                More resources are being prepared.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section className="pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#661093] px-8 py-14 sm:px-12 sm:py-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Go beyond the download
              </p>

              <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Turn what you learn into what you can make.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                Resources can give you the tools. Structured
                training gives you the complete method. Explore
                our courses and build the skills behind the
                finished garment.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-[#661093] transition hover:bg-neutral-100"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/videos"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Watch Free Lessons
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}