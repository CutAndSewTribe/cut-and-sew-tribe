import {
  Badge,
  Card,
  Container,
  Section,
} from "@/components/ui";

import { videos } from "@/content/videos";


export default function VideosPage() {

  return (
    <div>

      <Section className="bg-neutral-950 text-white">

        <Container>

          <Badge>
            Video Library
          </Badge>


          <h1 className="mt-6 text-5xl font-bold">
            Learn Through Practical Lessons
          </h1>


          <p className="mt-6 max-w-2xl text-neutral-300">
            Watch step-by-step sewing, drafting, and fashion
            lessons designed to improve your skills.
          </p>


        </Container>

      </Section>




      <Section>

        <Container>

          <div className="grid gap-6 md:grid-cols-3">

            {videos.map((video) => (

              <Card key={video.id}>

                <h2 className="text-xl font-semibold">
                  {video.title}
                </h2>


                <p className="mt-3 text-neutral-600">
                  {video.description}
                </p>


                <div className="mt-4 text-sm text-[#661093]">

                  {video.duration}

                  {" • "}

                  {video.views} views

                </div>


              </Card>

            ))}

          </div>

        </Container>

      </Section>


    </div>
  );
}
