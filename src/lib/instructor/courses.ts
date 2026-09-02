import { supabaseAdmin } from "@/lib/supabase/admin";

import type { InstructorCourse } from "@/types/instructor-course";

const TABLE_NAME = "courses";

type CourseRow = Omit<InstructorCourse, "price"> & {
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

  // Large landing-page hero image
  hero_image?: string | null;

  // Marketplace/card thumbnail
  thumbnail?: string | null;

  /**
   * Legacy preview video URL.
   *
   * Kept temporarily for backwards compatibility.
   */
  preview_video?: string | null;

  /**
   * Canonical relationship to the videos table.
   *
   * When a course has a selected preview video, this should
   * contain the video's id.
   */
  preview_video_id?: string | null;

  telegram_group_name?: string | null;
  telegram_invite_link?: string | null;

  featured: boolean;
  published: boolean;
}

function mapCourse(course: CourseRow): InstructorCourse {
  return {
    ...course,
    price: Number(course.price),
  };
}

/**
 * Fetch all courses.
 */
export async function getCourses(): Promise<InstructorCourse[]> {
  const supabase = supabaseAdmin;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    console.error("getCourses:", error);
    return [];
  }

  return (data ?? []).map((course) =>
    mapCourse(course as CourseRow)
  );
}

/**
 * Fetch featured courses for the public homepage.
 * Only returns courses that are both featured and published.
 */
export async function getFeaturedCourses(): Promise<
  InstructorCourse[]
> {
  const supabase = supabaseAdmin;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("featured", true)
    .eq("published", true)
    .order("position", { ascending: true });

  if (error) {
    console.error("getFeaturedCourses:", error);
    return [];
  }

  return (data ?? []).map((course) =>
    mapCourse(course as CourseRow)
  );
}

/**
 * Homepage statistics shown in the trust / stats sections.
 * Returns live counts from Supabase.
 */
export async function getHomepageStats() {
  const supabase = supabaseAdmin;

  const [{ count: publishedCourses }, { count: featuredCourses }] =
    await Promise.all([
      supabase
        .from(TABLE_NAME)
        .select("*", { count: "exact", head: true })
        .eq("published", true),

      supabase
        .from(TABLE_NAME)
        .select("*", { count: "exact", head: true })
        .eq("published", true)
        .eq("featured", true),
    ]);

  return {
    publishedCourses: publishedCourses ?? 0,
    featuredCourses: featuredCourses ?? 0,
  };
}

/**
 * Fetch one course.
 */
export async function getCourse(
  id: string
): Promise<InstructorCourse | null> {
  const supabase = supabaseAdmin;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("getCourse:", error);
    return null;
  }

  return mapCourse(data as CourseRow);
}

/**
 * Create a new course.
 *
 * preview_video_id is the canonical relationship to the
 * selected video. preview_video remains available temporarily
 * for backwards compatibility with existing course records.
 */
export async function createCourse(
  course: CreateCourseInput
): Promise<InstructorCourse> {
  const supabase = supabaseAdmin;

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

    hero_image: course.hero_image || null,
    thumbnail: course.thumbnail || null,

    // Legacy field — retained temporarily.
    preview_video: course.preview_video || null,

    // Canonical course → video relationship.
    preview_video_id: course.preview_video_id || null,

    telegram_group_name: course.telegram_group_name || null,
    telegram_invite_link: course.telegram_invite_link || null,

    featured: course.featured,
    published: course.published,
  };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("createCourse:", error);
    throw error;
  }

  return mapCourse(data as CourseRow);
}

/**
 * Update a course.
 *
 * preview_video_id can be changed independently of the legacy
 * preview_video URL.
 */
export async function updateCourse(
  id: string,
  updates: Partial<CreateCourseInput>
): Promise<InstructorCourse> {
  const supabase = supabaseAdmin;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("updateCourse:", error);
    throw error;
  }

  return mapCourse(data as CourseRow);
}

/**
 * Delete a course.
 */
export async function deleteCourse(id: string): Promise<void> {
  const supabase = supabaseAdmin;

  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteCourse:", error);
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
  const supabase = supabaseAdmin;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ published })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("setCoursePublished:", error);
    throw error;
  }

  return mapCourse(data as CourseRow);
}