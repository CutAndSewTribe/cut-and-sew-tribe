import {
  Badge,
  Card,
  Container,
  Section,
} from "@/components/ui";

import { patterns } from "@/content/patterns";


export default function PatternsPage() {

  return (
    <div>

      <Section className="bg-neutral-950 text-white">

        <Container>

          <Badge>
            Pattern Library
          </Badge>


          <h1 className="mt-6 text-5xl font-bold">
            Sewing Patterns For Every Skill Level
          </h1>


          <p className="mt-6 max-w-2xl text-neutral-300">
            Download professional sewing patterns and blocks
            to improve your garment construction workflow.
          </p>


        </Container>

      </Section>




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
