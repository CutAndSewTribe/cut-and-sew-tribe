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

        label={course.level}

        title={course.title}

        description={course.description}

      />





      <Section>

        <Container>


          {/* Top purchase area */}

          <div
            className="
              mb-12
              grid
              gap-8
              rounded-3xl
              bg-white
              p-8
              shadow-xl
              lg:grid-cols-3
            "
          >



            <div className="lg:col-span-2">


              <ContentCard

                title="Course Overview"

                description={course.subtitle}

                thumbnail={course.thumbnail}

                meta={`${course.duration} • ${course.price.toLocaleString()} ${course.currency}`}

              />


            </div>





            <div
              className="
                flex
                flex-col
                justify-center
                rounded-3xl
                bg-[#661093]
                p-8
                text-white
              "
            >


              <p
                className="
                  text-sm
                  font-semibold
                  text-purple-200
                "
              >
                Investment
              </p>



              <h2
                className="
                  mt-2
                  text-5xl
                  font-bold
                "
              >
                ₦{course.price.toLocaleString()}
              </h2>



              <p
                className="
                  mt-3
                  text-purple-100
                "
              >
                Lifetime access to course materials.
              </p>




              <Button
                href={`/checkout/${course.slug}`}
                className="
                  mt-8
                  w-full
                  bg-white
                  text-[#661093]
                  hover:bg-purple-100
                "
              >
                Enroll Now
              </Button>



              <ShareButtons
                title={course.title}
              />


            </div>



          </div>






          {/* Modules */}


          <div
            className="
              rounded-3xl
              border
              border-neutral-200
              bg-white
              p-8
              shadow-lg
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



            <div
              className="
                mt-8
                grid
                gap-5
                md:grid-cols-2
              "
            >



              {course.modules.map((module, index) => (

                <div
                  key={module.id}
                  className="
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-neutral-50
                    p-6
                    transition
                    hover:border-[#661093]
                    hover:shadow-md
                  "
                >


                  <div
                    className="
                      mb-3
                      text-sm
                      font-bold
                      text-[#661093]
                    "
                  >
                    MODULE {index + 1}
                  </div>



                  <h3
                    className="
                      text-xl
                      font-bold
                      text-neutral-900
                    "
                  >
                    {module.title}
                  </h3>



                  <p
                    className="
                      mt-3
                      font-medium
                      text-neutral-700
                    "
                  >
                    {module.lessons} lessons
                    {" • "}
                    {module.duration}
                  </p>


                </div>


              ))}


            </div>


          </div>







          {/* Learning outcomes */}


          <div
            className="
              mt-12
              rounded-3xl
              bg-neutral-950
              p-8
              text-white
            "
          >


            <h2
              className="
                text-3xl
                font-bold
              "
            >
              What You Will Learn
            </h2>



            <ul
              className="
                mt-6
                grid
                gap-4
                md:grid-cols-2
              "
            >

              {course.outcomes.map((item)=>(
                <li
                  key={item}
                  className="
                    rounded-xl
                    bg-white/10
                    p-4
                    font-medium
                  "
                >
                  ✓ {item}
                </li>
              ))}

            </ul>


          </div>




        </Container>


      </Section>


    </div>

  );

}