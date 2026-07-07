"use client";

import { useMemo, useState } from "react";

import type {
  LearningCourse,
  LearningLesson,
} from "@/content/learning/types";

import { getResumeLesson } from "@/lib/get-resume-lesson";

import CourseSidebar from "./CourseSidebar";
import LessonNavigation from "./LessonNavigation";
import LessonPlayer from "./LessonPlayer";

interface Props {
  course: LearningCourse;
  completedLessons: string[];
}

export default function LearningWorkspace({
  course,
  completedLessons,
}: Props) {
  const resumeLesson = useMemo(
    () =>
      getResumeLesson(
        course,
        completedLessons
      ),
    [course, completedLessons]
  );

  const [selectedLesson, setSelectedLesson] =
    useState<LearningLesson>(() => resumeLesson);

  const flatLessons = useMemo(
    () =>
      course.modules.flatMap(
        (module) => module.lessons
      ),
    [course]
  );

  const currentIndex = flatLessons.findIndex(
    (lesson) => lesson.id === selectedLesson.id
  );

  const previousLesson =
    currentIndex > 0
      ? flatLessons[currentIndex - 1]
      : null;

  const nextLesson =
    currentIndex < flatLessons.length - 1
      ? flatLessons[currentIndex + 1]
      : null;

  return (
    <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
      <CourseSidebar
        modules={course.modules}
        activeLessonId={selectedLesson.id}
        completedLessons={completedLessons}
        onLessonSelect={setSelectedLesson}
      />

      <div className="space-y-8">
        <LessonPlayer
          lesson={selectedLesson}
          courseSlug={course.slug}
        />

        <LessonNavigation
          hasPrevious={!!previousLesson}
          hasNext={!!nextLesson}
          onPrevious={() => {
            if (previousLesson) {
              setSelectedLesson(previousLesson);
            }
          }}
          onNext={() => {
            if (nextLesson) {
              setSelectedLesson(nextLesson);
            }
          }}
        />
      </div>
    </div>
  );
}