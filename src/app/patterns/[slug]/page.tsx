import {
  Container,
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentCard,
  ContentGrid,
} from "@/components/shared";

import { patterns } from "@/content/patterns";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;


  const pattern = patterns.find(
    (item) => item.slug === slug
  );


  if (!pattern) {
    return {
      title: "Pattern Not Found",
    };
  }


  return {
    title: `${pattern.title} | Cut and Sew Tribe`,
    description: pattern.description,
  };
}



export function generateStaticParams() {
  return patterns.map((pattern) => ({
    slug: pattern.slug,
  }));
}


export default async function PatternDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;


  const pattern = patterns.find(
    (item) => item.slug === slug
  );


  if (!pattern) {
    return (
      <div className="py-20 text-center">
        Pattern not found
      </div>
    );
  }


  return (
    <div>

      <PageHero
        label={pattern.level}
        title={pattern.title}
        description={pattern.description}
      />


      <Section>

        <Container>

          <ContentGrid>

            <ContentCard
              title="Pattern Details"
              description={
                pattern.category
              }
              meta={`${pattern.access} • ${pattern.fileFormat}`}
              thumbnail={pattern.thumbnail}
            />


            <ContentCard
              title="Download"
              description={
                "Access this professional sewing pattern."
              }
              meta={pattern.downloadUrl}
              thumbnail={pattern.thumbnail}
            />


          </ContentGrid>

        </Container>

      </Section>


    </div>
  );
}

