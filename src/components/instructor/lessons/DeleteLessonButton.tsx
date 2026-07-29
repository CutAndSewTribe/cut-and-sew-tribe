"use client";

import { useState } from "react";

interface DeleteLessonButtonProps {
action: (formData: FormData) => void | Promise<void>;

lessonId: string;
courseId: string;
moduleId: string;
}

export default function DeleteLessonButton({
action,
lessonId,
courseId,
moduleId,
}: DeleteLessonButtonProps) {
const [open, setOpen] = useState(false);

return (
<>
<button
type="button"
onClick={() => setOpen(true)}
className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
>
Delete Lesson </button>

```
  {open && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-neutral-900">
          Delete lesson?
        </h3>

        <p className="mt-3 text-neutral-600">
          This action cannot be undone. The lesson will be permanently
          removed from this module.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl border border-neutral-300 px-4 py-2 font-semibold text-neutral-700"
          >
            Cancel
          </button>

          <form action={action}>
            <input
              type="hidden"
              name="lesson_id"
              value={lessonId}
            />

            <input
              type="hidden"
              name="course_id"
              value={courseId}
            />

            <input
              type="hidden"
              name="module_id"
              value={moduleId}
            />

            <button
              type="submit"
              className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
            >
              Delete permanently
            </button>
          </form>
        </div>
      </div>
    </div>
  )}
</>

);
}
