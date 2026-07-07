"use client";

interface LessonNavigationProps {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export default function LessonNavigation({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: LessonNavigationProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`
          rounded-xl
          border-2
          px-6
          py-3
          font-semibold
          transition

          ${
            hasPrevious
              ? "border-[#661093] text-[#661093] hover:bg-[#661093]/10"
              : "border-neutral-300 text-neutral-400"
          }
        `}
      >
        ← Previous Lesson
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className={`
          rounded-xl
          px-6
          py-3
          font-semibold
          text-white
          transition

          ${
            hasNext
              ? "bg-[#661093] hover:bg-[#54107a]"
              : "bg-neutral-400"
          }
        `}
      >
        Next Lesson →
      </button>

    </div>
  );
}