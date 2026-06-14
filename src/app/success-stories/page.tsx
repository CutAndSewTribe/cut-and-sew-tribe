import {
  Card,
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentGrid,
} from "@/components/shared";

import { studentStories } from "@/content/success-stories";


export default function SuccessStoriesPage() {

  return (
    <div>

      <PageHero
        label="Student Community"
        title="Stories From Our Fashion Creators"
        description="Discover how students transformed their skills, launched brands, and built careers in fashion."
      />


      <Section>

        <ContentGrid>


          {studentStories.map((story) => (

            <Card key={story.name}>


              <h2 className="text-xl font-semibold">
                {story.name}
              </h2>


              <p className="mt-2 text-sm text-[#661093]">
                {story.location}
              </p>


              <p className="mt-4 text-neutral-600">
                {story.story}
              </p>


              <p className="mt-4 font-medium">
                {story.achievement}
              </p>


            </Card>

          ))}


        </ContentGrid>


      </Section>


    </div>
  );
}
