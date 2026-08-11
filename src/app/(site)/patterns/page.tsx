import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/shared";
import PatternCard from "@/components/media/PatternCard";
import { getPublishedPatterns } from "@/lib/patterns";

export const metadata = {
title: "Sewing Patterns & Pattern Drafting Guides | Cut And Sew Tribe",
description:
"Professional sewing patterns, bodice blocks, skirt blocks, menswear drafts, and pattern drafting tutorials designed to improve your garment construction skills.",
};

export default async function PatternsPage() {
const patterns = await getPublishedPatterns();

const featured = patterns.filter((pattern) => pattern.featured);
const regular = patterns.filter((pattern) => !pattern.featured);

return ( <div className="bg-[#faf8fc]"> <PageHero
     label="Pattern Drafting Library"
     title="Sewing Patterns That Teach You How to Draft, Fit, and Build Professional Garments"
     description="Every pattern is paired with a practical drafting guide, garment construction notes, and a clear path into the full Cut And Sew Tribe course that teaches the complete technique."
   />

```
  <Section>
    <Container>
      {featured.length > 0 && (
        <div className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#661093]">
                Featured pattern guides
              </p>
              <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                Start with these professional drafting tutorials
              </h2>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featured.map((pattern) => (
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
        </div>
      )}

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#661093]">
          Pattern drafting articles
        </p>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900">
          Learn drafting techniques one garment at a time
        </h2>
        <p className="mt-3 max-w-3xl text-neutral-600 leading-7">
          Explore bodice blocks, skirt drafts, menswear patterns, bridal structures, and practical garment drafting workflows used by professional fashion designers and dressmakers.
        </p>
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
</div>


);
}
