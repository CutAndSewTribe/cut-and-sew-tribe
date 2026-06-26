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

import { resources } from "@/content/resources";


export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const resource = resources.find(
    (item) => item.slug === slug
  );


  if (!resource) {
    return {
      title: "Resource Not Found",
    };
  }


  return {
    title: resource.title,

    description: resource.description,


    openGraph: {
      title: resource.title,

      description: resource.description,

      type: "article",

      images: [
        {
          url: resource.thumbnail,
          width: 1200,
          height: 630,
          alt: resource.title,
        },
      ],
    },


    twitter: {
      card: "summary_large_image",

      title: resource.title,

      description: resource.description,

      images: [
        resource.thumbnail,
      ],
    },
  };
}

export function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}


export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;


  const resource = resources.find(
    (item) => item.slug === slug
  );


  if (!resource) {
    return (
      <div className="py-20 text-center">
        Resource not found
      </div>
    );
  }


  return (
    <div>

      <PageHero
        label={resource.category}
        title={resource.title}
        description={resource.description}
      />


      <Section>

        <Container>

          <ContentGrid>


            <ContentCard
              title="Resource Details"
              description={
                resource.fileType
              }
              meta={`${resource.access} • ${resource.downloads} downloads`}
              thumbnail={resource.thumbnail}
            />


            <ContentCard
              title="Download"
              description={
                "Access this professional fashion resource."
              }
              meta={resource.fileUrl}
              thumbnail={resource.thumbnail}
            />


                    </ContentGrid>


                    <ShareButtons
                      title={resource.title}
                    />


                  </Container>

                 </Section>


    </div>
  );
}

