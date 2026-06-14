import {
  Badge,
  Card,
  Container,
  Section,
} from "@/components/ui";

import { studentStories } from "@/content/success-stories";


export default function SuccessStoriesPage() {

  return (
    <div>

      <Section className="bg-neutral-950 text-white">

        <Container>

          <Badge>
            Student Community
          </Badge>


          <h1 className="mt-6 text-5xl font-bold">
            Stories From Our Fashion Creators
          </h1>


          <p className="mt-6 max-w-2xl text-neutral-300">
            Discover how students transformed their skills,
            launched brands, and built careers in fashion.
          </p>


        </Container>

      </Section>




      <Section>

        <Container>

          <div className="grid gap-6 md:grid-cols-3">


            {studentStories.map((story) => (

              <Card key={story.name}>


                <h2 className="text-xl font-semibold">
                  {story.name}
                </h2>


                <p className="mt-2 text-sm text-[#661093]">
                  {story.location}
                </p>


                <p className="mt-4 text-neutral-600">
                  {story.story}
                </p>


                <p className="mt-4 font-medium">
                  {story.achievement}
                </p>


              </Card>

            ))}


          </div>


        </Container>

      </Section>


    </div>
  );
}
