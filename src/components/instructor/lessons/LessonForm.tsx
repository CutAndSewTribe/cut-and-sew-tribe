"use client";

import Link from "next/link";

interface LessonFormProps {
  action: (formData: FormData) => void | Promise<void>;

  mode: "create" | "edit";

  courseId: string;
  moduleId: string;

  /**
   * Present only when editing.
   */
  lessonId?: string;

  position: number;

  courseTitle: string;
  moduleTitle: string;

  cancelHref: string;

  initialValues?: {
    id?: string;

    title?: string;
    slug?: string;

    lesson_type?: string;

    description?: string;

    video_url?: string;

    content_md?: string;

    duration_minutes?: number;

    preview?: boolean;

    published?: boolean;
  };
}

export default function LessonForm({
  action,
  mode,

  courseId,
  moduleId,
  lessonId,
  position,

  courseTitle,
  moduleTitle,

  cancelHref,

  initialValues,
}: LessonFormProps) {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <p className="text-sm text-neutral-500">
          Course: {courseTitle}
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          Module: {moduleTitle}
        </p>
      </div>

      <form
        action={action}
        className="space-y-6"
      >
        {initialValues?.id && (
  <input
    type="hidden"
    name="lesson_id"
    value={initialValues.id}
  />
)}

        {/* New hidden lesson id used by updateLessonAction */}
        {lessonId && (
          <input
            type="hidden"
            name="lesson_id"
            value={lessonId}
          />
        )}

        <input
          type="hidden"
          name="course_id"
          value={courseId}
        />

        <input
          type="hidden"
          name="module_id"
          value={moduleId}
        />

        <input
          type="hidden"
          name="position"
          value={position}
        />

        {/* Lesson title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-neutral-800"
          >
            Lesson title
          </label>

          <input
            id="title"
            name="title"
            required
            defaultValue={initialValues?.title ?? ""}
            placeholder="e.g. Introduction to Body Measurements"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
          />
        </div>

        {/* Lesson slug */}
        <div>
          <label
            htmlFor="slug"
            className="mb-2 block text-sm font-semibold text-neutral-800"
          >
            Lesson slug
          </label>

          <input
            id="slug"
            name="slug"
            required
            defaultValue={initialValues?.slug ?? ""}
            placeholder="introduction-to-body-measurements"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
          />
        </div>

        {/* Lesson type */}
        <div>
          <label
            htmlFor="lesson_type"
            className="mb-2 block text-sm font-semibold text-neutral-800"
          >
            Lesson type
          </label>

          <select
            id="lesson_type"
            name="lesson_type"
            defaultValue={initialValues?.lesson_type ?? "video"}
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
          >
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="pattern">Pattern</option>
            <option value="pdf">PDF</option>
            <option value="quiz">Quiz</option>
            <option value="assignment">Assignment</option>
            <option value="live">Live Session</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-neutral-800"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={initialValues?.description ?? ""}
            placeholder="Describe what students will learn..."
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
          />
        </div>

        {/* Video URL */}
        <div>
          <label
            htmlFor="video_url"
            className="mb-2 block text-sm font-semibold text-neutral-800"
          >
            Video URL
          </label>

          <input
            id="video_url"
            name="video_url"
            type="url"
            defaultValue={initialValues?.video_url ?? ""}
            placeholder="https://..."
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
          />

          <p className="mt-2 text-sm text-neutral-500">
            Add the URL of the video hosted by your video provider.
          </p>
        </div>

        {/* Lesson content */}
        <div>
          <label
            htmlFor="content_md"
            className="mb-2 block text-sm font-semibold text-neutral-800"
          >
            Lesson content
          </label>

          <textarea
            id="content_md"
            name="content_md"
            rows={10}
            defaultValue={initialValues?.content_md ?? ""}
            placeholder="Write the lesson content or Markdown here..."
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
          />

          <p className="mt-2 text-sm text-neutral-500">
            This can contain written lesson material, instructions, or Markdown
            content.
          </p>
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration_minutes"
            className="mb-2 block text-sm font-semibold text-neutral-800"
          >
            Duration in minutes
          </label>

          <input
            id="duration_minutes"
            name="duration_minutes"
            type="number"
            min="0"
            defaultValue={initialValues?.duration_minutes ?? 0}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#661093] focus:ring-2 focus:ring-[#661093]/20"
          />
        </div>

        {/* Flags */}
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="preview"
              value="true"
              defaultChecked={initialValues?.preview ?? false}
              className="h-4 w-4 rounded border-neutral-300 text-[#661093] focus:ring-[#661093]"
            />

            <span className="text-sm font-semibold text-neutral-800">
              Preview lesson
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="published"
              value="true"
              defaultChecked={initialValues?.published ?? false}
              className="h-4 w-4 rounded border-neutral-300 text-[#661093] focus:ring-[#661093]"
            />

            <span className="text-sm font-semibold text-neutral-800">
              Publish lesson immediately
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href={cancelHref}
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            {mode === "create"
              ? "Create Lesson"
              : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}