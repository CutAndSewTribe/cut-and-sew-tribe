import {
  Container,
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentCard,
  ContentGrid,
} from "@/components/shared";

import { courses } from "@/content/courses";


export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;


  const course = courses.find(
    (item) => item.slug === slug
  );


  if (!course) {
    return {
      title: "Course Not Found",
    };
  }


  return {
    title: `${course.title} | Cut and Sew Tribe`,
    description: course.description,
  };
}



export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}


export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;


  const course = courses.find(
    (item) => item.slug === slug
  );


  if (!course) {
    return (
      <div className="py-20 text-center">
        Course not found
      </div>
    );
  }


  return (
    <div>

      <PageHero
        label={course.level}
        title={course.title}
        description={course.description}
      />


      <Section>

        <Container>

          <ContentGrid>

            <ContentCard
              title="Course Details"
              description={
                course.subtitle
              }
              meta={`${course.duration} • ${course.price} ${course.currency}`}
              thumbnail={course.thumbnail}
            />


            <ContentCard
              title="What You Will Learn"
              description={
                course.outcomes.join(", ")
              }
              meta={`${course.modules.length} modules`}
              thumbnail={course.thumbnail}
            />


          </ContentGrid>


        </Container>

      </Section>


    </div>
  );
}

