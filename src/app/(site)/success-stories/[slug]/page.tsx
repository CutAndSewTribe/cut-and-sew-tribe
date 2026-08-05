import {
  Container,
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentCard,
  ContentGrid,
} from "@/components/shared";

import ShareButtons from "@/components/shared/ShareButtons";

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
    title: story.name,

    description: story.shortStory,


    openGraph: {
      title: story.name,

      description: story.shortStory,

      type: "article",

      images: [
        {
          url: story.image,
          width: 1200,
          height: 630,
          alt: story.name,
        },
      ],
    },


    twitter: {
      card: "summary_large_image",

      title: story.name,

      description: story.shortStory,

      images: [
        story.image,
      ],
    },
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
              thumbnail={story.image}
            />


            <ContentCard
              title="Story"
              description={
                story.story
              }
              meta="Student Success Story"
              thumbnail={story.image}
            />


                    </ContentGrid>


                    <ShareButtons
                      title={story.name}
                    />


                  </Container>

                </Section>


    </div>
  );
}

