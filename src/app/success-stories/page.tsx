import Link from "next/link";

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

            <Link
              key={story.id}
              href={`/success-stories/${story.slug}`}
              className="block"
            >

              <ContentCard
                title={story.name}
                description={story.story}
                meta={`${story.course} • ${story.location}`}
              />

            </Link>

          ))}


        </ContentGrid>

      </Section>


    </div>
  );
}

