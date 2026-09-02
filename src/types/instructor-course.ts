export interface InstructorCourse {
  id: string;
  title: string;
  slug: string;

  subtitle: string | null;
  description: string | null;

  category: string;
  level: string;

  hero_image: string | null;
  thumbnail: string | null;

  /**
   * Legacy preview-video URL.
   *
   * Kept temporarily for backwards compatibility while
   * preview_video_id becomes the source of truth.
   */
  preview_video: string | null;

  /**
   * References the video in the public videos table.
   *
   * This is the canonical relationship between a course
   * and its preview video.
   */
  preview_video_id: string | null;

  price: number;
  currency: string;

  duration: string | null;
  students: number;

  published: boolean;
  featured: boolean;

  telegram_group_name: string | null;
  telegram_invite_link: string | null;

  created_at: string;
  updated_at: string;

  position: number | null;
}