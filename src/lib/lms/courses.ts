import { createClient } from "@/lib/supabase/server";

import type { Lesson } from "@/types/lesson";
import type { Module } from "@/types/module";

export interface LMSCourse {
  id: string;

  title: string;
  slug: string;

  subtitle: string | null;
  description: string | null;

  category: string;
  level: string;

  price: number;
  currency: string;

  duration: string | null;

  thumbnail: string | null;

  preview_video: string | null;

  telegram_group_name: string | null;
  telegram_invite_link: string | null;

  /**
   * Number of enrolled students.
   * Comes from public.courses.students.
   */
  students: number;

  featured: boolean;
  published: boolean;

  created_at: string;
  updated_at: string;
}

type CourseRow = LMSCourse;

function mapCourse(row: CourseRow): LMSCourse {
  return {
    ...row,
    price: Number(row.price),
    students: Number(row.students ?? 0),
  };
}

/**
 * A course as displayed to a student.
 *
 * Only published modules and published lessons
 * are included.
 */
export interface StudentCourseData
  extends LMSCourse {
  modules: StudentModule[];
}

export interface StudentModule
  extends Module {
  lessons: Lesson[];
}

/**
 * Fetch a published course by slug
 * together with its published modules and lessons.
 */
export async function getStudentCourseBySlug(
  slug: string
): Promise<StudentCourseData | null> {
  const supabase = await createClient();

  /*
   * 1. Get the published course
   */
  const {
    data: course,
    error: courseError,
  } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (courseError || !course) {
    return null;
  }

  /*
   * 2. Get published modules
   */
  const {
    data: modules,
    error: modulesError,
  } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", course.id)
    .eq("published", true)
    .order("position", {
      ascending: true,
    });

  if (modulesError || !modules) {
    return {
      ...mapCourse(course),
      modules: [],
    };
  }

  /*
   * 3. Get lessons belonging to those modules
   */
  const moduleIds = modules.map(
    (module) => module.id
  );

  let lessons: Lesson[] = [];

  if (moduleIds.length > 0) {
    const {
      data: lessonRows,
      error: lessonsError,
    } = await supabase
      .from("lessons")
      .select("*")
      .in("module_id", moduleIds)
      .eq("published", true)
      .order("position", {
        ascending: true,
      });

    if (!lessonsError && lessonRows) {
      lessons = lessonRows as Lesson[];
    }
  }

  /*
   * 4. Attach lessons to their modules
   */
  const studentModules: StudentModule[] =
    modules.map((module) => ({
      ...(module as Module),

      lessons: lessons.filter(
        (lesson) =>
          lesson.module_id === module.id
      ),
    }));

  /*
   * 5. Return the complete student course
   */
  return {
    ...mapCourse(course),
    modules: studentModules,
  };
}

/**
 * Fetch a published course by slug.
 */
export async function getCourseBySlug(
  slug: string
): Promise<LMSCourse | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    return null;
  }

  return mapCourse(data);
}

/**
 * Fetch any course by id.
 * Used by the instructor dashboard.
 */
export async function getCourseById(
  id: string
): Promise<LMSCourse | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapCourse(data);
}

/**
 * Fetch all published courses.
 * Used by the public Courses page.
 */
export async function getPublishedCourses(): Promise<
  LMSCourse[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("published", true)
    .order("created_at", {
      ascending: false,
    });

  if (error || !data) {
    return [];
  }

  return data.map(mapCourse);
}

/**
 * Fetch all courses.
 * Used by instructor/admin pages.
 */
export async function getAllCourses(): Promise<
  LMSCourse[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error || !data) {
    return [];
  }

  return data.map(mapCourse);
}