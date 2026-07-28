interface Props {
  saving: boolean;
  completed: boolean;
  onComplete: () => void;
}

export default function LessonCompletionCard({
  saving,
  completed,
  onComplete,
}: Props) {
  return (
    <section
      className="
        rounded-3xl
        bg-gradient-to-br
        from-[#661093]
        to-[#4E0C72]
        p-8
        text-white
        shadow-xl
      "
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-3xl">
            🎓
          </div>

          <h2 className="text-3xl font-bold">
            Finish this lesson
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-purple-100">
            Mark this lesson as completed to unlock your learning progress,
            improve your dashboard statistics, and continue your journey toward
            mastering fashion design.
          </p>

        </div>

        <div className="flex-shrink-0">

          <button
            type="button"
            onClick={onComplete}
            disabled={saving || completed}
            className="
              rounded-2xl
              bg-white
              px-8
              py-4
              text-lg
              font-bold
              text-[#661093]
              transition
              hover:scale-[1.02]
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {saving
              ? "Saving Progress..."
              : completed
              ? "✓ Lesson Completed"
              : "✓ Mark Lesson Complete"}
          </button>

        </div>

      </div>
    </section>
  );
}