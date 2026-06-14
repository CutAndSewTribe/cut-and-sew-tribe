import {
  Card,
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentGrid,
} from "@/components/shared";

import { videos } from "@/content/videos";


export default function VideosPage() {

  return (
    <div>

      <PageHero
        label="Video Library"
        title="Learn Through Practical Lessons"
        description="Watch step-by-step sewing, drafting, and fashion lessons designed to improve your skills."
      />


      <Section>

        <ContentGrid>


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


        </ContentGrid>


      </Section>


    </div>
  );
}
