export type SearchResultType =
  | "course"
  | "video"
  | "pattern"
  | "resource"
  | "student-story";

export interface SearchResult {
  id: string;

  slug: string;

  title: string;

  description: string;

  type: SearchResultType;

  url: string;
}