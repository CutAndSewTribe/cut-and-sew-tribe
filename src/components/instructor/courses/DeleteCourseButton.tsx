"use client";

import { useTransition } from "react";

interface DeleteCourseButtonProps {
  onDelete: () => Promise<void>;
}

export default function DeleteCourseButton({
  onDelete,
}: DeleteCourseButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        const confirmed = window.confirm(
          "Delete this course permanently? This will remove all modules, lessons, and associated course data."
        );

        if (!confirmed) return;

        startTransition(async () => {
          await onDelete();
        });
      }}
      className="rounded-xl border border-red-300 bg-red-50 px-5 py-3 font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Deleting..." : "Delete Course"}
    </button>
  );
}