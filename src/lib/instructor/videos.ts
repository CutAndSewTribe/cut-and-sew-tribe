import { supabaseAdmin } from "@/lib/supabase/admin";
import { getVideoPublicUrl } from "@/lib/r2";

const TABLE_NAME = "videos";

export type VideoCategory =
  | "dressmaking"
  | "bridal"
  | "menswear"
  | "childrenswear"
  | "fashion-business"
  | "general";

export type VideoLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

export interface InstructorVideo {
  id: string;
  slug: string;
  title: string;
  description: string | null;

  category: VideoCategory;
  level: VideoLevel;

  thumbnail_url: string | null;

  r2_key: string;
  video_url: string | null;

  duration_seconds: number | null;
  views: number;

  featured: boolean;
  published: boolean;

  tags: string[];

  instructor_id: string | null;

  published_at: string | null;

  created_at: string;
  updated_at: string;
}

export interface CreateVideoInput {
  id: string;
  slug: string;
  title: string;
  description?: string | null;

  category: VideoCategory;
  level: VideoLevel;

  thumbnail_url?: string | null;

  r2_key: string;
  video_url?: string | null;

  duration_seconds?: number | null;

  featured?: boolean;
  published?: boolean;

  tags?: string[];

  instructor_id?: string | null;
}

export interface UpdateVideoInput {
  slug?: string;
  title?: string;
  description?: string | null;

  category?: VideoCategory;
  level?: VideoLevel;

  thumbnail_url?: string | null;

  video_url?: string | null;

  duration_seconds?: number | null;

  featured?: boolean;

  tags?: string[];
}

type VideoRow = InstructorVideo;

/**
 * Convert database values into the application's
 * InstructorVideo shape.
 *
 * R2 is the source of truth for the physical video file.
 * video_url is retained as a fallback for migration/compatibility.
 */
function mapVideo(video: VideoRow): InstructorVideo {
  return {
    ...video,

    views: Number(video.views ?? 0),

    duration_seconds:
      video.duration_seconds === null ||
      video.duration_seconds === undefined
        ? null
        : Number(video.duration_seconds),

    video_url:
      getVideoPublicUrl(video.r2_key) ??
      video.video_url ??
      null,
  };
}

/**
 * Fetch all videos for instructor/admin workflows.
 *
 * Includes unpublished videos.
 */
export async function getVideos(): Promise<InstructorVideo[]> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("getVideos:", error);
    throw error;
  }

  return (data ?? []).map((video) =>
    mapVideo(video as VideoRow)
  );
}

/**
 * Fetch a single video by its database ID.
 */
export async function getVideo(
  id: string
): Promise<InstructorVideo | null> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getVideo:", error);
    throw error;
  }

  if (!data) {
    return null;
  }

  return mapVideo(data as VideoRow);
}

/**
 * Fetch a single video by its public slug.
 */
export async function getVideoBySlug(
  slug: string
): Promise<InstructorVideo | null> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("getVideoBySlug:", error);
    throw error;
  }

  if (!data) {
    return null;
  }

  return mapVideo(data as VideoRow);
}

/**
 * Fetch all published videos for public-facing pages.
 *
 * The query is performed server-side using supabaseAdmin.
 * The videos table remains protected by RLS.
 */
export async function getPublishedVideos(): Promise<
  InstructorVideo[]
> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .select("*")
    .eq("published", true)
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("getPublishedVideos:", error);
    throw error;
  }

  return (data ?? []).map((video) =>
    mapVideo(video as VideoRow)
  );
}

/**
 * Fetch featured published videos.
 */
export async function getFeaturedVideos(): Promise<
  InstructorVideo[]
> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("getFeaturedVideos:", error);
    throw error;
  }

  return (data ?? []).map((video) =>
    mapVideo(video as VideoRow)
  );
}

/**
 * Fetch published videos by category.
 */
export async function getPublishedVideosByCategory(
  category: VideoCategory
): Promise<InstructorVideo[]> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "getPublishedVideosByCategory:",
      error
    );
    throw error;
  }

  return (data ?? []).map((video) =>
    mapVideo(video as VideoRow)
  );
}

/**
 * Fetch published videos by skill level.
 */
export async function getPublishedVideosByLevel(
  level: VideoLevel
): Promise<InstructorVideo[]> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .select("*")
    .eq("published", true)
    .eq("level", level)
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "getPublishedVideosByLevel:",
      error
    );
    throw error;
  }

  return (data ?? []).map((video) =>
    mapVideo(video as VideoRow)
  );
}

/**
 * Create a video metadata record.
 *
 * The physical video file must already exist in R2.
 */
export async function createVideo(
  input: CreateVideoInput
): Promise<InstructorVideo> {
  const payload = {
    id: input.id,
    slug: input.slug,
    title: input.title,
    description: input.description ?? null,

    category: input.category,
    level: input.level,

    thumbnail_url: input.thumbnail_url ?? null,

    r2_key: input.r2_key,
    video_url: input.video_url ?? null,

    duration_seconds:
      input.duration_seconds ?? null,

    views: 0,

    featured: input.featured ?? false,
    published: input.published ?? false,

    tags: input.tags ?? [],

    instructor_id: input.instructor_id ?? null,

    published_at: input.published
      ? new Date().toISOString()
      : null,
  };

  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    console.error("createVideo:", error);
    throw error;
  }

  return mapVideo(data as VideoRow);
}

/**
 * Update editable video metadata.
 *
 * Storage identity fields such as r2_key, id, views,
 * instructor_id and timestamps are intentionally excluded.
 */
export async function updateVideo(
  id: string,
  updates: UpdateVideoInput
): Promise<InstructorVideo> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("updateVideo:", error);
    throw error;
  }

  return mapVideo(data as VideoRow);
}

/**
 * Publish or unpublish a video.
 *
 * published_at is automatically managed here so callers
 * do not need to handle publication timestamps themselves.
 */
export async function setVideoPublished(
  id: string,
  published: boolean
): Promise<InstructorVideo> {
  const { data, error } = await supabaseAdmin
    .from(TABLE_NAME)
    .update({
      published,
      published_at: published
        ? new Date().toISOString()
        : null,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("setVideoPublished:", error);
    throw error;
  }

  return mapVideo(data as VideoRow);
}

/**
 * Delete a video's database metadata.
 *
 * This intentionally does NOT delete the R2 object.
 *
 * The Media Library delete workflow should first obtain
 * the video's r2_key and then coordinate:
 *
 * 1. R2 object deletion
 * 2. Database record deletion
 *
 * Keeping those operations explicit prevents accidental
 * storage deletion from a simple database operation.
 */
export async function deleteVideo(
  id: string
): Promise<void> {
  const { error } = await supabaseAdmin
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteVideo:", error);
    throw error;
  }
}

/**
 * Set or clear the video used as a course preview.
 *
 * The existing courses.preview_video field is intentionally
 * preserved during the migration period.
 */
export async function setCoursePreviewVideo(
  courseId: string,
  videoId: string | null
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("courses")
    .update({
      preview_video_id: videoId,
    })
    .eq("id", courseId);

  if (error) {
    console.error("setCoursePreviewVideo:", error);
    throw error;
  }
}

/**
 * Fetch the published video assigned as a course preview.
 *
 * The course stores the relationship through courses.preview_video_id.
 * Only published videos are returned so a draft video can never be
 * exposed through a public course landing page.
 */
export async function getPublishedCoursePreviewVideo(
  courseId: string
): Promise<InstructorVideo | null> {
  const { data: course, error: courseError } = await supabaseAdmin
    .from("courses")
    .select("preview_video_id")
    .eq("id", courseId)
    .maybeSingle();

  if (courseError) {
    console.error(
      "getPublishedCoursePreviewVideo course:",
      courseError
    );
    throw courseError;
  }

  if (!course?.preview_video_id) {
    return null;
  }

  const { data: video, error: videoError } = await supabaseAdmin
    .from(TABLE_NAME)
    .select("*")
    .eq("id", course.preview_video_id)
    .eq("published", true)
    .maybeSingle();

  if (videoError) {
    console.error(
      "getPublishedCoursePreviewVideo video:",
      videoError
    );
    throw videoError;
  }

  if (!video) {
    return null;
  }

  return mapVideo(video as VideoRow);
}