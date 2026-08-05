"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

import type { InstructorCourse } from "@/types/instructor-course";

import {
  publishCourseAction,
  deleteCourseAction,
  reorderCoursesAction,
} from "@/app/instructor/courses/actions";

interface Props {
  courses: InstructorCourse[];
}

function SortableRow({
  course,
}: {
  course: InstructorCourse;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: course.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isPending] = useTransition();

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-neutral-100 bg-white transition-colors hover:bg-neutral-50"
    >
      <td className="w-12 px-3 py-5">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-5 w-5" />
        </button>
      </td>

      <td className="px-6 py-5">
        <Link
          href={`/instructor/courses/${course.id}/edit`}
          className="flex items-center gap-4"
        >
          {course.thumbnail ? (
            <Image
              src={
                course.thumbnail.startsWith("http")
                  ? course.thumbnail
                  : `/${course.thumbnail}`
              }
              alt={course.title}
              width={72}
              height={72}
              className="rounded-xl border border-neutral-200 object-cover"
            />
          ) : (
            <div className="flex h-18 w-18 items-center justify-center rounded-xl bg-[#661093]/10 text-sm font-semibold text-[#661093]">
              CST
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {course.title}
            </h3>
          </div>
        </Link>
      </td>

      <td className="px-6 py-5 text-neutral-700">
        {course.level}
      </td>

      <td className="px-6 py-5 text-neutral-700">
        {course.category}
      </td>

      <td className="px-6 py-5 font-medium text-neutral-900">
        {course.currency} {course.price.toLocaleString()}
      </td>

      <td className="px-6 py-5 text-neutral-700">
        {course.students}
      </td>

      <td className="px-6 py-5">
        {course.published ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Published
          </span>
        ) : (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            Draft
          </span>
        )}
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <Link
            href={`/instructor/courses/${course.id}/edit`}
            className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-[#661093]"
            title="Edit course"
          >
            <Pencil className="h-4 w-4" />
          </Link>

          <form
            action={publishCourseAction.bind(
              null,
              course.id,
              !course.published
            )}
          >
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-[#661093]"
              title={
                course.published
                  ? "Unpublish course"
                  : "Publish course"
              }
            >
              {course.published ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </form>

          <form
            action={deleteCourseAction.bind(null, course.id)}
          >
            <button
              type="submit"
              disabled={isPending}
              onClick={(e) => {
                if (
                  !confirm(
                    `Delete "${course.title}" permanently?`
                  )
                ) {
                  e.preventDefault();
                }
              }}
              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
              title="Delete course"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}

export default function CourseTable({
  courses,
}: Props) {
  const [items, setItems] = useState(courses);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (course) => course.id === active.id
    );

    const newIndex = items.findIndex(
      (course) => course.id === over.id
    );

    const reordered = arrayMove(
      items,
      oldIndex,
      newIndex
    );

    setItems(reordered);

    const positions = reordered.map(
      (course, index) => ({
        id: course.id,
        position: index + 1,
      })
    );

    startTransition(async () => {
      await reorderCoursesAction(positions);
    });
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <table className="min-w-full text-left">
          <thead className="bg-neutral-50 text-sm uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="w-12 px-3 py-4"></th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Level</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Students</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            <SortableContext
              items={items.map((course) => course.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((course) => (
                <SortableRow
                  key={course.id}
                  course={course}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>

      {isPending && (
        <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-3 text-sm text-neutral-500">
          Saving new course order...
        </div>
      )}
    </div>
  );
}