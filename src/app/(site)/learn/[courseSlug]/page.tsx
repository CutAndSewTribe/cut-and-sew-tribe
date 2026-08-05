import { notFound, redirect } from "next/navigation";

import { Container, Section } from "@/components/ui";

import LearningWorkspace from "@/components/learn/LearningWorkspace";

import { getCurrentUser } from "@/lib/auth/get-user";
import { getCourseBySlug } from "@/lib/lms/courses";
import { createClient } from "@/lib/supabase/server";

interface LearningPageProps {
  params: Promise<{
    courseSlug: string;
  }>;
}

export default async function LearningPage({
  params,
}: LearningPageProps) {
  const { courseSlug } = await params;

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  const supabase = await createClient();

  /*
   * Your enrollments table uses course_slug,
   * not course_id.
   */
  const { data: enrollment, error: enrollmentError } =
    await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_slug", course.slug)
      .eq("status", "active")
      .maybeSingle();

  if (enrollmentError) {
    console.error(
      "Failed to check course enrollment:",
      enrollmentError
    );
  }

  if (!enrollment) {
    redirect(`/courses/${courseSlug}`);
  }

  /*
   * Get published modules for this course.
   */
  const {
    data: modules,
    error: modulesError,
  } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", course.id)
    .eq("published", true)
    .order("position", {
      ascending: true,
    });

  if (modulesError) {
    console.error(
      "Failed to load course modules:",
      modulesError
    );
  }

  const moduleRows = modules ?? [];

  /*
   * Get published lessons belonging
   * to the course modules.
   */
  const moduleIds = moduleRows.map(
    (module) => module.id
  );

  const {
    data: lessons,
    error: lessonsError,
  } =
    moduleIds.length > 0
      ? await supabase
          .from("lessons")
          .select("*")
          .in("module_id", moduleIds)
          .eq("published", true)
          .order("position", {
            ascending: true,
          })
      : {
          data: [],
          error: null,
        };

  if (lessonsError) {
    console.error(
      "Failed to load course lessons:",
      lessonsError
    );
  }

  const lessonRows = lessons ?? [];

  /*
   * Attach lessons to their modules.
   */
  const courseModules = moduleRows.map(
    (module) => ({
      ...module,

      lessons: lessonRows.filter(
        (lesson) =>
          lesson.module_id === module.id
      ),
    })
  );

  /*
   * Start the learning workspace with
   * the first published lesson.
   */
  const firstLesson =
    courseModules[0]?.lessons?.[0] ?? null;

  if (!firstLesson) {
    return (
      <Section>
        <Container className="max-w-7xl">
          <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#661093]">
              Learning Workspace
            </p>

            <h1 className="mt-3 text-3xl font-bold text-neutral-900">
              {course.title}
            </h1>

            <p className="mt-4 text-neutral-600">
              Your course content is being prepared.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container className="max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#661093]">
            Learning Workspace
          </p>

          <h1 className="mt-2 text-3xl font-bold text-neutral-900">
            {course.title}
          </h1>

          {course.subtitle && (
            <p className="mt-2 text-neutral-600">
              {course.subtitle}
            </p>
          )}
        </div>

        <LearningWorkspace
          course={{
            title: course.title,
            subtitle: course.subtitle,
            telegram_group_name:
              course.telegram_group_name,
            telegram_invite_link:
              course.telegram_invite_link,
          }}
          modules={courseModules}
          firstLesson={firstLesson}
        />
      </Container>
    </Section>
  );
}