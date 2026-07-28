"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { createLesson } from "@/lib/lms/lessons";
import type { LessonType } from "@/types/lesson";

function getStringValue(
  formData: FormData,
  fieldName: string
): string {
  const value = formData.get(fieldName);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function getNumberValue(
  formData: FormData,
  fieldName: string
): number {
  const value = getStringValue(
    formData,
    fieldName
  );

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

function getBooleanValue(
  formData: FormData,
  fieldName: string
): boolean {
  return formData.get(fieldName) === "true";
}

function isLessonType(
  value: string
): value is LessonType {
  return (
    value === "video" ||
    value === "article" ||
    value === "pattern" ||
    value === "pdf" ||
    value === "quiz" ||
    value === "assignment" ||
    value === "live"
  );
}

export async function createLessonAction(
  formData: FormData
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error(
      "You must be signed in to create a lesson."
    );
  }

  const moduleId = getStringValue(
    formData,
    "module_id"
  );

  const courseId = getStringValue(
    formData,
    "course_id"
  );

  const title = getStringValue(
    formData,
    "title"
  );

  const slug = getStringValue(
    formData,
    "slug"
  );

  const description = getStringValue(
    formData,
    "description"
  );

  const lessonTypeValue = getStringValue(
    formData,
    "lesson_type"
  );

  const videoUrl = getStringValue(
    formData,
    "video_url"
  );

  const contentMd = getStringValue(
    formData,
    "content_md"
  );

  const durationMinutes = getNumberValue(
    formData,
    "duration_minutes"
  );

  const position = getNumberValue(
    formData,
    "position"
  );

  const preview = getBooleanValue(
    formData,
    "preview"
  );

  const published = getBooleanValue(
    formData,
    "published"
  );

  if (!moduleId) {
    throw new Error(
      "Module ID is required."
    );
  }

  if (!courseId) {
    throw new Error(
      "Course ID is required."
    );
  }

  if (!title) {
    throw new Error(
      "Lesson title is required."
    );
  }

  if (!slug) {
    throw new Error(
      "Lesson slug is required."
    );
  }

  if (!isLessonType(lessonTypeValue)) {
    throw new Error(
      "Invalid lesson type."
    );
  }

  if (
    !Number.isInteger(position) ||
    position < 1
  ) {
    throw new Error(
      "Lesson position must be a positive whole number."
    );
  }

  if (
    !Number.isInteger(durationMinutes) ||
    durationMinutes < 0
  ) {
    throw new Error(
      "Duration must be a non-negative whole number."
    );
  }

  await createLesson({
    module_id: moduleId,
    title,
    slug,
    description: description || undefined,
    lesson_type: lessonTypeValue,
    video_url: videoUrl || undefined,
    content_md: contentMd || undefined,
    duration_minutes: durationMinutes,
    preview,
    published,
    position,
  });

  revalidatePath(
    `/instructor/courses/${courseId}/modules/${moduleId}`
  );

  redirect(
    `/instructor/courses/${courseId}/modules/${moduleId}`
  );
}

