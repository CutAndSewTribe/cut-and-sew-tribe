import Link from "next/link";

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
    <div className="flex flex-col">


      {/* Hero */}

      <section className="bg-neutral-950 px-6 py-24 text-white">

        <div className="mx-auto max-w-7xl">

          <p className="mb-4 text-sm uppercase tracking-widest text-[#D4AF37]">
            Fashion Education Platform
          </p>


          <h1 className="max-w-3xl text-5xl font-bold leading-tight">
            Build Fashion Skills.
            Create Beautiful Garments.
            Grow Your Brand.
          </h1>


          <p className="mt-6 max-w-2xl text-lg text-neutral-300">
            Learn fashion design, sewing, pattern making,
            and fashion business from beginner to professional level.
          </p>


          <div className="mt-10 flex gap-4">

            <Link
              href="/courses"
              className="rounded-full bg-[#661093] px-7 py-3"
            >
              Explore Courses
            </Link>


            <Link
              href="/videos"
              className="rounded-full border border-white px-7 py-3"
            >
              Watch Lessons
            </Link>

          </div>

        </div>

      </section>




      {/* Courses */}

      <section className="mx-auto w-full max-w-7xl px-6 py-20">

        <h2 className="text-3xl font-bold">
          Featured Courses
        </h2>


        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {featuredCourses.map((course) => (

            <div
              key={course.id}
              className="rounded-2xl border p-6"
            >

              <h3 className="text-xl font-semibold">
                {course.title}
              </h3>


              <p className="mt-3 text-neutral-600">
                {course.description}
              </p>


              <p className="mt-4 text-[#661093]">
                {course.duration}
              </p>

            </div>

          ))}

        </div>

      </section>





      {/* Learning Library */}

      <section className="bg-neutral-50 px-6 py-20">

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">


          <div>
            <h3 className="text-2xl font-bold">
              {featuredVideos.length}
            </h3>

            <p>
              Video Lessons
            </p>
          </div>


          <div>
            <h3 className="text-2xl font-bold">
              {featuredPatterns.length}
            </h3>

            <p>
              Sewing Patterns
            </p>
          </div>


          <div>
            <h3 className="text-2xl font-bold">
              {featuredResources.length}
            </h3>

            <p>
              Learning Resources
            </p>
          </div>


        </div>

      </section>





      {/* Community */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="text-3xl font-bold">
          Student Success Stories
        </h2>


        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {featuredStories.map((story) => (

            <div
              key={story.id}
              className="rounded-2xl border p-6"
            >

              <h3 className="font-semibold">
                {story.name}
              </h3>


              <p className="mt-3 text-neutral-600">
                {story.story}
              </p>

            </div>

          ))}

        </div>


      </section>


    </div>
  );
}

