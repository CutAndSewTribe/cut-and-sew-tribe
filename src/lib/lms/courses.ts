import { supabaseAdmin } from "@/lib/supabase/admin";
import { getVideoPublicUrl } from "@/lib/r2";

import type { Lesson } from "@/types/lesson";
import type { Module } from "@/types/module";

/**
 * Complete internal/student course shape.
 *
 * Telegram fields are intentionally part of this type because
 * protected student and instructor/server workflows may need them.
 *
 * preview_video_id is the canonical relationship between a course
 * and its video record in public.videos.
 *
 * preview_video is retained temporarily for backwards compatibility
 * with existing course records and existing application code.
 */
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

  hero_image: string | null;
  thumbnail: string | null;

  /**
   * Legacy preview-video URL.
   *
   * Kept temporarily while preview_video_id becomes the
   * source of truth.
   */
  preview_video: string | null;

  /**
   * Canonical relationship to the public.videos table.
   */
  preview_video_id: string | null;

  telegram_group_name: string | null;
  telegram_invite_link: string | null;

  /**
   * Number of enrolled students.
   * Comes from public.courses.students.
   */
  students: number;

  featured: boolean;
  published: boolean;

  /**
   * Manual display order for instructor drag-and-drop sorting.
   * Lower numbers appear first.
   */
  position: number | null;

  created_at: string;
  updated_at: string;
}

/**
 * Public-facing course shape.
 *
 * Telegram credentials are deliberately excluded so public pages
 * cannot receive the private group name or invite link through
 * their course data.
 */
export type PublicLMSCourse = Omit<
  LMSCourse,
  "telegram_group_name" | "telegram_invite_link"
>;

/**
 * Public-facing preview video.
 *
 * This contains only information needed by the public course page.
 * The video URL is resolved from the video's R2 key on the server.
 */
export interface PublicCoursePreviewVideo {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  duration_seconds: number | null;
  views: number;
  featured: boolean;
  published: boolean;
  tags: string[];
  published_at: string | null;
}

type CourseRow = LMSCourse;

interface CoursePreviewVideoRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  r2_key: string;
  video_url: string | null;
  duration_seconds: number | null;
  views: number;
  featured: boolean;
  published: boolean;
  tags: string[];
  published_at: string | null;
}

/**
 * Map a complete course row into the internal LMS course shape.
 */
function mapCourse(row: CourseRow): LMSCourse {
  return {
    ...row,
    price: Number(row.price),
    students: Number(row.students ?? 0),
    position:
      row.position === null || row.position === undefined
        ? null
        : Number(row.position),
  };
}

/**
 * Map a public course row into the public course shape.
 */
function mapPublicCourse(row: PublicLMSCourse): PublicLMSCourse {
  return {
    ...row,
    price: Number(row.price),
    students: Number(row.students ?? 0),
    position:
      row.position === null || row.position === undefined
        ? null
        : Number(row.position),
  };
}

/**
 * Map a published video row into the public course-preview shape.
 *
 * The R2 key is deliberately not exposed to the client.
 * The public URL is generated from the configured R2 public domain.
 */
function mapPublicCoursePreviewVideo(
  row: CoursePreviewVideoRow
): PublicCoursePreviewVideo {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    thumbnail_url: row.thumbnail_url,
    video_url: getVideoPublicUrl(row.r2_key) ?? row.video_url ?? null,
    duration_seconds:
      row.duration_seconds === null ||
      row.duration_seconds === undefined
        ? null
        : Number(row.duration_seconds),
    views: Number(row.views ?? 0),
    featured: row.featured,
    published: row.published,
    tags: row.tags ?? [],
    published_at: row.published_at,
  };
}

/**
 * Resolve the selected course preview video.
 *
 * Only published videos are returned. This prevents a draft video
 * from accidentally becoming publicly visible through a course page.
 */
async function getPublishedCoursePreviewVideo(
  courseId: string,
  previewVideoId: string | null
): Promise<PublicCoursePreviewVideo | null> {
  if (!previewVideoId) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("videos")
    .select(
      `
        id,
        slug,
        title,
        description,
        thumbnail_url,
        r2_key,
        video_url,
        duration_seconds,
        views,
        featured,
        published,
        tags,
        published_at
      `
    )
    .eq("id", previewVideoId)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("getPublishedCoursePreviewVideo:", error);
    throw error;
  }

  if (!data) {
    return null;
  }

  return mapPublicCoursePreviewVideo(
    data as CoursePreviewVideoRow
  );
}

/**
 * Explicit list of fields that are safe for public course pages.
 *
 * Telegram credentials are intentionally excluded.
 *
 * preview_video_id is public-safe because it is only an identifier
 * for the selected public preview video. The actual video metadata
 * and public R2 URL are resolved separately by the data layer.
 */
const PUBLIC_COURSE_SELECT = `
  id,
  title,
  slug,
  subtitle,
  description,
  category,
  level,
  price,
  currency,
  duration,
  hero_image,
  thumbnail,
  preview_video,
  preview_video_id,
  students,
  featured,
  published,
  position,
  created_at,
  updated_at
`;

/**
 * A course available to an enrolled student.
 *
 * Only published modules and published lessons are included.
 */
export interface StudentCourseData extends LMSCourse {
  modules: StudentModule[];
}

/**
 * Public sales-page course data.
 *
 * Telegram credentials are intentionally absent.
 */
export interface PublicCourseData extends PublicLMSCourse {
  modules: StudentModule[];
  previewVideo: PublicCoursePreviewVideo | null;
}

export interface StudentModule extends Module {
  lessons: Lesson[];
}

/**
 * Fetch a published course by slug together with its
 * published modules and lessons for an enrolled student.
 *
 * This function retains the complete course shape, including
 * Telegram fields and preview_video_id.
 */
export async function getStudentCourseBySlug(
  slug: string
): Promise<StudentCourseData | null> {
  const supabase = supabaseAdmin;

  // 1. Get the complete published course.
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

  // 2. Get published modules.
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
      ...mapCourse(course as CourseRow),
      modules: [],
    };
  }

  // 3. Get published lessons belonging to those modules.
  const moduleIds = modules.map((module) => module.id);

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

  // 4. Attach lessons to their modules.
  const studentModules: StudentModule[] = modules.map((module) => ({
    ...(module as Module),
    lessons: lessons.filter(
      (lesson) => lesson.module_id === module.id
    ),
  }));

  // 5. Return the complete protected student course.
  return {
    ...mapCourse(course as CourseRow),
    modules: studentModules,
  };
}

/**
 * Fetch a course for the PUBLIC sales page.
 *
 * This deliberately selects only public-safe course fields.
 * Telegram group names and invite links never enter this
 * public course-data object.
 *
 * The selected preview video is resolved separately and only
 * returned when that video is published.
 */
export async function getCourseLandingPageData(
  slug: string
): Promise<PublicCourseData | null> {
  const supabase = supabaseAdmin;

  // 1. Fetch only public-safe course fields.
  const {
    data: course,
    error: courseError,
  } = await supabase
    .from("courses")
    .select(PUBLIC_COURSE_SELECT)
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (courseError || !course) {
    return null;
  }

  const publicCourse = mapPublicCourse(
    course as PublicLMSCourse
  );

  // 2. Resolve the selected published preview video.
  const previewVideo = await getPublishedCoursePreviewVideo(
    publicCourse.id,
    publicCourse.preview_video_id
  );

  // 3. Get published modules for curriculum display.
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
      ...publicCourse,
      previewVideo,
      modules: [],
    };
  }

  // 4. Get published lessons for the curriculum.
  const moduleIds = modules.map((module) => module.id);

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

  // 5. Attach lessons to their modules.
  const publicModules: StudentModule[] = modules.map((module) => ({
    ...(module as Module),
    lessons: lessons.filter(
      (lesson) => lesson.module_id === module.id
    ),
  }));

  // 6. Return public-safe course data with the resolved preview video.
  return {
    ...publicCourse,
    previewVideo,
    modules: publicModules,
  };
}

/**
 * Fetch a published course by slug for protected/server workflows.
 *
 * This retains Telegram fields because checkout, protected student
 * pages, and server-side access helpers may need the full course.
 */
export async function getCourseBySlug(
  slug: string
): Promise<LMSCourse | null> {
  const supabase = supabaseAdmin;

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    return null;
  }

  return mapCourse(data as CourseRow);
}

/**
 * Fetch any course by id.
 * Used by the instructor dashboard.
 *
 * Instructor workflows retain Telegram configuration fields.
 */
export async function getCourseById(
  id: string
): Promise<LMSCourse | null> {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("getCourseById error:", error);
    return null;
  }

  return mapCourse(data as CourseRow);
}

/**
 * Fetch all published courses for the PUBLIC Courses page.
 *
 * Telegram credentials are deliberately excluded.
 */
export async function getPublishedCourses(): Promise<
  PublicLMSCourse[]
> {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select(PUBLIC_COURSE_SELECT)
    .eq("published", true)
    .order("position", {
      ascending: true,
    });

  if (error || !data) {
    console.error("Public courses error:", error);
    return [];
  }

  return data.map((row) =>
    mapPublicCourse(row as PublicLMSCourse)
  );
}

/**
 * Fetch all courses.
 * Used by instructor/admin pages.
 *
 * Admin workflows retain the complete Telegram configuration.
 */
export async function getAllCourses(): Promise<LMSCourse[]> {
  const { data, error } = await supabaseAdmin
    .from("courses")
    .select("*")
    .order("position", {
      ascending: true,
    });

  if (error || !data) {
    console.error("getAllCourses error:", error);
    return [];
  }

  return data.map((row) =>
    mapCourse(row as CourseRow)
  );
}

/**
 * Update the manual course display order.
 *
 * This logic is intentionally unchanged.
 */
export async function updateCoursePositions(
  positions: {
    id: string;
    position: number;
  }[]
): Promise<void> {
  for (const item of positions) {
    const { error } = await supabaseAdmin
      .from("courses")
      .update({
        position: item.position,
      })
      .eq("id", item.id);

    if (error) {
      throw error;
    }
  }
}