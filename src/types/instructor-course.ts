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
  preview_video: string | null;

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

  // Change this line
  position: number | null;
}