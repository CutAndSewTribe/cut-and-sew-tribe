import { createClient } from "@/lib/supabase/server";

import type { InstructorCourse } from "@/types/instructor-course";

const TABLE_NAME = "courses";

type CourseRow = Omit<
  InstructorCourse,
  "price"
> & {
  price: string | number;
};

export interface CreateCourseInput {
  title: string;
  slug: string;

  subtitle?: string;
  description?: string;

  category: string;
  level: string;

  price: number;
  currency: string;

  duration?: string;

  thumbnail?: string | null;
  preview_video?: string | null;

  telegram_group_name?: string | null;
  telegram_invite_link?: string | null;

  featured: boolean;
  published: boolean;
}

function mapCourse(
  course: CourseRow
): InstructorCourse {
  return {
    ...course,
    price: Number(course.price),
  };
}

/**
 * Fetch all courses.
 */
export async function getCourses(): Promise<
  InstructorCourse[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("title", {
      ascending: true,
    });

  if (error) {
    console.error("getCourses:", error);
    return [];
  }

  return (data ?? []).map((course) =>
    mapCourse(course as CourseRow)
  );
}

/**
 * Fetch one course.
 */
export async function getCourse(
  id: string
): Promise<InstructorCourse | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapCourse(data as CourseRow);
}

/**
 * Create a new course.
 */
export async function createCourse(
  course: CreateCourseInput
): Promise<InstructorCourse> {
  const supabase = await createClient();

  const payload = {
    title: course.title,
    slug: course.slug,

    subtitle: course.subtitle || null,
    description: course.description || null,

    category: course.category,
    level: course.level,

    price: course.price,
    currency: course.currency,

    duration: course.duration || null,

    thumbnail: course.thumbnail || null,
    preview_video: course.preview_video || null,

    telegram_group_name:
      course.telegram_group_name || null,

    telegram_invite_link:
      course.telegram_invite_link || null,

    featured: course.featured,
    published: course.published,
  };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapCourse(data as CourseRow);
}

/**
 * Update a course.
 */
export async function updateCourse(
  id: string,
  updates: Partial<CreateCourseInput>
): Promise<InstructorCourse> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapCourse(data as CourseRow);
}

/**
 * Delete a course.
 */
export async function deleteCourse(
  id: string
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

/**
 * Publish or unpublish a course.
 */
export async function setCoursePublished(
  id: string,
  published: boolean
): Promise<InstructorCourse> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      published,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapCourse(data as CourseRow);
}