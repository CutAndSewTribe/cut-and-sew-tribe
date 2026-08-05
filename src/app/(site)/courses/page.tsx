import Image from "next/image";
import { Search, Sparkles, ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/ui";
import CourseMarketplaceCard from "@/components/courses/CourseMarketplaceCard";

import { getPublishedCourses } from "@/lib/lms/courses";

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  const featuredCourse =
    courses.find((course) => course.featured) ?? courses[0];

  const remainingCourses = featuredCourse
    ? courses.filter((course) => course.id !== featuredCourse.id)
    : [];

  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden bg-[#0F0718] text-white">
        {/* Background image */}
        <Image
          src="/images/courses/hero-fashion-academy.jpg"
          alt="Cut and Sew Tribe fashion academy"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/55" />

        <Container className="relative py-20 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              Premium fashion education
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight lg:text-7xl">
              Master fashion design from beginner to advanced courses.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 lg:text-xl">
              Learn dressmaking, bridal construction, ready-to-wear design,
              pattern drafting, and fashion business from industry-focused tutors
              through structured, self-paced programs designed for real careers.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                4.9 average rating
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                3,000+ students
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                420+ lessons
              </div>
            </div>

            <div className="mt-10 max-w-2xl">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                <Search className="h-5 w-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Search courses, tutorials, and patterns..."
                  className="w-full bg-transparent text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "All",
                "Dressmaking",
                "Bridal",
                "Menswear",
                "Business",
                "Pattern Drafting",
              ].map((category) => (
                <button
                  key={category}
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Course */}
      <Section className="bg-[#F8F7FA]">
        <Container className="py-16">
          {featuredCourse ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
                    Featured program
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-neutral-900 lg:text-4xl">
                    Start with our most transformative course
                  </h2>
                </div>

                <div className="hidden items-center gap-2 text-sm font-semibold text-[#661093] lg:flex">
                  Curated by our instructors
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              <CourseMarketplaceCard course={featuredCourse} featured />
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center">
              <h2 className="text-2xl font-bold text-neutral-900">
                Courses are coming soon
              </h2>
              <p className="mt-3 text-neutral-600">
                Your published courses will appear here automatically.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Course Catalog */}
      <Section>
        <Container className="py-16">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
                Browse the catalog
              </p>
              <h2 className="mt-2 text-3xl font-bold text-neutral-900 lg:text-4xl">
                Explore every Cut and Sew Tribe program
              </h2>
              <p className="mt-3 max-w-2xl text-neutral-600">
                From foundational sewing skills to advanced bridal and ready-to-wear
                construction, every course is designed to help you create
                professional-quality garments and build a sustainable fashion
                career.
              </p>
            </div>

            <div className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
              {courses.length} courses available
            </div>
          </div>

          {remainingCourses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
              <h3 className="text-2xl font-bold text-neutral-900">
                More courses are on the way
              </h3>
              <p className="mt-3 text-neutral-600">
                Publish additional courses from the instructor dashboard and they
                will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {remainingCourses.map((course) => (
                <CourseMarketplaceCard
                  key={course.id}
                  course={course}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Social Proof */}
      <Section className="bg-[#F8F7FA]">
        <Container className="py-16">
          <div className="rounded-3xl bg-white p-8 shadow-sm lg:p-12">
            <div className="grid gap-8 lg:grid-cols-4">
              {[
                { value: "3,000+", label: "Students trained" },
                { value: "420+", label: "Lessons available" },
                { value: "4.9/5", label: "Average rating" },
                { value: "24/7", label: "Community support" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-[#661093]">
                    {item.value}
                  </div>
                  <p className="mt-2 text-neutral-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}