import {
  Badge,
  Card,
  Container,
  Section,
} from "@/components/ui";

import { resources } from "@/content/resources";


export default function ResourcesPage() {

  return (
    <div>

      <Section className="bg-neutral-950 text-white">

        <Container>

          <Badge>
            Learning Resources
          </Badge>


          <h1 className="mt-6 text-5xl font-bold">
            Tools To Build Your Fashion Career
          </h1>


          <p className="mt-6 max-w-2xl text-neutral-300">
            Access guides, templates, checklists, and
            professional resources to improve your workflow.
          </p>


        </Container>

      </Section>




      <Section>

        <Container>

          <div className="grid gap-6 md:grid-cols-3">


            {resources.map((resource) => (

              <Card key={resource.id}>


                <h2 className="text-xl font-semibold">
                  {resource.title}
                </h2>


                <p className="mt-3 text-neutral-600">
                  {resource.description}
                </p>


                <div className="mt-4 text-sm text-[#661093]">

                  Download Resource

                </div>


              </Card>

            ))}


          </div>


        </Container>

      </Section>


    </div>
  );
}
