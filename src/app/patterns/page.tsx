import {
  Card,
  Container,
  Section,
} from "@/components/ui";

import { PageHero } from "@/components/shared";

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

        <Container>

          <div className="grid gap-6 md:grid-cols-3">


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


          </div>


        </Container>

      </Section>


    </div>
  );
}
