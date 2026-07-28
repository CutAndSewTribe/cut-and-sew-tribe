import Link from "next/link";

import {
Section,
Container,
Button,
} from "@/components/ui";

import {
PageHero,
ContentGrid,
ContentCard,
} from "@/components/shared";

import { getPublishedCourses } from "@/lib/lms/courses";

export default async function CoursesPage() {
const courses = await getPublishedCourses();

return ( <div> <PageHero
     label="Courses"
     title="Learn Fashion Design"
     description="Structured fashion programs that take you from beginner skills to professional garment creation."
   />

  <Section>
    <Container>
      {courses.length === 0 ? (
        <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            No courses available yet
          </h2>

          <p className="mt-3 text-neutral-600">
            New courses will appear here as they are published.
          </p>
        </div>
      ) : (
        <ContentGrid>
          {courses.map((course) => (
            <ContentCard
              key={course.id}
              title={course.title}
              description={
                course.description ??
                "Explore this fashion design course."
              }
              meta={`${course.level} • ${
                course.duration ?? "Self-paced"
              } • ${course.price.toLocaleString()} ${
                course.currency
              }`}
              thumbnail={course.thumbnail ?? undefined}
            >
              <div className="flex gap-3">
                <Link
                  href={`/courses/${course.slug}`}
                  className="flex-1"
                >
                  <Button className="w-full">
                    View Course
                  </Button>
                </Link>

                <Link
                  href={`/courses/${course.slug}`}
                  className="flex-1"
                >
                  <Button className="w-full bg-[#661093] text-white">
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </ContentCard>
          ))}
        </ContentGrid>
      )}
    </Container>
  </Section>
</div>

);
}
