import { resources } from "@/content/resources";

import type {
  Resource,
  ResourceAccess,
  ResourceCategory,
} from "@/types/resource";

export function getAllResources(): Resource[] {
  return resources;
}

export function getFeaturedResources(): Resource[] {
  return resources.filter(
    (resource) => resource.featured,
  );
}

export function getResourceBySlug(
  slug: string,
): Resource | undefined {
  return resources.find(
    (resource) => resource.slug === slug,
  );
}

export function getResourcesByCategory(
  category: ResourceCategory,
): Resource[] {
  return resources.filter(
    (resource) => resource.category === category,
  );
}

export function getResourcesByAccess(
  access: ResourceAccess,
): Resource[] {
  return resources.filter(
    (resource) => resource.access === access,
  );
}

export function getLatestResources(): Resource[] {
  return [...resources].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime(),
  );
}

export function getMostDownloadedResources(): Resource[] {
  return [...resources].sort(
    (a, b) => b.downloads - a.downloads,
  );
}
