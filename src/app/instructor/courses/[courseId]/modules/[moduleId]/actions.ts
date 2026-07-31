"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCourseById } from "@/lib/lms/courses";
import { updateModule } from "@/lib/lms/modules";

export async function toggleModulePublishedAction(
  moduleId: string,
  courseId: string,
  published: boolean
): Promise<void> {
  await updateModule(moduleId, {
    published,
  });

  const course = await getCourseById(courseId);

  if (course) {
    revalidatePath(`/learn/${course.slug}`);
  }

  revalidatePath(
    `/instructor/courses/${courseId}/modules/${moduleId}`
  );

  redirect(
    `/instructor/courses/${courseId}/modules/${moduleId}`
  );
}

export async function reorderLessonsAction(
courseId: string,
moduleId: string,
lessons: { id: string; position: number }[]
): Promise<void> {
const { reorderLessons } = await import(
"@/lib/lms/lessons"
);

await reorderLessons(lessons);

revalidatePath(
`/instructor/courses/${courseId}/modules/${moduleId}`
);
}
