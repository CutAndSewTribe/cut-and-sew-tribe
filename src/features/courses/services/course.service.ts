import { courses } from "@/content/courses";

import type {
  Course,
  CourseCategory,
  CourseLevel,
} from "@/types/course";

export function getAllCourses(): Course[] {
  return courses;
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((course) => course.featured);
}

export function getCourseBySlug(
  slug: string,
): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByCategory(
  category: CourseCategory,
): Course[] {
  return courses.filter(
    (course) => course.category === category,
  );
}

export function getCoursesByLevel(
  level: CourseLevel,
): Course[] {
  return courses.filter(
    (course) => course.level === level,
  );
}

export function getRelatedCourses(
  courseId: string,
  limit = 3,
): Course[] {
  const currentCourse = courses.find(
    (course) => course.id === courseId,
  );

  if (!currentCourse) {
    return [];
  }

  return courses
    .filter(
      (course) =>
        course.id !== courseId &&
        course.category === currentCourse.category,
    )
    .slice(0, limit);
}

export function getCourseCategories(): CourseCategory[] {
  return [
    "dressmaking",
    "bridal",
    "menswear",
    "childrenswear",
    "fashion-business",
  ];
}

export function getCourseLevels(): CourseLevel[] {
  return [
    "beginner",
    "intermediate",
    "advanced",
  ];
}