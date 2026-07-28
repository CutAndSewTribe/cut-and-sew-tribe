export type CourseLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

export type CourseCategory =
  | "dressmaking"
  | "bridal"
  | "menswear"
  | "childrenswear"
  | "fashion-business";

export interface CourseModule {
  id: string;
  title: string;
  lessons: number;
  duration: string;
}

export interface CourseCommunity {
  platform: "telegram";
  groupName: string;
  inviteLink: string;
}

export interface Course {
  id: string;
  slug: string;

  title: string;
  subtitle: string;

  description: string;

  level: CourseLevel;
  category: CourseCategory;

  thumbnail: string;
  previewVideo?: string;

  price: number;
  currency: string;

  duration: string;

  modules: CourseModule[];

  outcomes: string[];

  community: CourseCommunity;

  featured: boolean;

  publishedAt: string;
}