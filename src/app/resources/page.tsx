import {
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentGrid,
  ContentCard,
} from "@/components/shared";

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

        <ContentGrid>


          {resources.map((resource) => (

            <ContentCard
              key={resource.id}
              title={resource.title}
              description={resource.description}
              meta="Download Resource"
            />

          ))}


        </ContentGrid>


      </Section>


    </div>
  );
}

