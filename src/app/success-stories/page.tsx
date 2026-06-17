import {
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentGrid,
  ContentCard,
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

            <ContentCard
              key={story.name}
              title={story.name}
              description={story.story}
              meta={`${story.location} • ${story.achievement}`}
            />

          ))}


        </ContentGrid>


      </Section>


    </div>
  );
}

