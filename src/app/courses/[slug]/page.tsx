import {
  Container,
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentCard,
} from "@/components/shared";

import Button from "@/components/ui/Button";

import ShareButtons from "@/components/shared/ShareButtons";

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
    title: course.title,
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

        label={`${course.level} course`}

        title={course.title}

        description={course.description}

      />





      <Section className="bg-neutral-50">

        <Container>


          <div
            className="
              grid
              gap-10
              lg:grid-cols-3
            "
          >





            <div
              className="
                lg:col-span-2
                space-y-10
              "
            >




              <ContentCard

                title="Course Overview"

                description={course.subtitle}

                thumbnail={course.thumbnail}

                meta={`${course.duration} • ${course.price.toLocaleString()} ${course.currency}`}

              />





              <div
                className="
                  rounded-3xl
                  bg-white
                  border
                  border-neutral-200
                  p-8
                  shadow-sm
                "
              >

                <h2
                  className="
                    text-3xl
                    font-bold
                    text-neutral-900
                  "
                >
                  Course Modules
                </h2>


                <p
                  className="
                    mt-3
                    text-neutral-600
                  "
                >
                  Follow the complete learning path step by step.
                </p>



                <div
                  className="
                    mt-8
                    space-y-5
                  "
                >


                  {course.modules.map(
                    (module, index) => (

                    <div
                      key={module.id}
                      className="
                        rounded-2xl
                        border
                        border-neutral-200
                        bg-white
                        p-6
                        shadow-sm
                        transition
                        hover:-translate-y-1
                        hover:shadow-lg
                      "
                    >


                      <div
                        className="
                          flex
                          items-start
                          gap-4
                        "
                      >


                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#661093]
                            font-bold
                            text-white
                          "
                        >
                          {index + 1}
                        </div>



                        <div>

                          <h3
                            className="
                              text-xl
                              font-bold
                              text-neutral-900
                            "
                          >
                            {module.title}
                          </h3>


                          <div
                            className="
                              mt-3
                              flex
                              gap-4
                              text-sm
                              font-semibold
                              text-[#661093]
                            "
                          >

                            <span>
                              {module.lessons} lessons
                            </span>

                            <span>
                              {module.duration}
                            </span>

                          </div>


                        </div>


                      </div>


                    </div>

                  ))}


                </div>


              </div>







              <div
                className="
                  rounded-3xl
                  bg-white
                  border
                  border-neutral-200
                  p-8
                  shadow-sm
                "
              >


                <h2
                  className="
                    text-3xl
                    font-bold
                    text-neutral-900
                  "
                >
                  What You Will Learn
                </h2>



                <div
                  className="
                    mt-6
                    grid
                    gap-4
                    md:grid-cols-2
                  "
                >

                {course.outcomes.map((item) => (

                  <div
                    key={item}
                    className="
                      rounded-xl
                      bg-neutral-50
                      p-4
                      font-medium
                      text-neutral-800
                    "
                  >

                    ✓ {item}

                  </div>

                ))}


                </div>


              </div>




            </div>









            <aside
              className="
                h-fit
                rounded-3xl
                bg-white
                border
                border-neutral-200
                p-8
                shadow-xl
                lg:sticky
                lg:top-24
              "
            >


              <p
                className="
                  font-semibold
                  text-neutral-500
                "
              >
                Enroll today
              </p>


              <h2
                className="
                  mt-3
                  text-5xl
                  font-bold
                  text-[#661093]
                "
              >

                ₦{course.price.toLocaleString()}

              </h2>



              <div
                className="
                  mt-5
                  space-y-3
                  text-sm
                  text-neutral-700
                "
              >

                <p>
                  ✓ Lifetime course access
                </p>

                <p>
                  ✓ Structured lessons
                </p>

                <p>
                  ✓ Fashion skill development
                </p>

              </div>




              <Button
                href={`/checkout/${course.slug}`}
                className="mt-8 w-full"
              >
                Enroll Now
              </Button>




              <ShareButtons
                title={course.title}
              />


            </aside>



          </div>


        </Container>


      </Section>


    </div>

  );

}
