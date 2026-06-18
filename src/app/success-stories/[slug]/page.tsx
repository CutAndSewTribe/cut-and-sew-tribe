import {
  Container,
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentCard,
  ContentGrid,
} from "@/components/shared";

import { studentStories } from "@/content/success-stories";


export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;


  const story = studentStories.find(
    (item) => item.slug === slug
  );


  if (!story) {
    return {
      title: "Story Not Found",
    };
  }


  return {
    title: `${story.name} | Cut and Sew Tribe`,
    description: story.shortStory,
  };
}



export function generateStaticParams() {
  return studentStories.map((story) => ({
    slug: story.slug,
  }));
}


export default async function SuccessStoryDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;


  const story = studentStories.find(
    (item) => item.slug === slug
  );


  if (!story) {
    return (
      <div className="py-20 text-center">
        Story not found
      </div>
    );
  }


  return (
    <div>


      <PageHero
        label={story.course}
        title={story.name}
        description={story.shortStory}
      />


      <Section>

        <Container>

          <ContentGrid>


            <ContentCard
              title="Achievement"
              description={
                story.achievement
              }
              meta={story.location}
            />


            <ContentCard
              title="Story"
              description={
                story.story
              }
              meta="Student Success Story"
            />


          </ContentGrid>


        </Container>

      </Section>


    </div>
  );
}

