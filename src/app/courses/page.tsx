import {
  Card,
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentGrid,
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

            <Card key={course.id}>


              <h2 className="text-xl font-semibold">
                {course.title}
              </h2>


              <p className="mt-3 text-neutral-600">
                {course.description}
              </p>


              <div className="mt-4 text-sm text-[#661093]">

                {course.level}

                {" • "}

                {course.duration}

              </div>


            </Card>

          ))}


        </ContentGrid>

      </Section>


    </div>
  );
}

