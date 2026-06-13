import {
  Badge,
  Button,
  Card,
  Container,
  Section,
} from "@/components/ui";

import { courses } from "@/content/courses";
import { videos } from "@/content/videos";
import { patterns } from "@/content/patterns";
import { resources } from "@/content/resources";
import { studentStories } from "@/content/success-stories";


export default function Home() {

  const featuredCourses = courses.filter(
    (course) => course.featured,
  );

  const featuredVideos = videos.filter(
    (video) => video.featured,
  );

  const featuredPatterns = patterns.filter(
    (pattern) => pattern.featured,
  );

  const featuredResources = resources.filter(
    (resource) => resource.featured,
  );

  const featuredStories = studentStories.filter(
    (story) => story.featured,
  );


  return (
    <div>


      <Section className="bg-neutral-950 text-white">

        <Container>

          <Badge>
            Fashion Education Platform
          </Badge>


          <h1 className="mt-6 max-w-3xl text-5xl font-bold">
            Build Fashion Skills.
            Create Beautiful Garments.
            Grow Your Brand.
          </h1>


          <p className="mt-6 max-w-2xl text-neutral-300">
            Learn fashion design, sewing, pattern making,
            and fashion business from beginner to professional level.
          </p>


          <div className="mt-10 flex gap-4">

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

          <h2 className="text-3xl font-bold">
            Featured Courses
          </h2>


          <div className="mt-8 grid gap-6 md:grid-cols-3">


            {featuredCourses.map((course) => (

              <Card key={course.id}>

                <h3 className="text-xl font-semibold">
                  {course.title}
                </h3>


                <p className="mt-3 text-neutral-600">
                  {course.description}
                </p>


                <p className="mt-4 text-[#661093]">
                  {course.duration}
                </p>


              </Card>

            ))}


          </div>

        </Container>

      </Section>





      <Section className="bg-neutral-50">

        <Container>

          <div className="grid gap-10 md:grid-cols-3">


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
                Resources
              </p>
            </div>


          </div>

        </Container>

      </Section>





      <Section>

        <Container>

          <h2 className="text-3xl font-bold">
            Student Success Stories
          </h2>


          <div className="mt-8 grid gap-6 md:grid-cols-3">


            {featuredStories.map((story) => (

              <Card key={story.id}>

                <h3 className="font-semibold">
                  {story.name}
                </h3>


                <p className="mt-3 text-neutral-600">
                  {story.story}
                </p>


              </Card>

            ))}


          </div>


        </Container>

      </Section>


    </div>
  );
}
