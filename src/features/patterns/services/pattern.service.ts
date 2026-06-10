import { patterns } from "@/content/patterns";

import type {
  Pattern,
  PatternAccess,
  PatternCategory,
  PatternLevel,
} from "@/types/pattern";

export function getAllPatterns(): Pattern[] {
  return patterns;
}

export function getFeaturedPatterns(): Pattern[] {
  return patterns.filter(
    (pattern) => pattern.featured,
  );
}

export function getPatternBySlug(
  slug: string,
): Pattern | undefined {
  return patterns.find(
    (pattern) => pattern.slug === slug,
  );
}

export function getPatternsByCategory(
  category: PatternCategory,
): Pattern[] {
  return patterns.filter(
    (pattern) => pattern.category === category,
  );
}

export function getPatternsByLevel(
  level: PatternLevel,
): Pattern[] {
  return patterns.filter(
    (pattern) => pattern.level === level,
  );
}

export function getPatternsByAccess(
  access: PatternAccess,
): Pattern[] {
  return patterns.filter(
    (pattern) => pattern.access === access,
  );
}

export function getLatestPatterns(): Pattern[] {
  return [...patterns].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime(),
  );
}
