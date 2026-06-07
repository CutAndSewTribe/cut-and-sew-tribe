export type PatternAccess =
  | "free"
  | "premium";

export interface Pattern {
  id: string;

  slug: string;

  title: string;

  description: string;

  thumbnail: string;

  access: PatternAccess;

  downloadUrl: string;

  featured: boolean;

  publishedAt: string;
}