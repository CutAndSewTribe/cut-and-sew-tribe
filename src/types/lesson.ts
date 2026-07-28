/**
 * All supported lesson formats.
 * These map directly to the values stored in the database.
 */
export type LessonType =
  | "video"
  | "article"
  | "pattern"
  | "pdf"
  | "quiz"
  | "assignment"
  | "live";

/**
 * Represents a lesson record from Supabase.
 */
export interface Lesson {
  id: string;

  module_id: string;

  title: string;

  slug: string;

  description: string | null;

  lesson_type: LessonType;

  /**
   * Used by video lessons.
   */
  video_url: string | null;

  /**
   * Used by article lessons.
   */
  content_md: string | null;

  /**
   * Estimated lesson duration.
   */
  duration_minutes: number;

  /**
   * Can non-enrolled users preview this lesson?
   */
  preview: boolean;

  /**
   * Is the lesson visible to students?
   */
  published: boolean;

  /**
   * Ordering inside a module.
   */
  position: number;

  created_at: string;

  updated_at: string;
}

/**
 * Data required when creating a lesson.
 */
export interface CreateLessonInput {
  module_id: string;

  title: string;

  slug: string;

  description?: string;

  lesson_type: LessonType;

  video_url?: string;

  content_md?: string;

  duration_minutes?: number;

  preview: boolean;

  published: boolean;

  position: number;
}

/**
 * Data used when updating a lesson.
 */
export type UpdateLessonInput =
  Partial<CreateLessonInput>;