export type PatternAccess =
  | "free"
  | "premium";

export type PatternLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

export type PatternCategory =
  | "dressmaking"
  | "bridal"
  | "menswear"
  | "childrenswear";

export interface Pattern {
  id: string;

  slug: string;

  title: string;

  description: string;

  category: PatternCategory;

  level: PatternLevel;

  thumbnail: string;

  access: PatternAccess;

  fileFormat: string;

  downloadUrl: string;

  featured: boolean;

  publishedAt: string;
}
