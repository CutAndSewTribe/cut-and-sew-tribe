"use client";

import { useState } from "react";

import type { LMSCourse } from "@/lib/lms/courses";

import CoursePreviewVideoField from "./CoursePreviewVideoField";

interface Props {
  course: LMSCourse;
}

export default function EditCourseForm({ course }: Props) {
  const [previewVideoId, setPreviewVideoId] = useState<string | null>(
    course.preview_video_id ?? null,
  );

  return (
    <form className="space-y-6">
      {/* Basic information */}
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Course Title
          </label>
          <input
            name="title"
            defaultValue={course.title}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Subtitle
          </label>
          <input
            name="subtitle"
            defaultValue={course.subtitle ?? ""}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Description
          </label>
          <textarea
            name="description"
            rows={6}
            defaultValue={course.description ?? ""}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Category
            </label>
            <input
              name="category"
              defaultValue={course.category}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Level
            </label>
            <input
              name="level"
              defaultValue={course.level}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Price
            </label>
            <input
              name="price"
              type="number"
              defaultValue={course.price}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Currency
            </label>
            <input
              name="currency"
              defaultValue={course.currency}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Duration
            </label>
            <input
              name="duration"
              defaultValue={course.duration ?? ""}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3"
            />
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="space-y-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">Media</h3>
          <p className="mt-1 text-sm text-neutral-500">
            Manage the visual assets used throughout the course marketplace
            and course landing page.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Hero Image URL
          </label>
          <input
            name="hero_image"
            placeholder="images/courses/bustier-booster-hero.jpg"
            defaultValue={course.hero_image ?? ""}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Used for the large banner on the course landing page.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Thumbnail URL
          </label>
          <input
            name="thumbnail"
            placeholder="images/courses/bustier-booster-thumbnail.jpg"
            defaultValue={course.thumbnail ?? ""}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Used for course cards and marketplace listings.
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <CoursePreviewVideoField
            value={previewVideoId}
            onChange={setPreviewVideoId}
            courseTitle={course.title}
            courseCategory={course.category}
            courseLevel={course.level}
            coursePublished={course.published}
          />

          <input
            type="hidden"
            name="preview_video_id"
            value={previewVideoId ?? ""}
          />
        </div>
      </div>

      {/* Community */}
      <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-neutral-900">
          Student Community
        </h3>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Telegram Group Name
          </label>
          <input
            name="telegram_group_name"
            defaultValue={course.telegram_group_name ?? ""}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Telegram Invite Link
          </label>
          <input
            name="telegram_invite_link"
            defaultValue={course.telegram_invite_link ?? ""}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          />
        </div>
      </div>

      {/* Settings */}
      <div className="flex flex-wrap gap-6 rounded-3xl border border-neutral-200 bg-white p-6">
        <label className="inline-flex items-center gap-3 text-sm font-medium text-neutral-700">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={course.featured}
            className="h-4 w-4 rounded border-neutral-300 text-[#661093]"
          />
          Featured course
        </label>

        <label className="inline-flex items-center gap-3 text-sm font-medium text-neutral-700">
          <input
            type="checkbox"
            name="published"
            defaultChecked={course.published}
            className="h-4 w-4 rounded border-neutral-300 text-[#661093]"
          />
          Published
        </label>
      </div>
    </form>
  );
}