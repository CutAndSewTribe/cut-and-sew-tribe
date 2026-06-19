import Link from "next/link";

import {
  Button,
  Container,
  Section,
} from "@/components/ui";


import {
  PageHero,
  ContentGrid,
  ContentCard,
} from "@/components/shared";


import { courses } from "@/content/courses";
import { videos } from "@/content/videos";
import { patterns } from "@/content/patterns";
import { resources } from "@/content/resources";
import { studentStories } from "@/content/success-stories";


export default function Home() {


  const featuredCourses =
    courses.filter(
      (course) => course.featured,
    );


  const featuredVideos =
    videos.filter(
      (video) => video.featured,
    );


  const featuredPatterns =
    patterns.filter(
      (pattern) => pattern.featured,
    );


  const featuredResources =
    resources.filter(
      (resource) => resource.featured,
    );


  const featuredStories =
    studentStories.filter(
      (story) => story.featured,
    );



  return (
    <div>


      <PageHero
        label="Fashion Education Platform"
        title="Build Fashion Skills. Create Beautiful Garments. Grow Your Brand."
        description="Learn fashion design, sewing, pattern drafting, and fashion business from beginner to professional level."
      />


      <Section>

        <Container>

          <div className="flex gap-4">

            <Button href="/courses">
              Explore Courses
            </Button>


            <Button href="/videos">
              Watch Lessons
            </Button>

          </div>

        </Container>

      </Section>




      <Section>

        <Container>


          <h2 className="mb-8 text-3xl font-bold">
            Featured Courses
          </h2>


          <ContentGrid>


            {featuredCourses.map((course) => (

              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
              >

                <ContentCard
                  title={course.title}
                  description={course.description}
                  meta={`${course.level} • ${course.duration}`}
                />

              </Link>

            ))}


          </ContentGrid>


        </Container>

      </Section>





      <Section className="bg-neutral-50">

        <Container>


          <div className="grid gap-8 md:grid-cols-3">


            <div>

              <h3 className="text-3xl font-bold">
                {featuredVideos.length}
              </h3>

              <p>
                Video Lessons
              </p>

            </div>


            <div>

              <h3 className="text-3xl font-bold">
                {featuredPatterns.length}
              </h3>

              <p>
                Sewing Patterns
              </p>

            </div>


            <div>

              <h3 className="text-3xl font-bold">
                {featuredResources.length}
              </h3>

              <p>
                Learning Resources
              </p>

            </div>


          </div>


        </Container>

      </Section>





      <Section>

        <Container>


          <h2 className="mb-8 text-3xl font-bold">
            Featured Videos
          </h2>


          <ContentGrid>


            {featuredVideos.slice(0,3).map((video) => (

              <Link
                key={video.id}
                href={`/videos/${video.slug}`}
              >

                <ContentCard
                  title={video.title}
                  description={video.description}
                  meta={`${video.level} • ${video.duration}`}
                />

              </Link>

            ))}


          </ContentGrid>


        </Container>

      </Section>





      <Section>


        <Container>


          <h2 className="mb-8 text-3xl font-bold">
            Student Success Stories
          </h2>


          <ContentGrid>


            {featuredStories.map((story) => (

              <Link
                key={story.id}
                href={`/success-stories/${story.slug}`}
              >

                <ContentCard
                  title={story.name}
                  description={story.shortStory}
                  meta={story.course}
                />

              </Link>

            ))}


          </ContentGrid>


        </Container>


      </Section>


    </div>
  );
}