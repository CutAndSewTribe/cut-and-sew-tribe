import Link from "next/link";
import { notFound } from "next/navigation";

import { getCourseById } from "@/lib/lms/courses";
import { getModules } from "@/lib/lms/modules";

interface Props {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function LessonsPage({
  params,
}: Props) {
  const { courseId } = await params;

  const [course, modules] = await Promise.all([
    getCourseById(courseId),
    getModules(courseId),
  ]);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-neutral-900">
          Lessons
        </h2>

        <p className="mt-2 text-neutral-600">
          Manage lessons for {course.title}.
        </p>
      </div>

      <div className="space-y-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  Module {module.position}
                </p>

                <h3 className="mt-1 text-xl font-bold text-neutral-900">
                  {module.title}
                </h3>
              </div>

              <Link
                href={`/instructor/courses/${courseId}/modules/${module.id}`}
                className="text-sm font-semibold text-[#661093]"
              >
                Manage Module →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}