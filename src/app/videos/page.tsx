import Link from "next/link";

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

            <Link
              key={video.id}
              href={`/videos/${video.slug}`}
              className="block"
            >

              <ContentCard
                title={video.title}
                description={video.description}
                meta={`${video.duration} • ${video.views} views`}
                thumbnail={video.thumbnail}
              />

            </Link>

          ))}


        </ContentGrid>

      </Section>


    </div>
  );
}

