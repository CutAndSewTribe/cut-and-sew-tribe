import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { getCourseBySlug } from "@/lib/lms/courses";
import { getStudentCourseBySlug } from "@/lib/lms/courses";

interface LessonPageProps {
  params: Promise<{
    courseSlug: string;
    lessonSlug: string;
  }>;
}

export default async function StudentLessonPage({
  params,
}: LessonPageProps) {
  const {
    courseSlug,
    lessonSlug,
  } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const course =
    await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  /*
   * Your enrollments table uses course_slug,
   * not course_id.
   */
  const {
    data: enrollment,
    error: enrollmentError,
  } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .eq("status", "active")
    .maybeSingle();

  if (enrollmentError) {
    console.error(
      "Course enrollment lookup failed:",
      enrollmentError
    );

    redirect(`/courses/${courseSlug}`);
  }

  if (!enrollment) {
    redirect(`/courses/${courseSlug}`);
  }

  /*
   * Load the complete student learning structure:
   *
   * Course
   *   └── Published Modules
   *         └── Published Lessons
   */
  const learningCourse =
    await getStudentCourseBySlug(courseSlug);

  if (!learningCourse) {
    notFound();
  }

  const allLessons =
    learningCourse.modules.flatMap(
      (module) => module.lessons
    );

  const lesson =
    allLessons.find(
      (item) => item.slug === lessonSlug
    );

  if (!lesson) {
    notFound();
  }

  const currentModule =
    learningCourse.modules.find(
      (module) =>
        module.id === lesson.module_id
    );

  if (!currentModule) {
    notFound();
  }

  const currentLessonIndex =
    allLessons.findIndex(
      (item) => item.id === lesson.id
    );

  const previousLesson =
    currentLessonIndex > 0
      ? allLessons[currentLessonIndex - 1]
      : null;

  const nextLesson =
    currentLessonIndex <
    allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Course header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#661093]">
            {course.title}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-neutral-900">
            {lesson.title}
          </h1>

          {lesson.description && (
            <p className="mt-3 max-w-3xl text-neutral-600">
              {lesson.description}
            </p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* Main learning area */}
          <section className="min-w-0">

            {lesson.lesson_type === "video" &&
              lesson.video_url && (
                <div className="overflow-hidden rounded-3xl bg-black shadow-xl">
                  <div className="aspect-video">
                    <iframe
                      src={lesson.video_url}
                      title={lesson.title}
                      className="h-full w-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

            {lesson.lesson_type === "video" &&
              !lesson.video_url && (
                <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                  <p className="text-neutral-600">
                    This lesson does not have a video yet.
                  </p>
                </div>
              )}

            {lesson.lesson_type === "article" &&
              lesson.content_md && (
                <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                  <div className="whitespace-pre-wrap text-neutral-800">
                    {lesson.content_md}
                  </div>
                </article>
              )}

            {/* Lesson navigation */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">

              {previousLesson ? (
                <a
                  href={`/learn/${courseSlug}/lessons/${previousLesson.slug}`}
                  className="rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:border-[#661093] hover:text-[#661093]"
                >
                  ← Previous Lesson
                </a>
              ) : (
                <div />
              )}

              {nextLesson && (
                <a
                  href={`/learn/${courseSlug}/lessons/${nextLesson.slug}`}
                  className="rounded-xl bg-[#661093] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7A16AF]"
                >
                  Next Lesson →
                </a>
              )}
            </div>

            {/* Telegram community */}
            {course.telegram_invite_link && (
              <a
                href={course.telegram_invite_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center gap-4 rounded-2xl border border-[#229ED9]/20 bg-[#229ED9]/5 p-5 transition hover:border-[#229ED9]/40 hover:bg-[#229ED9]/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#229ED9] text-2xl text-white">
                  ✈️
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-neutral-900">
                    Join the course Telegram community
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    Ask questions, connect with other students,
                    share your work, and get course updates.
                  </p>

                  {course.telegram_group_name && (
                    <p className="mt-2 text-sm font-semibold text-[#229ED9]">
                      {course.telegram_group_name}
                    </p>
                  )}
                </div>

                <span className="ml-auto shrink-0 text-xl text-[#229ED9]">
                  →
                </span>
              </a>
            )}
          </section>

          {/* Course curriculum */}
          <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">

            <div className="mb-5">
              <h2 className="text-lg font-bold text-neutral-900">
                Course Content
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                {allLessons.length} lessons
              </p>
            </div>

            <div className="space-y-6">
              {learningCourse.modules.map(
                (module) => (
                  <div key={module.id}>
                    <h3 className="mb-3 text-sm font-bold text-neutral-900">
                      {module.title}
                    </h3>

                    <div className="space-y-2">
                      {module.lessons.map(
                        (moduleLesson) => {
                          const isCurrent =
                            moduleLesson.id === lesson.id;

                          return (
                            <a
                              key={moduleLesson.id}
                              href={`/learn/${courseSlug}/lessons/${moduleLesson.slug}`}
                              className={`
                                block
                                rounded-xl
                                px-4
                                py-3
                                text-sm
                                transition
                                ${
                                  isCurrent
                                    ? "bg-[#661093] font-semibold text-white"
                                    : "text-neutral-700 hover:bg-[#661093]/5 hover:text-[#661093]"
                                }
                              `}
                            >
                              <div className="flex items-start gap-3">
                                <span className="mt-0.5 shrink-0">
                                  {isCurrent ? "▶" : "○"}
                                </span>

                                <span>
                                  {moduleLesson.title}
                                </span>
                              </div>
                            </a>
                          );
                        }
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}