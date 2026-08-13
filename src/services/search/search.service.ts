import { courses } from "@/content/courses";
import { videos } from "@/content/videos";
import { patterns } from "@/content/patterns";
import { resources } from "@/content/resources";
import { studentStories } from "@/content/success-stories";

import type { SearchResult } from "@/features/search/types/search-result";

import type {
  SearchFilters,
} from "./search.types";


export function searchContent(
  query: string,
  filters: SearchFilters = {},
): SearchResult[] {

  const search = query.toLowerCase();

  const results: SearchResult[] = [];


  function matchesFilters<T extends object>(
  item: T,
  type: string,
) {

  const searchableItem = item as {
    level?: string;
    category?: string;
  };


  if (
    filters.type &&
    filters.type !== type
  ) {
    return false;
  }


  if (
    filters.level &&
    searchableItem.level !== filters.level
  ) {
    return false;
  }


  if (
    filters.category &&
    searchableItem.category !== filters.category
  ) {
    return false;
  }


  return true;
}



  courses.forEach((course) => {

    if (
      matchesFilters(
        course,
        "course",
      ) &&
      (
        course.title.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search)
      )
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
      matchesFilters(
        video,
        "video",
      ) &&
      (
        video.title.toLowerCase().includes(search) ||
        video.description.toLowerCase().includes(search)
      )
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
      matchesFilters(
        pattern,
        "pattern",
      ) &&
      (
        pattern.title.toLowerCase().includes(search) ||
        (pattern.excerpt?.toLowerCase().includes(search) ?? false)
      )
    ) {

      results.push({
        id: pattern.id,
        slug: pattern.slug,
        title: pattern.title,
        description: pattern.excerpt ?? '',
        type: "pattern",
        url: `/patterns/${pattern.slug}`,
      });

    }

  });





  resources.forEach((resource) => {

    if (
      matchesFilters(
        resource,
        "resource",
      ) &&
      (
        resource.title.toLowerCase().includes(search) ||
        resource.description.toLowerCase().includes(search)
      )
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
      matchesFilters(
        story,
        "student-story",
      ) &&
      (
        story.name.toLowerCase().includes(search) ||
        story.story.toLowerCase().includes(search)
      )
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