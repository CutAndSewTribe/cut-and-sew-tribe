import type {
  CourseCategory,
  CourseLevel,
} from "@/types/course";

export type CourseSortOption =
  | "newest"
  | "oldest"
  | "price-low-high"
  | "price-high-low"
  | "title-a-z"
  | "title-z-a";

export interface CourseFilters {
  search?: string;

  level?: CourseLevel;

  category?: CourseCategory;

  featured?: boolean;

  minPrice?: number;

  maxPrice?: number;
}

export interface CourseQuery {
  filters?: CourseFilters;

  sort?: CourseSortOption;
}