import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Download, FileText, Share2 } from "lucide-react";

import { Container, Section } from "@/components/ui";
import ShareButtons from "@/components/shared/ShareButtons";

import { resources } from "@/content/resources";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const resource = resources.find((item) => item.slug === slug);

  if (!resource) {
    return {
      title: "Resource Not Found",
    };
  }

  return {
    title: resource.title,
    description: resource.description,

    openGraph: {
      title: resource.title,
      description: resource.description,
      type: "article",
      images: [
        {
          url: resource.thumbnail,
          width: 1200,
          height: 630,
          alt: resource.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: resource.title,
      description: resource.description,
      images: [resource.thumbnail],
    },
  };
}

export function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const resource = resources.find((item) => item.slug === slug);

  if (!resource) {
    return (
      <div className="min-h-[60vh] bg-[#faf8fc] px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-neutral-900">
          Resource not found
        </h1>

        <p className="mt-3 text-neutral-600">
          The resource you are looking for could not be found.
        </p>

        <Link
          href="/resources"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#661093] px-6 py-3 font-semibold text-white transition hover:bg-[#4E0C70]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Resources
        </Link>
      </div>
    );
  }

  const relatedResources = resources
    .filter(
      (item) =>
        item.id !== resource.id &&
        item.category === resource.category
    )
    .slice(0, 3);

  return (
    <div className="bg-[#faf8fc] text-neutral-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#100817]">
        <div className="absolute inset-0">
          {resource.thumbnail && (
            <Image
              src={resource.thumbnail}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        <Container className="relative z-10">
          <div className="flex min-h-[620px] items-end py-20 lg:min-h-[680px] lg:py-24">
            <div className="max-w-4xl">
              <Link
                href="/resources"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                All Resources
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F0D477] backdrop-blur-sm">
                  {resource.category}
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
                  {resource.access}
                </span>
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-7xl">
                {resource.title}
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
                {resource.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={resource.fileUrl}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#661093] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-neutral-950"
                >
                  <Download className="h-4 w-4 transition group-hover:translate-y-0.5" />
                  Access Resource
                </a>

                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  Explore More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/65">
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#D4AF37]" />
                  {resource.fileType}
                </span>

                <span>
                  {resource.downloads.toLocaleString()} downloads
                </span>

                <span className="capitalize">
                  {resource.access} resource
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* MAIN RESOURCE EXPERIENCE */}
      <Section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            {/* Main content */}
            <article>
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
                  About this resource
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  A practical tool for your fashion workflow
                </h2>
              </div>

              <div className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-[0_20px_70px_rgba(31,12,44,0.08)] sm:p-10">
                <p className="text-lg leading-8 text-neutral-700">
                  {resource.description}
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#faf8fc] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                      Resource type
                    </p>

                    <p className="mt-2 font-semibold text-neutral-950">
                      {resource.fileType}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#faf8fc] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                      Access
                    </p>

                    <p className="mt-2 font-semibold capitalize text-neutral-950">
                      {resource.access}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#faf8fc] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                      Downloads
                    </p>

                    <p className="mt-2 font-semibold text-neutral-950">
                      {resource.downloads.toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#faf8fc] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                      Category
                    </p>

                    <p className="mt-2 font-semibold capitalize text-neutral-950">
                      {resource.category}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Download panel */}
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-[#12091a] shadow-[0_25px_80px_rgba(31,12,44,0.18)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {resource.thumbnail && (
                    <Image
                      src={resource.thumbnail}
                      alt={resource.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#12091a] via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <span className="rounded-full bg-[#D4AF37] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-neutral-950">
                      {resource.fileType}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                    Ready to use
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    Get this resource
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Keep this resource close to your sewing and fashion
                    workflow whenever you need it.
                  </p>

                  <a
                    href={resource.fileUrl}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-bold text-[#661093] transition hover:bg-[#D4AF37] hover:text-neutral-950"
                  >
                    <Download className="h-4 w-4" />
                    Download Resource
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* COURSE CONVERSION */}
      <section className="relative overflow-hidden bg-[#12091a] py-20 sm:py-24">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#661093]/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />

        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Go further
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Turn the knowledge into real fashion skills.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                Resources give you useful tools. Our courses take you deeper
                with structured lessons, practical techniques, garment
                construction and the confidence to create professionally.
              </p>
            </div>

            <Link
              href="/courses"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-[#661093] transition hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-neutral-950"
            >
              Explore Courses
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>

      {/* RELATED RESOURCES */}
      {relatedResources.length > 0 && (
        <Section className="py-16 sm:py-20">
          <Container>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#661093]">
                  Keep learning
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  More resources like this
                </h2>
              </div>

              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#661093] transition hover:text-[#4E0C70]"
              >
                View all resources
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedResources.map((item) => (
                <Link
                  key={item.id}
                  href={`/resources/${item.slug}`}
                  className="group overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-70" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#661093] backdrop-blur">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold leading-tight text-neutral-950 transition group-hover:text-[#661093]">
                      {item.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-600">
                      {item.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between text-xs font-semibold text-neutral-500">
                      <span>{item.fileType}</span>

                      <span className="inline-flex items-center gap-1 text-[#661093]">
                        Explore
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* SHARE */}
      <Section className="pb-20">
        <Container>
          <div className="flex flex-col gap-5 rounded-[1.5rem] border border-neutral-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-[#661093]" />

                <p className="text-sm font-bold text-neutral-950">
                  Share this resource
                </p>
              </div>

              <p className="mt-1 text-sm text-neutral-500">
                Help another fashion creator discover it.
              </p>
            </div>

            <ShareButtons title={resource.title} />
          </div>
        </Container>
      </Section>
    </div>
  );
}