import type {
  LearningLesson,
  LearningModule,
} from "@/content/learning/types";

interface Props {
  modules: LearningModule[];
  activeLessonId?: string;
  completedLessons?: string[];
  onLessonSelect?: (
    lesson: LearningLesson
  ) => void;
}

export default function LessonList({
  modules,
  activeLessonId,
  completedLessons = [],
  onLessonSelect,
}: Props) {
  return (
    <div className="space-y-8">
      {modules.map((module, moduleIndex) => (
        <div key={module.id}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#661093]">
            Module {moduleIndex + 1}
          </h3>

          <div className="space-y-3">
            {module.lessons.map((lesson) => {
              const active =
                lesson.id === activeLessonId;

              const completed =
                completedLessons.includes(
                  lesson.id
                );

              return (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() =>
                    onLessonSelect?.(lesson)
                  }
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-[#661093] bg-[#661093]/10"
                      : "border-neutral-200 hover:border-[#661093]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">
                        {lesson.title}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        {lesson.duration}
                      </p>
                    </div>

                    {completed && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                        ✓
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}