import { courses } from "@/content/courses";

import type {
  Course,
  CourseCategory,
  CourseLevel,
} from "@/types/course";

import type {
  CourseFilters,
  CourseQuery,
  CourseSortOption,
} from "../types";

export function filterCourses(
  filters: CourseFilters,
): Course[] {
  return courses.filter((course) => {
    if (
      filters.search &&
      !course.title
        .toLowerCase()
        .includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.level &&
      course.level !== filters.level
    ) {
      return false;
    }

    if (
      filters.category &&
      course.category !== filters.category
    ) {
      return false;
    }

    if (
      filters.featured !== undefined &&
      course.featured !== filters.featured
    ) {
      return false;
    }

    if (
      filters.minPrice !== undefined &&
      course.price < filters.minPrice
    ) {
      return false;
    }

    if (
      filters.maxPrice !== undefined &&
      course.price > filters.maxPrice
    ) {
      return false;
    }

    return true;
  });
}

export function sortCourses(
  courseList: Course[],
  sort: CourseSortOption,
): Course[] {
  const sorted = [...courseList];

  switch (sort) {
    case "price-low-high":
      return sorted.sort(
        (a, b) => a.price - b.price,
      );

    case "price-high-low":
      return sorted.sort(
        (a, b) => b.price - a.price,
      );

    case "title-a-z":
      return sorted.sort((a, b) =>
        a.title.localeCompare(b.title),
      );

    case "title-z-a":
      return sorted.sort((a, b) =>
        b.title.localeCompare(a.title),
      );

    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() -
          new Date(b.publishedAt).getTime(),
      );

    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime(),
      );
  }
}

export function searchCourses(
  query: string,
): Course[] {
  return courses.filter((course) => {
    const search = query.toLowerCase();

    return (
      course.title.toLowerCase().includes(search) ||
      course.subtitle.toLowerCase().includes(search) ||
      course.description.toLowerCase().includes(search)
    );
  });
}

export function queryCourses(
  query: CourseQuery,
): Course[] {
  let results = [...courses];

  if (query.filters) {
    results = filterCourses(query.filters);
  }

  if (query.sort) {
    results = sortCourses(
      results,
      query.sort,
    );
  }

  return results;
}

