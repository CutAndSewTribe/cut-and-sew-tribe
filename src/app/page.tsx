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
    <div className="bg-white">


      <PageHero
        label="Fashion Education Platform"
        title="Build Fashion Skills. Create Beautiful Garments. Grow Your Brand."
        description="Learn fashion design, sewing, pattern drafting, and fashion business from beginner to professional level."
      />



      {/* CTA */}

      <Section>

        <Container>

          <div
            className="
              rounded-3xl
              bg-[#661093]
              p-8
              text-white
              md:flex
              md:items-center
              md:justify-between
            "
          >

            <div>

              <h2 className="text-3xl font-bold">
                Start creating your fashion future
              </h2>


              <p className="mt-3 text-white/80">
                Learn practical skills and build your fashion confidence.
              </p>

            </div>



            <div className="mt-6 flex gap-4 md:mt-0">

              <Button href="/courses">
                Explore Courses
              </Button>


              <Button href="/videos">
                Watch Lessons
              </Button>


            </div>


          </div>

        </Container>

      </Section>





      {/* COURSES */}

      <Section className="bg-neutral-50">

        <Container>


          <p className="text-sm font-semibold uppercase tracking-widest text-[#661093]">
            Learn
          </p>


          <h2 className="mt-3 text-4xl font-bold">
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
                  thumbnail={course.thumbnail}
                />


              </Link>

            ))}


          </ContentGrid>


        </Container>

      </Section>





      {/* STATS */}

      <Section>


        <Container>


          <div
            className="
              grid
              gap-6
              md:grid-cols-3
            "
          >


            <div className="rounded-3xl border p-8">

              <h3 className="text-4xl font-bold text-[#661093]">
                {featuredVideos.length}
              </h3>

              <p className="mt-2 font-medium">
                Video Lessons
              </p>

            </div>



            <div className="rounded-3xl border p-8">

              <h3 className="text-4xl font-bold text-[#661093]">
                {featuredPatterns.length}
              </h3>

              <p className="mt-2 font-medium">
                Sewing Patterns
              </p>

            </div>



            <div className="rounded-3xl border p-8">

              <h3 className="text-4xl font-bold text-[#661093]">
                {featuredResources.length}
              </h3>

              <p className="mt-2 font-medium">
                Resources
              </p>

            </div>


          </div>


        </Container>


      </Section>





      {/* VIDEOS */}

      <Section className="bg-neutral-50">


        <Container>


          <p className="text-sm font-semibold uppercase tracking-widest text-[#661093]">
            Tutorials
          </p>


          <h2 className="mt-3 text-4xl font-bold">
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
                  thumbnail={video.thumbnail}
                />


              </Link>

            ))}


          </ContentGrid>


        </Container>


      </Section>





      {/* STORIES */}

      <Section>


        <Container>


          <p className="text-sm font-semibold uppercase tracking-widest text-[#661093]">
            Community
          </p>


          <h2 className="mt-3 text-4xl font-bold">
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
                  thumbnail={story.image}
                />


              </Link>

            ))}


          </ContentGrid>


        </Container>


      </Section>



    </div>
  );
}