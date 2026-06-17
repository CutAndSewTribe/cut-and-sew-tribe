import Link from "next/link";

import {
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentGrid,
  ContentCard,
} from "@/components/shared";

import { patterns } from "@/content/patterns";


export default function PatternsPage() {

  return (
    <div>

      <PageHero
        label="Pattern Library"
        title="Sewing Patterns For Every Skill Level"
        description="Download professional sewing patterns and blocks to improve your garment construction workflow."
      />


      <Section>

        <ContentGrid>


          {patterns.map((pattern) => (

            <Link
              key={pattern.id}
              href={`/patterns/${pattern.slug}`}
              className="block"
            >

              <ContentCard
                title={pattern.title}
                description={pattern.description}
                meta={`${pattern.level} • ${pattern.access}`}
              />

            </Link>

          ))}


        </ContentGrid>

      </Section>


    </div>
  );
}

