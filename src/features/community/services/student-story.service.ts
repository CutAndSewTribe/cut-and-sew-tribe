import { studentStories } from "@/content/success-stories";

import type { StudentStory } from "@/types/student-story";

export function getAllStudentStories(): StudentStory[] {
  return studentStories;
}

export function getFeaturedStudentStories(): StudentStory[] {
  return studentStories.filter(
    (story) => story.featured,
  );
}

export function getStudentStoryBySlug(
  slug: string,
): StudentStory | undefined {
  return studentStories.find(
    (story) => story.slug === slug,
  );
}

export function getLatestStudentStories(): StudentStory[] {
  return [...studentStories].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime(),
  );
}

export function searchStudentStories(
  query: string,
): StudentStory[] {
  const search = query.toLowerCase();

  return studentStories.filter(
    (story) =>
      story.name.toLowerCase().includes(search) ||
      story.course.toLowerCase().includes(search) ||
      story.location.toLowerCase().includes(search) ||
      story.achievement
        .toLowerCase()
        .includes(search),
  );
}
