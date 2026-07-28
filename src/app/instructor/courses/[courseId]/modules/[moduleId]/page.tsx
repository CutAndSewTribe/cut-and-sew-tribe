import Link from "next/link";
import { notFound } from "next/navigation";

import InstructorPage from "@/components/instructor/layout/InstructorPage";

import { getCourseById } from "@/lib/lms/courses";
import { getModule } from "@/lib/lms/modules";
import { getLessons } from "@/lib/lms/lessons";

import { toggleModulePublishedAction } from "./actions";

interface ModuleDetailPageProps {
  params: Promise<{
    courseId: string;
    moduleId: string;
  }>;
}

export default async function ModuleDetailPage({
  params,
}: ModuleDetailPageProps) {
  const { courseId, moduleId } = await params;

  const [course, moduleRecord, lessons] =
    await Promise.all([
      getCourseById(courseId),
      getModule(moduleId),
      getLessons(moduleId),
    ]);

  if (!course || !moduleRecord) {
    notFound();
  }

  return (
    <InstructorPage
      title={moduleRecord.title}
      description={
        moduleRecord.description ??
        "Manage the lessons inside this module."
      }
    >
      <div className="space-y-8">

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500">
          <Link
            href="/instructor/courses"
            className="transition hover:text-[#661093]"
          >
            Courses
          </Link>

          <span>/</span>

          <Link
            href={`/instructor/courses/${courseId}`}
            className="transition hover:text-[#661093]"
          >
            {course.title}
          </Link>

          <span>/</span>

          <span className="font-medium text-neutral-900">
            {moduleRecord.title}
          </span>
        </div>

        {/* Module Header */}
        <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#661093]">
                Module {moduleRecord.position}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                {moduleRecord.title}
              </h2>

<div className="mt-4">
  <span
    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
      moduleRecord.published
        ? "bg-green-100 text-green-700"
        : "bg-neutral-100 text-neutral-600"
    }`}
  >
    {moduleRecord.published
      ? "Published"
      : "Draft"}
  </span>
</div>

              {moduleRecord.description && (
                <p className="mt-3 max-w-2xl text-neutral-600">
                  {moduleRecord.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
  <form
    action={toggleModulePublishedAction.bind(
      null,
      moduleId,
      courseId,
      !moduleRecord.published
    )}
  >
    <button
      type="submit"
      className={`rounded-xl px-5 py-3 font-semibold text-white transition hover:opacity-90 ${
        moduleRecord.published
          ? "bg-neutral-700"
          : "bg-green-600"
      }`}
    >
      {moduleRecord.published
        ? "Unpublish Module"
        : "Publish Module"}
    </button>
  </form>

  <Link
    href={`/instructor/courses/${courseId}/modules/${moduleId}/lessons/new`}
    className="inline-flex items-center justify-center rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white transition hover:opacity-90"
  >
    + Add Lesson
  </Link>
</div>

          </div>
        </section>

        {/* Lesson Summary */}
        <section className="grid gap-4 sm:grid-cols-3">

          <SummaryCard
            label="Total Lessons"
            value={lessons.length.toString()}
          />

          <SummaryCard
            label="Published"
            value={
              lessons
                .filter((lesson) => lesson.published)
                .length
                .toString()
            }
          />

          <SummaryCard
            label="Drafts"
            value={
              lessons
                .filter((lesson) => !lesson.published)
                .length
                .toString()
            }
          />

        </section>

        {/* Lesson Manager */}
        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">

          <div className="border-b border-neutral-200 px-6 py-5">
            <h3 className="text-xl font-bold text-neutral-900">
              Lessons
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              Manage the lessons students will complete in this module.
            </p>
          </div>

          {lessons.length === 0 ? (
            <EmptyLessonsState
              courseId={courseId}
              moduleId={moduleId}
            />
          ) : (
            <div className="divide-y divide-neutral-200">

              {lessons.map((lesson) => (
                <LessonRow
                  key={lesson.id}
                  courseId={courseId}
                  moduleId={moduleId}
                  lesson={lesson}
                />
              ))}

            </div>
          )}

        </section>

      </div>
    </InstructorPage>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-neutral-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-neutral-900">
        {value}
      </p>
    </div>
  );
}

function EmptyLessonsState({
  courseId,
  moduleId,
}: {
  courseId: string;
  moduleId: string;
}) {
  return (
    <div className="px-6 py-16 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#661093]/10 text-3xl">
        📚
      </div>

      <h4 className="mt-5 text-xl font-bold text-neutral-900">
        No lessons yet
      </h4>

      <p className="mx-auto mt-2 max-w-md text-neutral-500">
        Start building this module by adding the first lesson.
      </p>

      <Link
        href={`/instructor/courses/${courseId}/modules/${moduleId}/lessons/new`}
        className="mt-6 inline-flex rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Create First Lesson
      </Link>

    </div>
  );
}

function LessonRow({
  courseId,
  moduleId,
  lesson,
}: {
  courseId: string;
  moduleId: string;
  lesson: {
    id: string;
    title: string;
    slug: string;
    lesson_type: string;
    duration_minutes: number | null;
    published: boolean | null;
    preview: boolean | null;
    position: number;
  };
}) {
  return (
    <div className="flex flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex items-start gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-sm font-bold text-neutral-600">
          {lesson.position}
        </div>

        <div>

          <h4 className="font-semibold text-neutral-900">
            {lesson.title}
          </h4>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-neutral-500">

            <span className="rounded-full bg-neutral-100 px-3 py-1 capitalize">
              {lesson.lesson_type}
            </span>

            <span>
              {lesson.duration_minutes ?? 0} min
            </span>

            {lesson.preview && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">
                Preview
              </span>
            )}

            <span
              className={`rounded-full px-3 py-1 ${
                lesson.published
                  ? "bg-green-100 text-green-700"
                  : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {lesson.published
                ? "Published"
                : "Draft"}
            </span>

          </div>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <Link
          href={`/instructor/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}/edit`}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-[#661093] hover:text-[#661093]"
        >
          Edit
        </Link>

      </div>

    </div>
  );
}