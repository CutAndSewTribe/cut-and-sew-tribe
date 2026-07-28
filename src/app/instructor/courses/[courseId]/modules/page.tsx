import Link from "next/link";
import { notFound } from "next/navigation";

import { getCourseById } from "@/lib/lms/courses";
import { getModules } from "@/lib/lms/modules";

interface Props {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function ModulesPage({
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
    <div className="space-y-8">
      <header className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900">
            Modules
          </h2>

          <p className="mt-2 text-neutral-600">
            Manage the modules inside this course.
          </p>
        </div>

        <Link
          href={`/instructor/courses/${courseId}/modules/new`}
          className="rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white hover:opacity-90"
        >
          Add Module
        </Link>
      </header>

      {modules.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center">
          <h3 className="text-xl font-semibold text-neutral-900">
            No modules yet
          </h3>

          <p className="mt-2 text-neutral-600">
            Start building this course by adding your first module.
          </p>

          <Link
            href={`/instructor/courses/${courseId}/modules/new`}
            className="mt-6 inline-flex rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white hover:opacity-90"
          >
            Create First Module
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={`/instructor/courses/${courseId}/modules/${module.id}`}
              className="block rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-[#661093] hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Module {module.position}
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-neutral-900">
                    {module.title}
                  </h3>

                  {module.description && (
                    <p className="mt-2 text-neutral-600">
                      {module.description}
                    </p>
                  )}
                </div>

                <span className="text-sm font-semibold text-[#661093]">
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}