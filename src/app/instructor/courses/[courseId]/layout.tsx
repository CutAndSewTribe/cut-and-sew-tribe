import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import CourseBuilderHeader from "@/components/instructor/course-builder/layout/CourseBuilderHeader";
import CourseBuilderSidebar from "@/components/instructor/course-builder/layout/CourseBuilderSidebar";
import CourseBuilderLayout from "@/components/instructor/course-builder/layout/CourseBuilderLayout";

import { getCourseById } from "@/lib/lms/courses";

interface Props {
  children: ReactNode;
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CourseBuilderRouteLayout({
  children,
  params,
}: Props) {
  const { courseId } = await params;

  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <CourseBuilderLayout
      header={
        <CourseBuilderHeader
          title={course.title}
          published={course.published}
        />
      }
      breadcrumbs={null}
      sidebar={
        <CourseBuilderSidebar
          courseId={courseId}
        />
      }
    >
      {children}
    </CourseBuilderLayout>
  );
}