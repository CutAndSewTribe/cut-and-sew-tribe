"use server";

import { redirect } from "next/navigation";

import { createModule } from "@/lib/lms/modules";

function getStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function createModuleAction(
  courseId: string,
  formData: FormData
) {
  const title = getStringValue(formData.get("title"));
  const description = getStringValue(formData.get("description"));
  const positionValue = getStringValue(formData.get("position"));

  if (!title) {
    throw new Error("Module title is required.");
  }

  const position = Number(positionValue);

  if (!Number.isInteger(position) || position < 1) {
    throw new Error("Module position must be a positive whole number.");
  }

  try {
  await createModule({
    course_id: courseId,
    title,
    description: description || undefined,
    position,
    published: false,
  });
} catch (error) {
  console.error("CREATE MODULE ERROR:", error);
  throw error;
}

  redirect(`/instructor/courses/${courseId}/modules`);
}