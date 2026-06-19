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
    type?: string;
    level?: string;
    category?: string;
  }>;
}) {


  const {
    q = "",
    type,
    level,
    category,
  } = await searchParams;



  const results = searchSite(
    q,
    {
      type:
        type as
          | "course"
          | "video"
          | "pattern"
          | "resource"
          | "student-story"
          | undefined,

      level,

      category,
    },
  );



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


          <div className="mb-8 flex flex-wrap gap-3">


            <Link
              href={`/search?q=${q}`}
              className="rounded-full border px-4 py-2 text-sm"
            >
              All
            </Link>


            <Link
              href={`/search?q=${q}&type=course`}
              className="rounded-full border px-4 py-2 text-sm"
            >
              Courses
            </Link>


            <Link
              href={`/search?q=${q}&type=video`}
              className="rounded-full border px-4 py-2 text-sm"
            >
              Videos
            </Link>


            <Link
              href={`/search?q=${q}&type=pattern`}
              className="rounded-full border px-4 py-2 text-sm"
            >
              Patterns
            </Link>


            <Link
              href={`/search?q=${q}&type=resource`}
              className="rounded-full border px-4 py-2 text-sm"
            >
              Resources
            </Link>


            <Link
              href={`/search?q=${q}&type=student-story`}
              className="rounded-full border px-4 py-2 text-sm"
            >
              Stories
            </Link>


          </div>




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