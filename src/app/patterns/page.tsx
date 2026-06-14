import {
  Card,
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentGrid,
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

            <Card key={pattern.id}>


              <h2 className="text-xl font-semibold">
                {pattern.title}
              </h2>


              <p className="mt-3 text-neutral-600">
                {pattern.description}
              </p>


              <div className="mt-4 text-sm text-[#661093]">

                {pattern.access}

              </div>


            </Card>

          ))}


        </ContentGrid>


      </Section>


    </div>
  );
}
