import { notFound } from "next/navigation";

import InstructorPage from "@/components/instructor/layout/InstructorPage";
import LessonForm from "@/components/instructor/lessons/LessonForm";

import { getCourseById } from "@/lib/lms/courses";
import { getLessons } from "@/lib/lms/lessons";
import { getModule } from "@/lib/lms/modules";

import { createLessonAction } from "./actions";

interface NewLessonPageProps {
  params: Promise<{
    courseId: string;
    moduleId: string;
  }>;
}

export default async function NewLessonPage({
  params,
}: NewLessonPageProps) {
  const { courseId, moduleId } = await params;

  const [course, moduleRecord, lessons] =
    await Promise.all([
      getCourseById(courseId),
      getModule(moduleId),
      getLessons(moduleId),
    ]);

  if (!course || !moduleRecord) {
    notFound();
  }

  return (
    <InstructorPage
      title="Create Lesson"
      description={`Add a new lesson to ${moduleRecord.title}.`}
    >
      <div className="mx-auto max-w-3xl">
        <LessonForm
          action={createLessonAction}
          mode="create"
          courseId={courseId}
          moduleId={moduleId}
          position={lessons.length + 1}
          courseTitle={course.title}
          moduleTitle={moduleRecord.title}
          cancelHref={`/instructor/courses/${courseId}/modules/${moduleId}`}
        />
      </div>
    </InstructorPage>
  );
}