"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

import {
DndContext,
PointerSensor,
closestCenter,
useSensor,
useSensors,
type DragEndEvent,
} from "@dnd-kit/core";

import {
SortableContext,
arrayMove,
rectSortingStrategy,
useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

interface LessonItem {
id: string;
title: string;
lesson_type: string;
duration_minutes: number;
preview: boolean;
published: boolean;
position: number;
}

interface SortableLessonListProps {
lessons: LessonItem[];
courseId: string;
moduleId: string;
onReorder: (
lessons: { id: string; position: number }[]
) => Promise<void>;
}

function SortableLessonRow({
lesson,
courseId,
moduleId,
}: {
lesson: LessonItem;
courseId: string;
moduleId: string;
}) {
const {
attributes,
listeners,
setNodeRef,
transform,
transition,
isDragging,
} = useSortable({
id: lesson.id,
});

const style = {
transform: CSS.Transform.toString(transform),
transition,
};

return (
<div
ref={setNodeRef}
style={style}
className={`flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm ${
        isDragging ? "shadow-xl ring-2 ring-[#661093]/30" : ""
      }`}
> <div className="flex items-center gap-4">
<button
type="button"
{...attributes}
{...listeners}
className="cursor-grab rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-neutral-500 active:cursor-grabbing"
aria-label="Drag lesson"
>
☰ </button>

```
    <div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-neutral-500">
          {lesson.position}
        </span>

        <h3 className="text-lg font-semibold text-neutral-900">
          {lesson.title}
        </h3>
      </div>

      <p className="mt-1 text-sm text-neutral-500">
        {lesson.lesson_type} • {lesson.duration_minutes} min
      </p>

      <div className="mt-2 flex gap-2">
        {lesson.preview && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Preview
          </span>
        )}

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            lesson.published
              ? "bg-green-100 text-green-700"
              : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {lesson.published ? "Published" : "Draft"}
        </span>
      </div>
    </div>
  </div>

  <Link
    href={`/instructor/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}/edit`}
    className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-[#661093] hover:text-[#661093]"
  >
    Edit
  </Link>
</div>


);
}

export default function SortableLessonList({
lessons,
courseId,
moduleId,
onReorder,
}: SortableLessonListProps) {
const [items, setItems] = useState(lessons);
const [isPending, startTransition] = useTransition();

const sensors = useSensors(
useSensor(PointerSensor, {
activationConstraint: {
distance: 6,
},
})
);

const ids = useMemo(
() => items.map((lesson) => lesson.id),
[items]
);

function handleDragEnd(event: DragEndEvent) {
const { active, over } = event;

if (!over || active.id === over.id) {
  return;
}

const oldIndex = items.findIndex(
  (lesson) => lesson.id === active.id
);

const newIndex = items.findIndex(
  (lesson) => lesson.id === over.id
);

const reordered = arrayMove(items, oldIndex, newIndex).map(
  (lesson, index) => ({
    ...lesson,
    position: index + 1,
  })
);

setItems(reordered);

startTransition(async () => {
  await onReorder(
    reordered.map((lesson) => ({
      id: lesson.id,
      position: lesson.position,
    }))
  );
});


}

return ( <div className="space-y-4"> <div className="flex items-center justify-between"> <p className="text-sm text-neutral-500">
Drag lessons to change their order. </p>


    {isPending && (
      <span className="text-sm font-semibold text-[#661093]">
        Saving…
      </span>
    )}
  </div>

  <DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
  >
    <SortableContext
      items={ids}
      strategy={rectSortingStrategy}
    >
      <div className="space-y-4">
        {items.map((lesson) => (
          <SortableLessonRow
            key={lesson.id}
            lesson={lesson}
            courseId={courseId}
            moduleId={moduleId}
          />
        ))}
      </div>
    </SortableContext>
  </DndContext>
</div>

);
}
