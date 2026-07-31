import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import type { InstructorCourse } from "@/types/instructor-course";

interface Props {
courses: InstructorCourse[];
}

export default function CourseTable({ courses }: Props) {
return ( <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"> <table className="w-full"> <thead className="border-b border-neutral-200 bg-neutral-50"> <tr className="text-left text-sm font-semibold text-neutral-700"> <th className="px-6 py-4">Course</th> <th className="px-6 py-4">Level</th> <th className="px-6 py-4">Category</th> <th className="px-6 py-4">Price</th> <th className="px-6 py-4">Students</th> <th className="px-6 py-4">Status</th> <th className="px-6 py-4"></th> </tr> </thead>

```
    <tbody>
      {courses.map((course) => (
        <tr
          key={course.id}
          className="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
        >
          <td className="px-6 py-5">
            <Link
              href={`/instructor/courses/${course.id}`}
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
                <h3 className="text-lg font-semibold text-neutral-900 transition-colors hover:text-[#661093]">
                  {course.title}
                </h3>
              </div>
            </Link>
          </td>

          <td className="px-6 py-5 text-neutral-700">{course.level}</td>

          <td className="px-6 py-5 text-neutral-700">{course.category}</td>

          <td className="px-6 py-5 font-medium text-neutral-900">
            {course.currency} {course.price.toLocaleString()}
          </td>

          <td className="px-6 py-5 text-neutral-700">{course.students}</td>

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
            <button
              type="button"
              className="rounded-xl p-2 transition hover:bg-neutral-100"
            >
              <MoreHorizontal className="h-5 w-5 text-neutral-600" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


);
}
