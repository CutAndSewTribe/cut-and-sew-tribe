import Link from "next/link";

import {
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentGrid,
  ContentCard,
} from "@/components/shared";

import { courses } from "@/content/courses";


export default function CoursesPage() {

  return (
    <div>

      <PageHero
        label="Courses"
        title="Learn Fashion Design"
        description="Structured courses designed to take you from beginner skills to professional fashion creation."
      />


      <Section>

        <ContentGrid>


          {courses.map((course) => (

            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="block"
            >

              <ContentCard
                title={course.title}
                description={course.description}
                meta={`${course.level} • ${course.duration}`}
              />

            </Link>

          ))}


        </ContentGrid>

      </Section>


    </div>
  );
}

