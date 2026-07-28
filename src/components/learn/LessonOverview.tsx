interface Props {
  description: string;
}

export default function LessonOverview({
  description,
}: Props) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-neutral-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#661093]/10 text-2xl">
          📖
        </div>

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#661093]">
            Lesson Guide
          </p>

          <h2 className="text-2xl font-bold text-neutral-900">
            Lesson Overview
          </h2>

        </div>

      </div>

      <div className="prose prose-neutral max-w-none">

        <p className="text-lg leading-8 text-neutral-700">
          {description}
        </p>

      </div>

    </section>
  );
}

