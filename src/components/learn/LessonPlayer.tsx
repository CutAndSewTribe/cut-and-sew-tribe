"use client";

import { useState } from "react";

import type { LearningLesson } from "@/content/learning/types";

import { markLessonComplete } from "@/lib/lesson-progress";

import VideoPlayer from "./VideoPlayer";

interface Props {
  lesson: LearningLesson;
  courseSlug: string;
}

export default function LessonPlayer({
  lesson,
  courseSlug,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);

  async function handleComplete() {
    try {
      setSaving(true);

      await markLessonComplete(
        courseSlug,
        lesson.id
      );

      setCompleted(true);
    } catch (error) {
      console.error(error);
      alert("Unable to save lesson progress.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">

      <VideoPlayer
        videoUrl={lesson.videoUrl}
      />

      <div className="space-y-8 p-8">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
            Learning Lesson
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900">
            {lesson.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-3">

            <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium">
              🎥 Video Lesson
            </span>

            <span className="rounded-full bg-[#661093]/10 px-4 py-2 text-sm font-medium text-[#661093]">
              ⏱ {lesson.duration}
            </span>

          </div>

        </div>

        <div>

          <h2 className="text-xl font-semibold text-neutral-900">
            Lesson Overview
          </h2>

          <p className="mt-4 text-lg leading-8 text-neutral-600">
            {lesson.description}
          </p>

        </div>

        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6">

          <h3 className="text-lg font-semibold text-neutral-900">
            Lesson Resources
          </h3>

          <p className="mt-2 text-neutral-600">
            Downloadable files, worksheets, patterns and supporting
            materials for this lesson will appear here.
          </p>

        </div>

        <div className="border-t border-neutral-200 pt-8">

          <button
            type="button"
            onClick={handleComplete}
            disabled={saving || completed}
            className="rounded-xl bg-[#661093] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : completed
              ? "✓ Lesson Completed"
              : "✓ Mark Lesson Complete"}
          </button>

        </div>

      </div>

    </section>
  );
}