export type VideoLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

export type VideoCategory =
  | "dressmaking"
  | "bridal"
  | "menswear"
  | "childrenswear"
  | "fashion-business"
  | "general";

export interface Video {
  id: string;

  slug: string;

  title: string;

  description: string;

  category: VideoCategory;

  level: VideoLevel;

  thumbnail: string;

  videoUrl: string;

  duration: string;

  views: number;

  featured: boolean;

  tags: string[];

  instructor: string;

  publishedAt: string;
}

