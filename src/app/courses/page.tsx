import {
  Badge,
  Card,
  Container,
  Section,
} from "@/components/ui";

import { courses } from "@/content/courses";


export default function CoursesPage() {

  return (
    <div>

      <Section className="bg-neutral-950 text-white">

        <Container>

          <Badge>
            Courses
          </Badge>


          <h1 className="mt-6 text-5xl font-bold">
            Learn Fashion Design
          </h1>


          <p className="mt-6 max-w-2xl text-neutral-300">
            Structured courses designed to take you
            from beginner skills to professional fashion creation.
          </p>


        </Container>

      </Section>



      <Section>

        <Container>

          <div className="grid gap-6 md:grid-cols-3">


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


          </div>


        </Container>

      </Section>


    </div>
  );
}

