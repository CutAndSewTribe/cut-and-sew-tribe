import Link from "next/link";

import {
  Container,
  Section,
} from "@/components/ui";

import {
  ContentGrid,
  ContentCard,
  PageHero,
} from "@/components/shared";

import { searchSite } from "@/features/search/services/content-search.service";


export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {

  const { q = "" } = await searchParams;


  const results = searchSite(q);


  return (
    <div>


      <PageHero
        label="Search"
        title={
          q
            ? `Results for "${q}"`
            : "Search Fashion Content"
        }
        description="Find courses, videos, patterns, resources, and student stories."
      />


      <Section>

        <Container>


          <ContentGrid>


            {results.map((result) => (

              <Link
                key={result.id}
                href={result.url}
                className="block"
              >

                <ContentCard
                  title={result.title}
                  description={result.description}
                  meta={result.type}
                />


              </Link>

            ))}


          </ContentGrid>


        </Container>

      </Section>


    </div>
  );
}

