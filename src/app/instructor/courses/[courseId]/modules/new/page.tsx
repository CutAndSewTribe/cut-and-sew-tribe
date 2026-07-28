import Link from "next/link";
import { notFound } from "next/navigation";

import { getCourseById } from "@/lib/lms/courses";
import { getModules } from "@/lib/lms/modules";

import { createModuleAction } from "./actions";

interface Props {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function NewModulePage({
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

  const nextPosition = modules.length + 1;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link
          href={`/instructor/courses/${courseId}/modules`}
          className="text-sm font-semibold text-[#661093] hover:underline"
        >
          ← Back to Modules
        </Link>

        <h2 className="mt-4 text-3xl font-bold text-neutral-900">
          Add Module
        </h2>

        <p className="mt-2 text-neutral-600">
          Add a new module to {course.title}.
        </p>
      </div>

      <form
  action={createModuleAction.bind(null, courseId)}
  className="space-y-6 rounded-3xl bg-white p-8 shadow-sm"
>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-neutral-900"
          >
            Module Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="e.g. Introduction to Pattern Drafting"
            className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 outline-none focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-neutral-900"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Describe what students will learn in this module."
            className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 outline-none focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
          />
        </div>

        <div>
          <label
            htmlFor="position"
            className="block text-sm font-semibold text-neutral-900"
          >
            Position
          </label>

          <input
            id="position"
            name="position"
            type="number"
            min={1}
            defaultValue={nextPosition}
            required
            className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-neutral-900 outline-none focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <Link
            href={`/instructor/courses/${courseId}/modules`}
            className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white hover:opacity-90"
          >
            Create Module
          </button>
        </div>
      </form>
    </div>
  );
}