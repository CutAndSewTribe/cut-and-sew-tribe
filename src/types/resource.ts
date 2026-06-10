export type ResourceCategory =
  | "guide"
  | "checklist"
  | "template"
  | "worksheet"
  | "business";

export type ResourceAccess =
  | "free"
  | "premium";

export interface Resource {
  id: string;

  slug: string;

  title: string;

  description: string;

  category: ResourceCategory;

  thumbnail: string;

  fileType: string;

  fileUrl: string;

  access: ResourceAccess;

  downloads: number;

  featured: boolean;

  publishedAt: string;
}
