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

import { videos } from "@/content/videos";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const video = videos.find(
    (item) => item.slug === slug
  );


  if (!video) {
    return {
      title: "Video Not Found",
    };
  }


  return {
    title: video.title,

    description: video.description,


    openGraph: {
      title: video.title,

      description: video.description,

      type: "article",

      images: [
        {
          url: video.thumbnail,
          width: 1200,
          height: 630,
          alt: video.title,
        },
      ],
    },


    twitter: {
      card: "summary_large_image",

      title: video.title,

      description: video.description,

      images: [
        video.thumbnail,
      ],
    },
  };
}


export function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.slug,
  }));
}


export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;


  const video = videos.find(
    (item) => item.slug === slug
  );


  if (!video) {
    return (
      <div className="py-20 text-center">
        Video not found
      </div>
    );
  }


  return (
    <div>

      <PageHero
        label={video.level}
        title={video.title}
        description={video.description}
      />


      <Section>

        <Container>

          <ContentGrid>

            <ContentCard
              title="Lesson Details"
              description={
                video.category
              }
              meta={`${video.duration} • ${video.views} views`}
              thumbnail={video.thumbnail}
            />


            <ContentCard
              title="Instructor"
              description={
                video.instructor
              }
              meta={video.tags.join(", ")}
              thumbnail={video.thumbnail}
            />


                    </ContentGrid>


                    <ShareButtons
                      title={video.title}
                    />


                  </Container>

                </Section>


    </div>
  );
}

