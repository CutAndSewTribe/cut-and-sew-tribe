import {
  Container,
  Section,
} from "@/components/ui";

import {
  PageHero,
  ContentCard,
} from "@/components/shared";

import Button from "@/components/ui/Button";
import ShareButtons from "@/components/shared/ShareButtons";

import { getCurrentUser } from "@/lib/auth/get-user";
import { hasCourseAccess } from "@/lib/access/course-access";

import { getCourseBySlug } from "@/lib/lms/courses";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course.title,
    description:
      course.description ??
      `Learn ${course.title} with Cut and Sew Tribe.`,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  /*
   * IMPORTANT:
   *
   * This now reads the course from Supabase.
   *
   * Therefore:
   *
   * /courses/bustier
   *
   * and
   *
   * /learn/bustier
   *
   * both use the same Supabase course.
   */
  const course = await getCourseBySlug(slug);

  if (!course) {
    return (
      <div className="py-20 text-center">
        Course not found
      </div>
    );
  }

  const user = await getCurrentUser();

  const enrolled = user
    ? await hasCourseAccess(course.slug)
    : false;

  return (
    <div>
      <PageHero
        label={course.level}
        title={course.title}
        description={
          course.description ??
          "Learn step by step with Cut and Sew Tribe."
        }
      />

      <Section>
        <Container>
          {/* Top purchase area */}
          <div
            className="
              mb-12
              grid
              gap-8
              rounded-3xl
              bg-white
              p-8
              shadow-xl
              lg:grid-cols-3
            "
          >
            <div className="lg:col-span-2">
              <ContentCard
  title={course.title}
  description={course.description ?? ""}
  thumbnail={course.thumbnail ?? undefined}
  meta={`${course.duration ?? ""} • ${course.price.toLocaleString()} ${course.currency}`}
/>
            </div>

            <div
              className="
                flex
                flex-col
                justify-center
                rounded-3xl
                bg-[#661093]
                p-8
                text-white
              "
            >
              <p
                className="
                  text-sm
                  font-semibold
                  text-purple-200
                "
              >
                Investment
              </p>

              <h2
                className="
                  mt-2
                  text-5xl
                  font-bold
                "
              >
                ₦{course.price.toLocaleString()}
              </h2>

              <p
                className="
                  mt-3
                  text-purple-100
                "
              >
                Lifetime access to course materials.
              </p>

              {!user ? (
                <Button
                  href="/login"
                  className="
                    mt-8
                    w-full
                    bg-white
                    text-[#661093]
                    hover:bg-purple-100
                  "
                >
                  Log in to Enroll
                </Button>
              ) : enrolled ? (
                <Button
                  href={`/learn/${course.slug}`}
                  className="
                    mt-8
                    w-full
                    bg-white
                    text-[#661093]
                    hover:bg-purple-100
                  "
                >
                  Continue Learning
                </Button>
              ) : (
                <Button
                  href={`/checkout/${course.slug}`}
                  className="
                    mt-8
                    w-full
                    bg-white
                    text-[#661093]
                    hover:bg-purple-100
                  "
                >
                  Enroll Now
                </Button>
              )}

              <ShareButtons
                title={course.title}
              />
            </div>
          </div>

          {/* Course information */}
          <div
            className="
              rounded-3xl
              border
              border-neutral-200
              bg-white
              p-8
              shadow-lg
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                text-neutral-900
              "
            >
              About This Course
            </h2>

            {course.description && (
              <p
                className="
                  mt-5
                  max-w-3xl
                  leading-8
                  text-neutral-600
                "
              >
                {course.description}
              </p>
            )}

            <div
              className="
                mt-8
                grid
                gap-4
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              <InfoCard
                label="Level"
                value={course.level}
              />

              <InfoCard
                label="Category"
                value={course.category}
              />

              <InfoCard
                label="Duration"
                value={course.duration ?? "Self-paced"}
              />

              <InfoCard
                label="Students"
                value={course.students.toString()}
              />
            </div>
          </div>

          {/* Telegram information */}
          {course.telegram_invite_link && (
            <div
              className="
                mt-12
                rounded-3xl
                border
                border-[#229ED9]/20
                bg-[#229ED9]/5
                p-8
              "
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p
                    className="
                      text-sm
                      font-semibold
                      uppercase
                      tracking-wide
                      text-[#229ED9]
                    "
                  >
                    Course Community
                  </p>

                  <h2
                    className="
                      mt-2
                      text-2xl
                      font-bold
                      text-neutral-900
                    "
                  >
                    Join the Telegram community
                  </h2>

                  <p
                    className="
                      mt-2
                      max-w-2xl
                      text-neutral-600
                    "
                  >
                    Access the course community and follow
                    course-related updates on Telegram.
                  </p>
                </div>

                <a
                  href={course.telegram_invite_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-[#229ED9]
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:opacity-90
                  "
                >
                  <span className="text-xl">
                    ✈️
                  </span>

                  Join Telegram
                </a>
              </div>
            </div>
          )}

          {/* Course content preview */}
          <div
            className="
              mt-12
              rounded-3xl
              bg-neutral-950
              p-8
              text-white
            "
          >
            <h2
              className="
                text-3xl
                font-bold
              "
            >
              Start Learning
            </h2>

            <p
              className="
                mt-4
                max-w-2xl
                text-neutral-300
              "
            >
              Enroll in this course to access the complete
              learning experience, including published modules,
              lessons, video classes, and course resources.
            </p>

            {!user ? (
              <Button
                href="/login"
                className="
                  mt-8
                  bg-white
                  text-[#661093]
                  hover:bg-purple-100
                "
              >
                Log in to Enroll
              </Button>
            ) : enrolled ? (
              <Button
                href={`/learn/${course.slug}`}
                className="
                  mt-8
                  bg-white
                  text-[#661093]
                  hover:bg-purple-100
                "
              >
                Continue Learning
              </Button>
            ) : (
              <Button
                href={`/checkout/${course.slug}`}
                className="
                  mt-8
                  bg-white
                  text-[#661093]
                  hover:bg-purple-100
                "
              >
                Enroll Now
              </Button>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-neutral-200
        bg-neutral-50
        p-5
      "
    >
      <p className="text-sm text-neutral-500">
        {label}
      </p>

      <p
        className="
          mt-2
          font-semibold
          capitalize
          text-neutral-900
        "
      >
        {value}
      </p>
    </div>
  );
}