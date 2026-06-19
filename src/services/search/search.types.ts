export type SearchFilters = {
  type?: 
    | "course"
    | "video"
    | "pattern"
    | "resource"
    | "student-story";

  level?: string;

  category?: string;
};


export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
}


export interface SearchOptions {
  limit?: number;
}
