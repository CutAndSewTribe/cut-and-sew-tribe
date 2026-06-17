import {
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentGrid,
  ContentCard,
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

            <ContentCard
              key={video.id}
              title={video.title}
              description={video.description}
              meta={`${video.duration} • ${video.views} views`}
            />

          ))}


        </ContentGrid>


      </Section>


    </div>
  );
}

