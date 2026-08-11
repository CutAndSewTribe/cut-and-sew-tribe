import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/shared";
import ShareButtons from "@/components/shared/ShareButtons";
import { getPatternBySlug, getPublishedPatterns } from "@/lib/patterns";
import PatternArticleRenderer from '@/components/media/PatternArticleRenderer';

export async function generateMetadata({
params,
}: {
params: Promise<{ slug: string }>;
}) {
const { slug } = await params;
const pattern = await getPatternBySlug(slug);

if (!pattern) {
return {
title: "Pattern Not Found",
};
}

return {
title: pattern.seo_title ?? pattern.title,
description: pattern.seo_description ?? pattern.excerpt,
openGraph: {
title: pattern.seo_title ?? pattern.title,
description: pattern.seo_description ?? pattern.excerpt,
images: pattern.thumbnail ? [pattern.thumbnail] : [],
type: "article",
},
twitter: {
card: "summary_large_image",
title: pattern.seo_title ?? pattern.title,
description: pattern.seo_description ?? pattern.excerpt,
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

return ( <div className="bg-[#faf8fc]">
<PageHero
  label={pattern.level}
  title={pattern.title}
  description={pattern.excerpt ?? "Learn the complete pattern drafting process, download the pattern resources, and continue to the full course for step-by-step instruction."}
/>


  <Section>
    <Container className="max-w-4xl">
      {pattern.thumbnail && (
        <div className="relative mb-10 aspect-video overflow-hidden rounded-3xl border border-neutral-200 bg-white">
          <Image
            src={pattern.thumbnail}
            alt={pattern.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="prose prose-neutral max-w-none">
          {pattern.content ? ( <PatternArticleRenderer content={pattern.content} />
) : (

  <p className='text-neutral-700'>
    This pattern article is coming soon.
  </p>
)}

        </div>

        {pattern.download_url && (
          <div className="mt-10 rounded-2xl border border-[#661093]/20 bg-[#661093]/5 p-6">
            <h3 className="text-xl font-bold text-neutral-900">
              Download the pattern
            </h3>
            <p className="mt-2 text-neutral-600">
              Get the printable {pattern.file_format} version of this pattern for sewing practice and garment development.
            </p>
            <a
              href={pattern.download_url}
              className="mt-4 inline-flex rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white hover:bg-[#4E0C70]"
            >
              Download Pattern
            </a>
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-[#D4AF37]/30 bg-linear-to-r from-[#661093] to-[#7A16AF] p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
            Learn the complete method
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            Turn this pattern into a professional garment
          </h3>

          <p className="mt-4 max-w-2xl text-white/85 leading-7">
            This free pattern is only one part of the full drafting and garment construction process. Join the complete Cut And Sew Tribe course to learn measurements, drafting, fitting, sewing, finishing, and client-ready garment production.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={pattern.related_course_slug ? `/courses/${pattern.related_course_slug}` : "/courses"}
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-[#661093] hover:bg-neutral-100"
            >
              Enroll in the Full Course
            </Link>

            <Link
              href="/courses"
              className="rounded-2xl border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Browse All Courses
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <ShareButtons title={pattern.title} />
        </div>
      </article>
    </Container>
  </Section>
</div>


);
}
