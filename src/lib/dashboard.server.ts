import { createClient } from "@/lib/supabase/server";

export interface DashboardCourse {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
}

export async function getDashboardCourses(): Promise<DashboardCourse[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  /*
   * Get all active enrollments.
   */
  const { data: enrollments, error: enrollmentError } = await supabase
    .from("enrollments")
    .select("course_slug")
    .eq("user_id", user.id)
    .eq("status", "active");

  if (enrollmentError || !enrollments || enrollments.length === 0) {
    return [];
  }

  const courseSlugs = [...new Set(enrollments.map((e) => e.course_slug))];

  /*
   * Load enrolled published courses.
   */
  const { data: courses, error: courseError } = await supabase
    .from("courses")
    .select("id,title,slug,thumbnail")
    .in("slug", courseSlugs)
    .eq("published", true);

  if (courseError || !courses) {
    return [];
  }

  /*
   * Load modules for those courses.
   */
  const courseIds = courses.map((course) => course.id);

  const { data: modules } = await supabase
    .from("modules")
    .select("id,course_id")
    .in("course_id", courseIds)
    .eq("published", true);

  const moduleIds = (modules ?? []).map((module) => module.id);

  /*
   * Load lessons.
   */
  const { data: lessons } =
    moduleIds.length > 0
      ? await supabase
          .from("lessons")
          .select("id,module_id")
          .in("module_id", moduleIds)
          .eq("published", true)
      : { data: [] };

  /*
   * Load completed lessons.
   */
  const { data: completedLessons } = await supabase
    .from("lesson_progress")
    .select("lesson_id,course_slug")
    .eq("user_id", user.id)
    .eq("completed", true);

  return courses.map((course) => {
    const courseModules =
      modules?.filter(
        (module) => module.course_id === course.id
      ) ?? [];

    const courseModuleIds = courseModules.map((m) => m.id);

    const courseLessons =
      lessons?.filter((lesson) =>
        courseModuleIds.includes(lesson.module_id)
      ) ?? [];

    const completed =
      completedLessons?.filter(
        (lesson) => lesson.course_slug === course.slug
      ) ?? [];

    const totalLessons = courseLessons.length;

    const completedLessonsCount = completed.length;

    const progress =
      totalLessons === 0
        ? 0
        : Math.round(
            (completedLessonsCount / totalLessons) * 100
          );

    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      thumbnail:
        course.thumbnail
          ? course.thumbnail.startsWith("/")
            ? course.thumbnail
            : `/${course.thumbnail}`
          : "/images/course-placeholder.jpg",
      completedLessons: completedLessonsCount,
      totalLessons,
      progress,
    };
  });
}