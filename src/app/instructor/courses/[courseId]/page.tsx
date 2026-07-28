import Link from "next/link";
import { notFound } from "next/navigation";

import { getCourseById } from "@/lib/lms/courses";

interface Props {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CourseOverviewPage({
  params,
}: Props) {
  const { courseId } = await params;

  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900">
            Course Overview
          </h2>

          <p className="mt-2 text-neutral-600">
            Manage the content and structure of this course.
          </p>
        </div>

        <Link
          href={`/instructor/courses/${courseId}/modules`}
          className="rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white hover:opacity-90"
        >
          Manage Modules
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-500">
            Course
          </p>

          <h3 className="mt-2 text-xl font-bold text-neutral-900">
            {course.title}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-500">
            Level
          </p>

          <h3 className="mt-2 text-xl font-bold text-neutral-900">
            {course.level}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-500">
            Category
          </p>

          <h3 className="mt-2 text-xl font-bold text-neutral-900">
            {course.category}
          </h3>
        </div>
      </div>
    </div>
  );
}