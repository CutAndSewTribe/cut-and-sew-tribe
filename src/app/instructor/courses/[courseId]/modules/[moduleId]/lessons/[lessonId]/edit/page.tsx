import { notFound } from "next/navigation";

import InstructorPage from "@/components/instructor/layout/InstructorPage";

import { getLesson } from "@/lib/lms/lessons";

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
  const { lessonId } = await params;

  const lesson = await getLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <InstructorPage
      title={`Edit: ${lesson.title}`}
      description="Update this lesson."
    >
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-neutral-600">
          Lesson editing will be connected next.
        </p>
      </div>
    </InstructorPage>
  );
}