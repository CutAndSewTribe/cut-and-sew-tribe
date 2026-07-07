import type {
  LearningCourse,
  LearningLesson,
} from "@/content/learning/types";

export function getResumeLesson(
  course: LearningCourse,
  completedLessons: string[]
): LearningLesson {
  const lessons = course.modules.flatMap(
    (module) => module.lessons
  );

  const firstIncomplete = lessons.find(
    (lesson) =>
      !completedLessons.includes(lesson.id)
  );

  return firstIncomplete ?? lessons[lessons.length - 1];
}