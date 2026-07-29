import { notFound } from "next/navigation";

import InstructorPage from "@/components/instructor/layout/InstructorPage";
import LessonForm from "@/components/instructor/lessons/LessonForm";
import DeleteLessonButton from "@/components/instructor/lessons/DeleteLessonButton";

import { getCourseById } from "@/lib/lms/courses";
import { getLessonById } from "@/lib/lms/lessons";
import { getModule } from "@/lib/lms/modules";

import {
  updateLessonAction,
  deleteLessonAction,
} from "./actions";

interface EditLessonPageProps {
  params: Promise<{
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>;
}

export default async function EditLessonPage({
  params,
}: EditLessonPageProps) {
  const {
    courseId,
    moduleId,
    lessonId,
  } = await params;

  const [
    course,
    moduleRecord,
    lesson,
  ] = await Promise.all([
    getCourseById(courseId),
    getModule(moduleId),
    getLessonById(lessonId),
  ]);

  if (
    !course ||
    !moduleRecord ||
    !lesson
  ) {
    notFound();
  }

  return (
    <InstructorPage
      title="Edit Lesson"
      description={`Update ${lesson.title}`}
    >
      <div className="mx-auto max-w-3xl space-y-6">
  <LessonForm
    mode="edit"
    action={updateLessonAction}
    courseId={courseId}
    moduleId={moduleId}
    position={lesson.position}
    courseTitle={course.title}
    moduleTitle={moduleRecord.title}
    cancelHref={`/instructor/courses/${courseId}/modules/${moduleId}`}
    initialValues={{
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      lesson_type: lesson.lesson_type,
      description: lesson.description ?? "",
      video_url: lesson.video_url ?? "",
      content_md: lesson.content_md ?? "",
      duration_minutes: lesson.duration_minutes ?? 0,
      preview: lesson.preview ?? false,
      published: lesson.published,
    }}
  />

  <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
    <h3 className="text-lg font-bold text-red-700">
      Danger Zone
    </h3>

    <p className="mt-2 text-sm text-neutral-600">
      Deleting this lesson is permanent and cannot be undone.
    </p>

    <div className="mt-4">
      <DeleteLessonButton
        action={deleteLessonAction}
        lessonId={lesson.id}
        courseId={courseId}
        moduleId={moduleId}
      />
    </div>
  </section>
</div>
    </InstructorPage>
  );
}