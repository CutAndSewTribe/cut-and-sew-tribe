"use client";

interface Props {
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
}: Props) {
  return (
    <div className="flex items-center justify-between border-t border-neutral-200 pt-8">

      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="
          rounded-xl
          border
          border-neutral-300
          px-6
          py-3
          font-semibold
          transition
          disabled:cursor-not-allowed
          disabled:opacity-40
          hover:border-[#661093]
          hover:text-[#661093]
        "
      >
        ← Previous Lesson
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className="
          rounded-xl
          bg-[#661093]
          px-6
          py-3
          font-semibold
          text-white
          transition
          disabled:cursor-not-allowed
          disabled:opacity-40
          hover:opacity-90
        "
      >
        Next Lesson →
      </button>

    </div>
  );
}