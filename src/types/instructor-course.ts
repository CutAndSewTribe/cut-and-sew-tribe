export interface InstructorCourse {
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

  students: number;

  telegram_group_name: string | null;
  telegram_invite_link: string | null;

  featured: boolean;
  published: boolean;

  created_at: string;
  updated_at: string;
}