import Link from "next/link";
import { notFound } from "next/navigation";

import InstructorPage from "@/components/instructor/layout/InstructorPage";
import SortableLessonList from "@/components/instructor/lessons/SortableLessonList";

import { getCourseById } from "@/lib/lms/courses";
import { getModule } from "@/lib/lms/modules";
import { getLessons } from "@/lib/lms/lessons";

import {
  toggleModulePublishedAction,
  reorderLessonsAction,
} from "./actions";

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
  <div className="p-6">
    <SortableLessonList
      lessons={lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        lesson_type: lesson.lesson_type,
        duration_minutes:
          lesson.duration_minutes ?? 0,
        preview: lesson.preview ?? false,
        published:
          lesson.published ?? false,
        position: lesson.position,
      }))}
      courseId={courseId}
      moduleId={moduleId}
      onReorder={async (updatedLessons) => {
        "use server";

        await reorderLessonsAction(
          courseId,
          moduleId,
          updatedLessons
        );
      }}
    />
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
