import type { LearningLesson } from "@/content/learning/types";

interface Props {
  lesson: LearningLesson;
}

export default function LessonHeader({
  lesson,
}: Props) {
  return (
    <header className="space-y-6">

      <div className="flex flex-wrap items-center gap-3">

        <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium">
          🎥 Video Lesson
        </span>

        <span className="rounded-full bg-[#661093]/10 px-4 py-2 text-sm font-semibold text-[#661093]">
          ⏱ {lesson.duration}
        </span>

      </div>

      <div>

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#661093]">
          Current Lesson
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 lg:text-5xl">
          {lesson.title}
        </h1>

        <p className="mt-5 max-w-4xl text-lg leading-8 text-neutral-600">
          {lesson.description}
        </p>

      </div>

    </header>
  );
}