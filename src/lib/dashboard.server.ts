import { createClient } from "@/lib/supabase/server";

import { learningCourses } from "@/content/learning";
import { courses } from "@/content/courses";

import { getCompletedLessons } from "@/lib/lesson-progress.server";

export interface DashboardCourse {
  slug: string;
  title: string;
  thumbnail: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
}

export async function getDashboardCourses(): Promise<
  DashboardCourse[]
> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_slug")
    .eq("user_id", user.id)
    .eq("status", "active");

  if (!enrollments) {
    return [];
  }

  // Remove duplicate course purchases
  const uniqueCourseSlugs = [
    ...new Set(enrollments.map((e) => e.course_slug)),
  ];

  const dashboardCourses: DashboardCourse[] = [];

  for (const slug of uniqueCourseSlugs) {
    const learningCourse =
      learningCourses[
        slug as keyof typeof learningCourses
      ];

    if (!learningCourse) continue;

    const completed =
      await getCompletedLessons(slug);

    const totalLessons =
      learningCourse.modules.reduce(
        (sum, module) => sum + module.lessons.length,
        0
      );

    const courseInfo = courses.find(
      (course) => course.slug === slug
    );

    dashboardCourses.push({
      slug,
      title: courseInfo?.title ?? slug,
      thumbnail:
        courseInfo?.thumbnail ??
        "/images/course-placeholder.jpg",
      completedLessons: completed.length,
      totalLessons,
      progress:
        totalLessons === 0
          ? 0
          : Math.round(
              (completed.length /
                totalLessons) *
                100
            ),
    });
  }

  return dashboardCourses;
}