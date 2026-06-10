import { courses } from "@/content/courses";
import { videos } from "@/content/videos";
import { patterns } from "@/content/patterns";
import { resources } from "@/content/resources";
import { studentStories } from "@/content/success-stories";

import type { SearchResult } from "@/features/search/types/search-result";

export function searchContent(
  query: string,
): SearchResult[] {
  const search = query.toLowerCase();

  const results: SearchResult[] = [];

  courses.forEach((course) => {
    if (
      course.title.toLowerCase().includes(search) ||
      course.description.toLowerCase().includes(search)
    ) {
      results.push({
        id: course.id,
        slug: course.slug,
        title: course.title,
        description: course.description,
        type: "course",
        url: `/courses/${course.slug}`,
      });
    }
  });

  videos.forEach((video) => {
    if (
      video.title.toLowerCase().includes(search) ||
      video.description.toLowerCase().includes(search)
    ) {
      results.push({
        id: video.id,
        slug: video.slug,
        title: video.title,
        description: video.description,
        type: "video",
        url: `/videos/${video.slug}`,
      });
    }
  });

  patterns.forEach((pattern) => {
    if (
      pattern.title.toLowerCase().includes(search) ||
      pattern.description.toLowerCase().includes(search)
    ) {
      results.push({
        id: pattern.id,
        slug: pattern.slug,
        title: pattern.title,
        description: pattern.description,
        type: "pattern",
        url: `/patterns/${pattern.slug}`,
      });
    }
  });

  resources.forEach((resource) => {
    if (
      resource.title.toLowerCase().includes(search) ||
      resource.description.toLowerCase().includes(search)
    ) {
      results.push({
        id: resource.id,
        slug: resource.slug,
        title: resource.title,
        description: resource.description,
        type: "resource",
        url: `/resources/${resource.slug}`,
      });
    }
  });

  studentStories.forEach((story) => {
    if (
      story.name.toLowerCase().includes(search) ||
      story.story.toLowerCase().includes(search)
    ) {
      results.push({
        id: story.id,
        slug: story.slug,
        title: story.name,
        description: story.shortStory,
        type: "student-story",
        url: `/success-stories/${story.slug}`,
      });
    }
  });

  return results;
}
