import type {
  LearningLesson,
  LearningModule,
} from "@/content/learning/types";

import LessonList from "./LessonList";
import ProgressCard from "./ProgressCard";

interface Props {
  modules: LearningModule[];
  activeLessonId?: string;

  completedLessons?: string[];

  onLessonSelect?: (
    lesson: LearningLesson
  ) => void;
}

export default function CourseSidebar({
  modules,
  activeLessonId,
  completedLessons = [],
  onLessonSelect,
}: Props) {
  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  const completedCount =
    completedLessons.length;

  return (
    <aside className="space-y-8">

      <ProgressCard
        completed={completedCount}
        total={totalLessons}
      />

      <LessonList
        modules={modules}
        activeLessonId={activeLessonId}
        completedLessons={completedLessons}
        onLessonSelect={onLessonSelect}
      />

    </aside>
  );
}