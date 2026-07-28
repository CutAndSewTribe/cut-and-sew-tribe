"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function NewCourseButton() {
  return (
    <Link
      href="/instructor/courses/new"
      className="
        inline-flex
        items-center
        gap-2
        rounded-2xl
        bg-[#661093]
        px-5
        py-3
        font-semibold
        text-white
        transition
        hover:bg-[#520c76]
        hover:shadow-lg
      "
    >
      <Plus className="h-5 w-5" />

      <span>New Course</span>
    </Link>
  );
}