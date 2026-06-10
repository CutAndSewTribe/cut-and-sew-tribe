import { videos } from "@/content/videos";

import type {
  Video,
  VideoCategory,
  VideoLevel,
} from "@/types/video";

export function getAllVideos(): Video[] {
  return videos;
}

export function getFeaturedVideos(): Video[] {
  return videos.filter((video) => video.featured);
}

export function getVideoBySlug(
  slug: string,
): Video | undefined {
  return videos.find(
    (video) => video.slug === slug,
  );
}

export function getVideosByCategory(
  category: VideoCategory,
): Video[] {
  return videos.filter(
    (video) => video.category === category,
  );
}

export function getVideosByLevel(
  level: VideoLevel,
): Video[] {
  return videos.filter(
    (video) => video.level === level,
  );
}

export function getLatestVideos(): Video[] {
  return [...videos].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime(),
  );
}

export function getMostWatchedVideos(): Video[] {
  return [...videos].sort(
    (a, b) => b.views - a.views,
  );
}
