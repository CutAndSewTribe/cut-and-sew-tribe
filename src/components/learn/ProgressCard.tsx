interface ProgressCardProps {
  completed: number;
  total: number;
}

export default function ProgressCard({
  completed,
  total,
}: ProgressCardProps) {
  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">
        Course Progress
      </h3>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-[#661093]"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-4 text-sm text-neutral-600">
        {completed} of {total} lessons completed
      </p>

      <p className="mt-2 text-2xl font-bold text-[#661093]">
        {percentage}%
      </p>
    </div>
  );
}