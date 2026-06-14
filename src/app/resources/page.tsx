import {
  Card,
  Container,
  Section,
} from "@/components/ui";

import { PageHero } from "@/components/shared";

import { resources } from "@/content/resources";


export default function ResourcesPage() {

  return (
    <div>

      <PageHero
        label="Learning Resources"
        title="Tools To Build Your Fashion Career"
        description="Access guides, templates, checklists, and professional resources to improve your workflow."
      />



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
