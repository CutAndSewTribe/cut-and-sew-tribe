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

import { courses } from "@/content/courses";


export default function CoursesPage() {

  return (
    <div>

      <PageHero
        label="Courses"
        title="Learn Fashion Design"
        description="Structured fashion programs that take you from beginner skills to professional garment creation."
      />


      <Section>

        <Container>

          <ContentGrid>


            {courses.map((course) => (

              <ContentCard

                key={course.id}

                title={course.title}

                description={course.description}

                meta={`${course.level} • ${course.duration} • ${course.price.toLocaleString()} ${course.currency}`}

                thumbnail={course.thumbnail}

              >

                <div className="mt-6 flex gap-3">

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

                    <Button
                      className="w-full bg-[#661093] text-white"
                    >
                      Enroll Now
                    </Button>

                  </Link>


                </div>


              </ContentCard>

            ))}


          </ContentGrid>


        </Container>

      </Section>


    </div>
  );
}